"use client";
import Footer from "@/components/Footer";
import { Loading } from "@/components/Loading";
import PrimaryButton from "@/components/PrimaryButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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

  const url = params.get("url") as string;

  const getFile = useCallback(async () => {
    // prefetch the file
    if (fileRef.current) {
      return;
    }
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "Samantha's Photo Corner.jpg", {
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
    <div className="grid min-h-svh grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center gap-8 p-8 sm:p-20">
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
      <div className="row-start-5 flex w-full flex-row justify-center">
        <PrimaryButton onClick={handleShare}>
          <h4>Download & Share</h4>
        </PrimaryButton>
      </div>
      <footer className="row-start-6">
        <Footer />
      </footer>
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
