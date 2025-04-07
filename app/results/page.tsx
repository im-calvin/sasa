"use client";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const params = useSearchParams();
  if (!params.has("url")) {
    router.replace("/");
    return;
  }
  const url = params.get("url") as string;

  return (
    <div className="grid grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-20">
      <header className="row-start-1">
        <h5>{"SAMANTHA'S PHOTO CORNER"}</h5>
      </header>
      <h2 className="row-start-3">Ta Daa~!</h2>
      <main className="row-start-4 w-4/5">
        <AspectRatio ratio={4 / 5}>
          <Image
            src={url}
            alt="Photostrip"
            width={500} // once again this don't do nothin
            height={200}
          />
        </AspectRatio>
      </main>
      <div className="row-start-5 flex w-full justify-center flex-row">
        <PrimaryButton>
          <Link href={url}>
            <h4>Download & Share</h4>
          </Link>
        </PrimaryButton>
      </div>
      <footer className="row-start-6">
        <Footer />
      </footer>
    </div>
  );
}
