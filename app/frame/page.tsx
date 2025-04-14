"use client";
import React from "react";
import Image from "next/image";
import { useFrame } from "@/lib/FrameContext";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";

export default function FramePage() {
  const { selectedFrame, setSelectedFrame } = useFrame();

  return (
    // top 3 rows is 22.6%
    // bottom 2 rows is 13%
    <div className="grid max-h-svh min-h-svh grid-rows-[23svh_64svh_13svh] items-center justify-items-center">
      <header className="row-start-1 flex flex-col items-center justify-center">
        <h5 className="pt-2">{"SAMANTHA'S PHOTO CORNER"}</h5>
        <h3 className="pt-7">STEP 1</h3>
        <h2 className="pt-2">Choose a Frame</h2>
      </header>
      <main className="row-start-2 flex h-full w-auto items-center justify-center gap-8">
        <div className="aspect-frame relative mx-auto h-full">
          <Image
            onClick={() => {
              setSelectedFrame("light");
            }}
            className={`object-cover ${
              selectedFrame === "light"
                ? "outline-2 outline-offset-4 outline-(--saman-red)"
                : ""
            } `}
            src="/frame1.svg"
            alt="Digital Frames"
            fill
            priority
          />
        </div>
        <div className="aspect-frame relative mx-auto h-full">
          <Image
            onClick={() => {
              setSelectedFrame("dark");
            }}
            className={`object-cover ${selectedFrame === "dark" ? "outline-2 outline-offset-4 outline-(--saman-red)" : ""} `}
            src="/frame2.svg"
            alt="Digital Frames"
            fill
            priority
          />
        </div>
      </main>
      <div className="row-start-3 flex w-full flex-col items-center justify-start gap-2">
        <PrimaryButton disable={selectedFrame === ""}>
          <Link href="/access">
            <h4>Next</h4>
          </Link>
        </PrimaryButton>
        <Footer />
      </div>
    </div>
  );
}
