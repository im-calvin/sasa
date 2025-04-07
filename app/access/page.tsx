"use client";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import { requestCameraPermission } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function AccessPage() {
  const [canNext, setCanNext] = useState<boolean>(false);
  useEffect(() => {
    async function checkCameraPermission() {
      const stream = await requestCameraPermission();
      if (stream) {
        setCanNext(true);
      }
    }
    checkCameraPermission();
  }, []);

  return (
    <div className="grid grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-20">
      <header className="row-start-1">
        <h5>{"SAMANTHA'S PHOTO CORNER"}</h5>
      </header>
      <h3 className="row-start-2">STEP 2</h3>
      <h2 className="row-start-3">Camera access</h2>
      <main className="row-start-4 flex flex-col gap-[32px] items-center sm:items-start">
        {canNext ? (
          <>
            <p>Access granted</p>
          </>
        ) : (
          // ask for camera perms
          <>
            <p className="text-center w-4/5">
              Make sure you allow camera access before you start
            </p>
            <p>
              Not popping up?{" "}
              <span
                onClick={() => {
                  requestCameraPermission();
                }}
                className="underline hover:cursor-pointer">
                Request access
              </span>
            </p>
          </>
        )}
      </main>
      <div className="row-start-5 flex w-full justify-center flex-row">
        <PrimaryButton text={"Next"} disable={!canNext} href={"/access"} />
      </div>
      <footer className="row-start-6">
        <Footer />
      </footer>
    </div>
  );
}
