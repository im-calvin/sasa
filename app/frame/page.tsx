"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFrame } from "@/lib/FrameContext";

export default function FramePage() {
  const { selectedFrame, setSelectedFrame } = useFrame();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-instrument">
      <header>
        <h5>{"SAMANTHA'S PHOTO CORNER"}</h5>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h3 className="font-geist font-light">STEP 1</h3>
        <h2 className="font-instrument text-red-300 italic">Choose a frame</h2>
        <div className="grid grid-cols-2 grid-rows-[20px_1fr] gap-8">
          <AspectRatio ratio={136 / 366}>
            <Image
              onClick={() => {
                setSelectedFrame("light");
              }}
              className={
                selectedFrame === "light" ? "border-4 border-red-500" : ""
              }
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
              className={
                selectedFrame === "dark" ? "border-4 border-red-500" : ""
              }
              src="/next.svg"
              alt="Digital Frames"
              width={180}
              height={38}
              priority
            />
          </AspectRatio>
          <div>
            <h3 className="font-bold font-geist text-md text-center">
              LIGHT VER.
            </h3>
            <p className="font-geist text-sm text-center">(3 photos)</p>
          </div>
          <div>
            <h3 className="font-bold font-geist text-md text-center">
              DARK VER.
            </h3>
            <p className="font-geist text-sm text-center">(3 photos)</p>
          </div>
        </div>
      </main>
      <div className="row-start-3 flex w-full justify-between flex-row sm:flex-row">
        <Button
          asChild
          variant="outline"
          className="font-bold font-geist border-black">
          <Link href="/">Back</Link>
        </Button>
        <Button
          asChild={selectedFrame !== ""} // the disabled doesn't work without this, ref: https://github.com/shadcn-ui/ui/issues/1894#issuecomment-2089988087
          variant="outline"
          disabled={selectedFrame === ""}
          className="font-bold font-geist border-black">
          <Link
            href={{
              pathname: "/access",
            }}>
            Next
          </Link>
        </Button>
      </div>
      <footer>
        <div className="caption">
          {"Made by "}
          <a
            href="https://www.linkedin.com/in/samantha-yeung-profile/"
            target="_blank"
            rel="noopener noreferrer">
            Samantha Yeung
          </a>
          {" & "}
          <a
            href="https://linkedin.com/in/kelvinhkwong"
            target="_blank"
            rel="noopener noreferrer">
            Kelvin Wong
          </a>
        </div>
      </footer>
    </div>
  );
}
