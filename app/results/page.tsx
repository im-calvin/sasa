"use client";
import Footer from "@/components/Footer";
import { Loading } from "@/components/Loading";
import PrimaryButton from "@/components/PrimaryButton";
import { useFrame } from "@/lib/FrameContext";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef } from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/canShare
interface ShareData {
  url?: string;
  text?: string;
  title?: string;
  files?: File[];
}

function ResultsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const fileRef = useRef<File | null>(null);
  const { selectedFrame } = useFrame();

  const url = params.get("url") as string;

  const getFile = useCallback(async () => {
    // prefetch the file
    if (fileRef.current) {
      return;
    }
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "Samantha's Photo Booth.jpg", {
      type: blob.type,
    });
    fileRef.current = file;
  }, [url]);

  useEffect(() => {
    getFile();
  }, [getFile]);

  if (!params.has("url")) {
    router.replace("/");
    return;
  }

  async function handleShare() {
    if (!fileRef.current) {
      await getFile();
    }
    const shareData: ShareData = {
      title: "Check out this photostrip!",
      text: "Here's a photostrip I created!",
      files: [fileRef.current as File],
    };
    if (!navigator.canShare) {
      alert("Sharing is not supported in this browser.");
    }
    if (!navigator.canShare(shareData)) {
      // share the link instead
      shareData.files = undefined;
      shareData.url = url;
    }

    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }

  return (
    <div className="grid max-h-svh min-h-svh grid-rows-[15svh_69svh_16svh] items-center justify-items-center">
      <header className="row-start-1 flex flex-col items-center justify-center">
        <h5 className="pt-2">{"SAMANTHA'S PHOTO BOOTH"}</h5>
        <h2 className="pt-4">{"Ta Daa~!"}</h2>
      </header>
      <main className="row-start-2 flex h-full w-auto items-center justify-center pt-2">
        {/* TODO add a fade from placeholder to normal */}
        <div className="aspect-frame relative mx-auto h-full">
          <Image
            src={url}
            alt="Photostrip"
            fill
            priority
            placeholder="blur"
            blurDataURL={
              selectedFrame === "light"
                ? "/frame1_blur.png"
                : "/frame2_blur.png"
            }
          />
        </div>
      </main>
      <div className="row-start-3 flex w-full flex-col items-center gap-4">
        <PrimaryButton onClick={handleShare}>
          <h4>Download & Share</h4>
        </PrimaryButton>
        <Footer />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<Loading text={"Generating photostrip!"} />}>
      <ResultsContent />
    </Suspense>
  );
}
