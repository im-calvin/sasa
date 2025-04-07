import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-instrument">
      <header>
        <h5>IDEA GRAD SHOW 2025</h5>
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Photo Corner</h1>
        <Image
          className=""
          src="/next.svg"
          alt="Digital Frames"
          width={180}
          height={38}
          priority
        />
        <div className="body text-center">
          Take some photos and enjoy these digital frames I designed~
        </div>
        <div className="flex gap-4 items-center flex-row">
          <Button
            asChild
            variant="outline"
            className="font-bold font-geist border-black p-[10px]">
            <Link href="/frame">
              <h4>Start</h4>
            </Link>
          </Button>
        </div>
      </main>
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
