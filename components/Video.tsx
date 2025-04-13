"use client";
import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "@/styles/Video.module.scss";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoProps {
  className?: string;
}

export const Video = forwardRef(function Video({ className }: VideoProps, ref) {
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, [isStreamReady]);

  useEffect(() => {
    async function requestCameraPermission() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
        });
        console.log("Camera permission granted");
        streamRef.current = stream;
        setIsStreamReady(true);
      } catch (error) {
        console.error("Camera permission denied", error);
      }
    }

    requestCameraPermission();

    // cleanup when the page unloads
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Expose the getScreenshot method to the parent component
  useImperativeHandle(ref, () => ({
    // returns a image/png string
    getScreenshot(aspectRatioElement: HTMLElement) {
      if (!streamRef.current || !videoRef.current || !aspectRatioElement) {
        return;
      }

      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      // get the rectangle of the aspectratio component (non-hidden)
      const aspectRect = aspectRatioElement.getBoundingClientRect();

      // Set canvas dimensions to the desired 4:5 aspect ratio
      const outputWidth = aspectRect.width;
      const outputHeight = aspectRect.height;
      canvas.width = outputWidth;
      canvas.height = outputHeight;

      // Calculate center of the video element (accounting for scale-[1.1])
      // const videoRect = video.getBoundingClientRect();
      // const scaleX = video.videoWidth / (videoRect.width / 1.1); // Reverse the 1.1x scaling
      // const scaleY = video.videoHeight / (videoRect.height / 1.1);

      // Calculate the portion of the video to capture (centered)
      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const targetAspectRatio = 4 / 5;

      let sourceWidth, sourceHeight, sourceX, sourceY;

      if (videoAspectRatio > targetAspectRatio) {
        // Video is wider, crop width
        sourceHeight = video.videoHeight;
        sourceWidth = sourceHeight * targetAspectRatio;
        sourceX = (video.videoWidth - sourceWidth) / 2;
        sourceY = 0;
      } else {
        // Video is taller, crop height
        sourceWidth = video.videoWidth;
        sourceHeight = sourceWidth / targetAspectRatio;
        sourceX = 0;
        sourceY = (video.videoHeight - sourceHeight) / 2;
      }

      // Draw the properly cropped video frame onto the canvas
      context?.drawImage(
        video,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      const imageDataUrl = canvas.toDataURL("image/png");

      return imageDataUrl;
    },
  }));

  return isStreamReady ? (
    <div className={`${styles.videoContainer} h-full ${className}`}>
      <video
        autoPlay
        loop
        ref={videoRef}
        playsInline
        muted
        className="h-full scale-x-[-1] transform object-cover"
        controls={false}
      />
    </div>
  ) : (
    <>
      <AspectRatio ratio={4 / 5}>
        <Skeleton className="h-full w-full bg-transparent" />
      </AspectRatio>
    </>
  );
});
