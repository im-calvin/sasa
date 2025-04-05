"use client";
import { memo, useEffect, useState } from "react";
import { Video } from "@/components/Video";

const VideoMemo = memo(Video);

export default function Camera() {
  const [time, setTime] = useState(0); // NOTE: this is a little hacky, it should be synced on the camera permissions

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (time === 0) {
      // take a snapshot
      
    }
  }, [time])

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <VideoMemo setTime={setTime} />
      {time <= 5 && time > 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-white">{time}</div>
        </div>
      )}
    </div>
  );
}
