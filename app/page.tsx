"use client";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.clear();
  });

  return (
    <div className="grid max-h-svh min-h-svh grid-rows-[5svh_auto_13svh] items-center justify-items-center overflow-hidden">
      <header className="row-start-1 flex h-full w-full items-end justify-center">
        <h5>{"IDEA GRAD SHOW 2025"}</h5>
      </header>
      <main className="row-start-2 flex h-full flex-col items-center justify-center pt-10">
        <div className="relative aspect-[428/633] h-full">
          <Image
            src="/home.png"
            className="aspect-frame relative mx-auto h-full overflow-hidden object-cover"
            alt="Digital Frames"
            fill
            priority
            quality={100}
          />
        </div>
      </main>
      <div className="row-start-3 flex w-full flex-col items-center justify-start gap-4">
        <PrimaryButton>
          <Link href="/frame">
            <h4>Start</h4>
          </Link>
        </PrimaryButton>
        <Footer />
      </div>
    </div>
  );
}
