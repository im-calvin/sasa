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
      const videoRect = video.getBoundingClientRect();

      // Calculate the overlap region
      const overlapX = Math.max(0, aspectRect.left - videoRect.left);
      const overlapY = Math.max(0, aspectRect.top - videoRect.top);
      const overlapWidth = Math.min(
        aspectRect.width,
        videoRect.width - overlapX,
      );
      const overlapHeight = Math.min(
        aspectRect.height,
        videoRect.height - overlapY,
      );

      // Set canvas dimensions to the overlap region
      canvas.width = overlapWidth;
      canvas.height = overlapHeight;

      // Scale the coordinates to match the video dimensions
      const scaleX = video.videoWidth / videoRect.width;
      const scaleY = video.videoHeight / videoRect.height;

      const sourceX = overlapX * scaleX;
      const sourceY = overlapY * scaleY;
      const sourceWidth = overlapWidth * scaleX;
      const sourceHeight = overlapHeight * scaleY;

      // Draw the cropped video frame onto the canvas
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
