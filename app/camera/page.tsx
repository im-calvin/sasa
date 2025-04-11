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
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    <div className="relative grid max-h-svh min-h-svh grid-rows-[auto_auto_auto_auto_auto] items-center justify-items-center">
      {flash && (
        <div className="animate-fade-out bg-background pointer-events-none absolute inset-0 z-99 min-h-lvh opacity-100" />
      )}
      <div className="absolute inset-0 -z-1 min-h-lvh w-auto overflow-hidden">
        <div className="relative">
          <VideoMemo ref={videoRef} />
          {time <= 5 && time > 0 && (
            <div className="absolute inset-0 z-0 flex w-screen items-center justify-center">
              <p className="text-[3rem] text-white">{time}</p>
            </div>
          )}
        </div>
      </div>
      {/* top banner */}
      <div className="col-start-1 -col-end-1 row-start-1 row-end-4 h-full w-full bg-red-300 opacity-50" />
      {/* bottom banner */}
      <div className="col-start-1 -col-end-1 row-start-5 h-full w-full bg-red-300 opacity-50" />
      {/* actual content */}
      <header className="col-start-1 -col-end-1 row-start-1 mx-auto flex h-full w-full justify-center pt-8 pb-4 opacity-50">
        <h5>{"SAMANTHA'S PHOTO CORNER"}</h5>
      </header>
      {isLoading ? (
        <div className="row-start-4">
          <Loading text={"Lookin' goooood ;)"} />
        </div>
      ) : (
        <>
          {!isTakingPhotos && (
            <h3 className="col-start-1 -col-end-1 row-start-2 pt-4">STEP 3</h3>
          )}
          <h2 className="col-start-1 -col-end-1 row-start-3 pt-2">
            {isTakingPhotos ? "Smile!" : "Start Snapping"}
          </h2>
          <main className="col-start-1 -col-end-1 row-start-4 w-full">
            <AspectRatio
              ref={aspectRatioRef}
              ratio={4 / 5}
              className="flex flex-col items-center justify-center gap-8"
            >
              {!isTakingPhotos && (
                <>
                  <p className="w-3/4 text-center text-white">
                    {`You'll get ${MAX_PHOTOS} photos with ${RESET_TIME} seconds to pose each time`}
                  </p>
                  <PrimaryButton
                    disable={time === -1}
                    onClick={() => {
                      setTime(RESET_TIME);
                    }}
                    className="z-1"
                  >
                    <h4>{"I'm ready"}</h4>
                  </PrimaryButton>
                </>
              )}
            </AspectRatio>
          </main>
        </>
      )}
      <div className="col-start-1 -col-end-1 row-start-5">{`${screenshots.length}/${MAX_PHOTOS}`}</div>
    </div>
  );
}
