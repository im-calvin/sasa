import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-instrument">
      <header className="font-geist font-light">IDEA GRAD SHOW 2025</header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="font-instrument text-red-300 italic">Photo Corner</h1>
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
            <Link href="/frame">Start</Link>
          </Button>
        </div>
      </main>

    </div>
  );
}
