"use client";
import { useState } from "react";
import { useScreenshots } from "@/lib/ScreenshotsContext";
import Image from "next/image";
import { NUM_PHOTOS } from "@/lib/constants";
import PrimaryButton from "@/components/PrimaryButton";
import Footer from "@/components/Footer";
import NumberedCircle from "@/components/NumberedCircle";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";
import { useFrame } from "@/lib/FrameContext";

export default function PhotosPage() {
  const { screenshots } = useScreenshots();
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { selectedFrame } = useFrame();

  const toggleSelection = (image: string) => {
    setSelectedImages((prev) => {
      if (prev.includes(image)) {
        return prev.filter((img) => img !== image); // Deselect image
      } else if (prev.length < NUM_PHOTOS) {
        return [...prev, image]; // Select image if under limit
      }
      return prev; // Do nothing if limit reached
    });
  };

  async function generatePhotostrip() {
    setIsLoading(true); // show loading to the user
    // don't do a timeout here, just wait for the fetch :3

    const response = await fetch("/api/composite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: selectedImages, frame: selectedFrame }),
    });

    if (!response.ok) {
      console.error("Failed to generate photostrip");
      return;
    }

    const data = await response.json();
    // get the photostrip url from the response
    const url = data.url as string;
    const params = new URLSearchParams();
    params.set("url", url);
    router.push(`/results?${params.toString()}`);
    // maybe we should just wait for the gif to spin a little :3
    // setTimeout(() => {
    //   router.push(`/results?${params.toString()}`);
    // }, GIF_DURATION);
  }

  return (
    <div className="grid max-h-svh min-h-svh grid-rows-[23svh_64svh_13svh] items-center justify-items-center">
      <header className="row-start-1 flex flex-col items-center justify-center">
        <h5 className="pt-2">{"SAMANTHA'S PHOTO CORNER"}</h5>
        {!isLoading && (
          <>
            <h3 className="pt-7">STEP 4</h3>
            <h2 className="pt-2">{`Choose Top ${NUM_PHOTOS}`}</h2>
          </>
        )}
      </header>
      {isLoading ? (
        <div className="row-start-2">
          <Loading text={"Great choices!"} />
        </div>
      ) : (
        <>
          <main className="row-start-2 grid h-full w-auto grid-cols-2 items-center gap-4 overflow-hidden px-8">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative aspect-4/5 h-[21vh]" // max height is 21.3 vh (64/3), saving some room for padding/gap
                onClick={() => {
                  toggleSelection(screenshot);
                }}
              >
                <NumberedCircle
                  className={`absolute inset-0 z-1 items-center justify-center ${
                    selectedImages.includes(screenshot) ? "flex" : "hidden"
                  }`}
                  num={
                    // possible race condition with the onClick()
                    selectedImages.includes(screenshot)
                      ? selectedImages.indexOf(screenshot) + 1
                      : 0
                  }
                />
                {/* <AspectRatio ratio={4 / 5}> */}
                <Image
                  src={screenshot} // png string
                  alt={`Screenshot ${index + 1}`}
                  className="h-full w-auto object-cover"
                  fill
                  priority
                />
                {/* </AspectRatio> */}
              </div>
            ))}
          </main>
          <div className="row-start-3 flex w-full flex-col items-center justify-center gap-2">
            <PrimaryButton
              disable={selectedImages.length < NUM_PHOTOS}
              onClick={() => {
                generatePhotostrip();
              }}
            >
              {/* TODO there's some weird styling thing here. without a <Link/> the regular variant looks weird  */}
              {/* This works but its pretty inelegant */}
              {/* <span className="font-geist font-bold text-lg"> */}
              <h4>Next</h4>
              {/* </span> */}
            </PrimaryButton>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
