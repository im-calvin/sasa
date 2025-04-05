"use client";
import { memo, RefObject, useEffect, useRef, useState } from "react";
import { Video } from "@/components/Video";

const VideoMemo = memo(Video); // memoize so that video component doesn't rerender and flash

export default function CameraPage() {
  const [time, setTime] = useState(0);
  const [screenshots, setScreenshots] = useState<string[]>([]); // array of image/png
  const videoRef = useRef<{ getScreenshot: () => string } | null>(null);

  // notify the child to take a screenshot
  function handleScreenshot(imageDataUrl: string) {
    setScreenshots((screenshot) => [...screenshot, imageDataUrl]);
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (time === 0 && videoRef.current) {
      // take a snapshot
      const image = videoRef.current.getScreenshot();
      // TODO do fancy css animation to appear like a screenshot was taken <3
      handleScreenshot(image);
    }
  }, [time]);

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <VideoMemo
        ref={videoRef}
        setTime={setTime}
        handleScreenshot={handleScreenshot}
      />
      {time <= 5 && time > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-white">{time}</div>
        </div>
      )}
    </div>
  );
}
