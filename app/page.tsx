import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-svh grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center gap-8 p-8 sm:p-20">
      <header className="row-start-1">
        <h5>IDEA GRAD SHOW 2025</h5>
      </header>
      <main className="row-start-4 flex flex-col items-center gap-[32px]">
        <h1>Photo Corner</h1>
        <Image
          src="/home.png"
          className="black"
          alt="Digital Frames"
          width={1080}
          height={300}
          priority
        />
        <p className="w-4/5 text-center">
          Thanks for coming! Take some photos and enjoy these digital frames I
          designed~
        </p>
      </main>
      <div className="row-start-5 flex flex-row justify-center gap-4">
        <PrimaryButton>
          <Link href="/frame">
            <h4>Start</h4>
          </Link>
        </PrimaryButton>
      </div>
      <footer className="row-start-6">
        <Footer />
      </footer>
    </div>
  );
}
