import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid max-h-svh min-h-svh grid-rows-[10svh_auto_13svh] items-center justify-items-center overflow-hidden">
      <header className="row-start-1 flex flex-col items-center justify-center">
        <h5 className="pt-2">{"IDEA GRAD SHOW 2025"}</h5>
      </header>
      <main className="row-start-2 flex h-full flex-col items-center justify-center">
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
      <div className="row-start-3 flex w-full flex-col items-center justify-start gap-2">
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
