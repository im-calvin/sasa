import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-instrument">
      <header className="font-geist font-light">IDEA GRAD SHOW 2025</header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Samantha's photo corner text goes here :D</h1>
        <Image
          className=""
          src="/next.svg"
          alt="Digital Frames"
          width={180}
          height={38}
          priority
        />
        <h3 className="text-center font-light font-geist text-md">
          Take some photos and enjoy these digital frames I designed~
        </h3>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button
            asChild
            variant="outline"
            className="font-bold font-geist border-black">
            <Link href="/camera">Start</Link>
          </Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/samantha-yeung-profile/"
          target="_blank"
          rel="noopener noreferrer">
          <h4 className="font-light font-geist text-center text-sm">
            Made with {"<3"} by Samantha Yeung & Kelvin Wong
          </h4>
        </a>
      </footer>
    </div>
  );
}
