"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFrame } from "@/lib/FrameContext";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";

export default function FramePage() {
  const { selectedFrame, setSelectedFrame } = useFrame();

  return (
    <div className="grid grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-20">
      <header className="row-start-1">
        <h5>{"SAMANTHA'S PHOTO CORNER"}</h5>
      </header>
      <h3 className="row-start-2">STEP 1</h3>
      <h2 className="row-start-3">Choose a frame</h2>
      <main className="row-start-4 grid grid-cols-2 grid-rows-[20px_1fr] gap-8">
        <AspectRatio ratio={136 / 366}>
          <Image
            onClick={() => {
              setSelectedFrame("light");
            }}
            className={`
              p-2 box-content
              ${
                selectedFrame === "light" ? "border-2 border-(--saman-red)" : ""
              }
              `}
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
            className={`
              p-2 box-content
              ${selectedFrame === "dark" ? "border-2 border-(--saman-red)" : ""}
              `}
            src="/next.svg"
            alt="Digital Frames"
            width={180}
            height={38}
            priority
          />
        </AspectRatio>
        <div>
          <h4 className="text-center">LIGHT VER.</h4>
          <h5 className="text-center">(3 photos)</h5>
        </div>
        <div>
          <h4 className="md text-center">DARK VER.</h4>
          <h5 className="text-center">(3 photos)</h5>
        </div>
      </main>
      <div className="row-start-5 flex w-full justify-center flex-row">
        <PrimaryButton
          text={"Next"}
          disable={selectedFrame === ""}
          href={"/access"}
        />
      </div>
      <footer className="row-start-6">
        <Footer />
      </footer>
    </div>
  );
}
