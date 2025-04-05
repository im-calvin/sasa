"use client";
import { trackFallbackParamAccessed } from "next/dist/server/app-render/dynamic-rendering";
import { useRef, useEffect, useState, RefObject } from "react";
import { Dispatch, SetStateAction } from "react";

type VideoPropsT = {
  setTime: Dispatch<SetStateAction<number>>;
  takeScreenshot: (
    video: RefObject<HTMLVideoElement>,
    canvasRef: RefObject<HTMLVideoElement>
  ) => void;
};

export function Video({ setTime, takeScreenshot }: VideoPropsT) {
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
    requestCameraPermission();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // whenever the parent triggers takeScreenshot, this component takes a screenshot and then passes it back up
  function screenshot() {
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

    console.log(imageDataUrl);
  }

  return isStreamReady ? (
    <video
      autoPlay
      ref={videoRef}
      onLoadedMetadata={() => {
        if (streamRef.current) {
          videoRef.current!.srcObject = streamRef.current; // Set the stream to the video element
        }
      }}
      className="w-full"
    />
  ) : (
    <p>Please allow camera access</p>
  );
}
