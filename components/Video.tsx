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

// Define Video as a regular function
export const Video = forwardRef(function Video({}, ref) {
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
    getScreenshot() {
      if (!streamRef.current || !videoRef.current) {
        return;
      }

      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/png");
      return imageDataUrl;
    },
  }));

  return isStreamReady ? (
    <div className={styles.videoContainer}>
      <AspectRatio ratio={4 / 5}>
        <video
          autoPlay
          loop
          ref={videoRef}
          playsInline
          muted
          className="mx-auto h-full scale-x-[-1] transform object-cover"
        />
      </AspectRatio>
    </div>
  ) : (
    <>
      <AspectRatio ratio={4 / 5}>
        <Skeleton className="h-full w-full bg-transparent" />
      </AspectRatio>
    </>
  );
});
