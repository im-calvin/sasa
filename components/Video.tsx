"use client";
import { RESET_TIME } from "@/lib/constants";
import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Dispatch, SetStateAction } from "react";

type VideoPropsT = {
  setTime: Dispatch<SetStateAction<number>>;
};

// Define Video as a regular function
const Video = forwardRef(function Video({ setTime }: VideoPropsT, ref) {
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
        setTime(RESET_TIME);
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
  }, [setTime]);

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
    <video autoPlay ref={videoRef} playsInline muted className="w-full" />
  ) : (
    <p>Please allow camera access</p>
  );
});

export { Video };
