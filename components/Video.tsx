"use client";
import {
  useRef,
  useEffect,
  useState,
  RefObject,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Dispatch, SetStateAction } from "react";

type VideoPropsT = {
  setTime: Dispatch<SetStateAction<number>>;
  handleScreenshot: (imageDataUrl: string) => void;
};

// Define Video as a regular function
const Video = forwardRef(function Video(
  { setTime, handleScreenshot }: VideoPropsT,
  ref
) {
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);

  async function requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("Camera permission granted");
      streamRef.current = stream;
      setIsStreamReady(true);
      setTime(6);
    } catch (error) {
      console.error("Camera permission denied", error);
    }
  }

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play();
    }
  }, [isStreamReady]);

  useEffect(() => {
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
    <video autoPlay ref={videoRef} className="w-full" />
  ) : (
    <p>Please allow camera access</p>
  );
});

export { Video };
