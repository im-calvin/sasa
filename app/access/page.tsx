"use client";
import { Button } from "@/components/ui/button";
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-instrument">
      <header className="font-geist font-light row-start-1">
        SAMANTHA'S PHOTO CORNER
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h3 className="font-geist font-light">STEP 2</h3>
        <h2 className="font-instrument text-red-300 italic">Camera access</h2>
        <p className="text-center text-md font-geist font-light w-3/5">
          Make sure you allow camera access before you start
        </p>
        <Button onClick={() => requestCameraPermission()} variant={"outline"}>
          Request Access
        </Button>
      </main>
      <div className="row-start-3 flex w-full justify-between flex-row sm:flex-row">
        <Button
          asChild
          variant="outline"
          className="font-bold font-geist border-black">
          <Link href="/frame">Back</Link>
        </Button>
        <Button
          asChild={canNext} // the disabled doesn't work without this, ref: https://github.com/shadcn-ui/ui/issues/1894#issuecomment-2089988087
          variant="outline"
          disabled={!canNext}
          className="font-bold font-geist border-black">
          <Link
            href={{
              pathname: "/preview",
            }}>
            Next
          </Link>
        </Button>
      </div>
    </div>
  );
}
