"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Video } from "@/components/Video";
import Link from "next/link";

export default function PreviewPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-instrument">
      <header className="font-geist font-light row-start-1">
        SAMANTHA'S PHOTO CORNER
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h3 className="font-geist font-light">STEP 3</h3>
        <h2 className="font-instrument text-red-300 italic">Start Snapping</h2>
        <AspectRatio ratio={4 / 5}>
          <Video />
        </AspectRatio>
        <p className="font-geist font-light w-3/5 text-center text-md">
          You'll get 6 photos within 5 seconds to pose each time
        </p>
      </main>
      <div className="row-start-3 flex w-full justify-center flex-row sm:flex-row">
        <Button
          asChild
          variant="outline"
          className="font-bold font-geist border-black">
          <Link href="/camera">I'M READY</Link>
        </Button>
      </div>
    </div>
  );
}
