"use client";
import { useRef, useEffect } from "react";

type VideoPropsT = {
};

export function Video({  }: VideoPropsT) {
  const streamRef = useRef<MediaStreamTrack[] | null>(null);

  async function requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("Camera permission granted");
      streamRef.current = stream.getVideoTracks();
    } catch (error) {
      console.error("Camera permission denied", error);
    }
  }

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return streamRef.current ? (
    <video
      autoPlay
      ref={(video) => {
        if (video && streamRef.current) {
          video.srcObject = new MediaStream(streamRef.current);
        }
      }}
    />
  ) : (
    <p>Please allow camera access</p>
  );
}
