import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-20">
      <header className="row-start-1">
        <h5>IDEA GRAD SHOW 2025</h5>
      </header>
      <main className="flex flex-col gap-[32px] row-start-4 items-center">
        <h1>Photo Corner</h1>
        <Image
          className=""
          src="/next.svg"
          alt="Digital Frames"
          width={180}
          height={38}
          priority
        />
        <div className="body text-center w-4/5">
          Thanks for coming! Take some photos and enjoy these digital frames I
          designed~
        </div>
      </main>
      <div className="flex gap-4 justify-center flex-row row-start-5">
        <PrimaryButton text={"Start"} href={"/frame"} />
      </div>
      <footer className="row-start-6">
        <Footer />
      </footer>
    </div>
  );
}
