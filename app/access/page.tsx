"use client";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import { requestCameraPermission } from "@/lib/utils";
import Link from "next/link";
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
    <div className="grid max-h-svh min-h-svh grid-rows-[23svh_64svh_13svh] items-center justify-items-center">
      <header className="row-start-1 flex flex-col items-center justify-center">
        <h5 className="pt-2">{"SAMANTHA'S PHOTO CORNER"}</h5>
        <h3 className="pt-7">STEP 2</h3>
        <h2 className="pt-2">Camera access</h2>
      </header>
      <main className="row-start-2 flex flex-col items-center gap-[32px]">
        {canNext ? (
          <>
            <p>Access granted</p>
          </>
        ) : (
          // ask for camera perms
          <>
            <p className="w-4/5 text-center">
              Make sure you allow camera access before you start
            </p>
            <p>
              Not popping up?{" "}
              <span
                onClick={() => {
                  requestCameraPermission();
                }}
                className="underline hover:cursor-pointer"
              >
                Request access
              </span>
            </p>
          </>
        )}
      </main>
      <div className="row-start-3 flex w-full flex-col items-center justify-center gap-2">
        <PrimaryButton disable={!canNext}>
          <Link href="/camera">
            <h4>Next</h4>
          </Link>
        </PrimaryButton>
        <Footer />
      </div>
    </div>
  );
}
