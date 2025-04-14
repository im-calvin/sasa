"use client";
import { memo, useEffect, useRef, useState } from "react";
import { Video } from "@/components/Video";
import {
  FLASH_DURATION,
  GIF_DURATION,
  MAX_PHOTOS,
  RESET_TIME,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useScreenshots } from "@/lib/ScreenshotsContext";
import PrimaryButton from "@/components/PrimaryButton";
import { Loading } from "@/components/Loading";

const VideoMemo = memo(Video); // memoize so that video component doesn't rerender and flash

export default function CameraPage() {
  const router = useRouter();
  const [time, setTime] = useState(-1);
  const videoRef = useRef<{
    getScreenshot: (aspectRatioElement: HTMLElement) => string;
  } | null>(null);
  const { addScreenshot, screenshots } = useScreenshots();
  const [isTakingPhotos, setIsTakingPhotos] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);
  const aspectRatioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (time === 0 && videoRef.current && aspectRatioRef.current) {
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
      }, FLASH_DURATION);

      // take a snapshot
      const image = videoRef.current.getScreenshot(aspectRatioRef.current);

      addScreenshot(image);
      setTime(RESET_TIME); // reset the timer
    } else if (time === RESET_TIME) {
      setIsTakingPhotos(true);
    }
  }, [time, addScreenshot]);

  useEffect(() => {
    if (screenshots.length === MAX_PHOTOS) {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/photos");
      }, GIF_DURATION);
    }
  }, [screenshots, router]);

  return (
    <div className="relative grid max-h-lvh min-h-lvh grid-rows-[auto_auto_auto] items-center justify-items-center overflow-hidden">
      {flash && (
        <div className="animate-fade-out bg-background pointer-events-none absolute inset-0 z-99 min-h-lvh opacity-100" />
      )}
      {!isLoading && (
        <>
          {/* top banner */}
          <div className="row-start-1 h-full w-full bg-black" />
          {/* bottom banner */}
          <div className="row-start-3 h-full w-full bg-black" />
        </>
      )}
      {/* actual content */}
      {isLoading ? (
        <>
          <div className="row-start-1 flex h-full items-start">
            <h5 className="pt-10">{"SAMANTHA'S PHOTO BOOTH"}</h5>
          </div>
          <div className="row-start-2 flex items-center justify-center">
            <Loading text={"Lookin' Gooooood ;)"} />
          </div>
        </>
      ) : (
        <div className="relative row-start-2 flex aspect-4/5 h-full w-screen items-center justify-center">
          <div className="absolute inset-0 -z-1 h-full">
            <VideoMemo
              ref={videoRef}
              className={`scale-[1.1] ${isTakingPhotos ? "" : "transform blur-[2px] brightness-50"}`}
            />
            {time <= 5 && time > 0 && (
              <div className="absolute inset-0 z-0 flex w-screen items-center justify-center">
                <p className="text-[3rem] text-white">{time}</p>
              </div>
            )}
          </div>

          <main
            className="flex aspect-4/5 h-full w-auto flex-col items-center justify-center gap-8 text-white"
            ref={aspectRatioRef}
          >
            <div
              className={`flex flex-col items-center gap-1 ${isTakingPhotos ? "invisible" : ""}`}
            >
              <h3>Step 3</h3>
              <h2 className="text-white">Start Snapping</h2>
            </div>
            <div
              className={`flex flex-col items-center justify-center gap-8 ${isTakingPhotos ? "invisible" : ""}`}
            >
              <p className="w-3/4 text-center">
                {`You'll get ${MAX_PHOTOS} photos with ${RESET_TIME} seconds to pose each time`}
              </p>
              <PrimaryButton
                disable={time === -1}
                onClick={() => {
                  setTime(RESET_TIME);
                }}
                className="text-black"
              >
                <h4 className="font-bold">{"I'm ready"}</h4>
              </PrimaryButton>
              <p>{`${screenshots.length}/${MAX_PHOTOS}`}</p>
            </div>
            {isTakingPhotos && (
              <>
                <p className="flex h-full items-end pb-4 text-shadow-lg">{`${screenshots.length}/${MAX_PHOTOS}`}</p>
              </>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
