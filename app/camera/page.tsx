"use client";
import { useEffect, useState } from "react";
import { Video } from "@/components/Video";

export default function Camera() {
  const [time, setTime] = useState(5);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Video />
    </div>
  );
}
