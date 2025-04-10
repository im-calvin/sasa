"use client";
import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFrame } from "@/lib/FrameContext";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";

export default function FramePage() {
  const { selectedFrame, setSelectedFrame } = useFrame();

  return (
    <div className="grid min-h-svh grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center gap-8 p-8 sm:p-20">
      <header className="row-start-1">
        <h5>{"SAMANTHA'S PHOTO CORNER"}</h5>
      </header>
      <h3 className="row-start-2">STEP 1</h3>
      <h2 className="row-start-3">Choose a Frame</h2>
      <main className="row-start-4 grid grid-cols-2 grid-rows-[1fr_20px] gap-8">
        <AspectRatio ratio={136 / 366}>
          <Image
            onClick={() => {
              setSelectedFrame("light");
            }}
            className={`box-content p-2 ${
              selectedFrame === "light" ? "border-2 border-(--saman-red)" : ""
            } `}
            src="/next.svg"
            alt="Digital Frames"
            width={180}
            height={38}
            priority
          />
        </AspectRatio>
        <AspectRatio ratio={136 / 366}>
          <Image
            onClick={() => {
              setSelectedFrame("dark");
            }}
            className={`box-content p-2 ${selectedFrame === "dark" ? "border-2 border-(--saman-red)" : ""} `}
            src="/next.svg"
            alt="Digital Frames"
            width={180}
            height={38}
            priority
          />
        </AspectRatio>
        <div>
          <h4 className="text-center">LIGHT VER.</h4>
          <p className="text-center">(3 photos)</p>
        </div>
        <div>
          <h4 className="text-center">DARK VER.</h4>
          <p className="text-center">(3 photos)</p>
        </div>
      </main>
      <div className="row-start-5 flex w-full flex-row justify-center">
        <PrimaryButton disable={selectedFrame === ""}>
          <Link href="/access">
            <h4>Next</h4>
          </Link>
        </PrimaryButton>
      </div>
      <footer className="row-start-6">
        <Footer />
      </footer>
    </div>
  );
}
