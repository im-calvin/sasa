"use client";
import { useRef, useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

type VideoPropsT = {
  setTime: Dispatch<SetStateAction<number>>;
};

export function Video({setTime}: VideoPropsT) {
  const streamRef = useRef<MediaStreamTrack[] | null>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);

  async function requestCameraPermission() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      console.log("Camera permission granted");
      streamRef.current = stream.getVideoTracks();
      setIsStreamReady(true);
      setTime(6);
    } catch (error) {
      console.error("Camera permission denied", error);
    }
  }

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return isStreamReady ? (
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
