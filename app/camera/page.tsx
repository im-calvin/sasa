"use client";
import { memo, useEffect, useRef, useState } from "react";
import { Video } from "@/components/Video";
import { GIF_DURATION, MAX_PHOTOS, RESET_TIME } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useScreenshots } from "@/lib/ScreenshotsContext";
import PrimaryButton from "@/components/PrimaryButton";
import Footer from "@/components/Footer";
import { Loading } from "@/components/Loading";

const VideoMemo = memo(Video); // memoize so that video component doesn't rerender and flash

export default function CameraPage() {
  const router = useRouter();
  const [time, setTime] = useState(-1);
  const videoRef = useRef<{ getScreenshot: () => string } | null>(null);
  const { addScreenshot, screenshots } = useScreenshots();
  const [isTakingPhotos, setIsTakingPhotos] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <div className="grid grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center min-h-screen max-h-screen h-screen p-8 gap-8 sm:p-20">
      <header className="row-start-1">
        <h5>{"SAMANTHA'S PHOTO CORNER"}</h5>
      </header>
      {isLoading ? (
        <div className="row-start-4">
          <Loading text={"Lookin' goooood ;)"} />
        </div>
      ) : (
        <>
          {!isTakingPhotos && <h3 className="row-start-2">STEP 3</h3>}
          <h2 className="row-start-3">
            {isTakingPhotos ? "Smile!" : "Start Snapping"}
          </h2>
          <main className="w-4/5 row-start-4 h-full">
            <div className="relative py-9">
              <VideoMemo ref={videoRef} />
              {time <= 5 && time > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[3rem] text-white">{time}</p>
                </div>
              )}
            </div>
            <p className="text-center flex justify-center w-full">
              {isTakingPhotos
                ? `${screenshots.length}/${MAX_PHOTOS}`
                : `You'll get ${MAX_PHOTOS} photos with ${RESET_TIME} seconds to pose each time`}
            </p>
          </main>
          <div className="row-start-5 flex w-full justify-center flex-row">
            {!isTakingPhotos && (
              <PrimaryButton
                disable={time === -1}
                onClick={() => {
                  setTime(RESET_TIME);
                }}>
                <h4>{"I'm ready"}</h4>
              </PrimaryButton>
            )}
          </div>
        </>
      )}
      <footer className="row-start-6">
        <Footer />
      </footer>
    </div>
  );
}
