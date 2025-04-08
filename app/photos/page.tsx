"use client";
import { useState } from "react";
import { useScreenshots } from "@/lib/ScreenshotsContext";
import Image from "next/image";
import { NUM_PHOTOS } from "@/lib/constants";
import PrimaryButton from "@/components/PrimaryButton";
import Footer from "@/components/Footer";
import NumberedCircle from "@/components/NumberedCircle";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/Loading";

export default function PhotosPage() {
  const { screenshots } = useScreenshots();
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      body: JSON.stringify({ images: selectedImages }),
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
  }

  return (
    <div className="grid grid-rows-[20px_10px_10px_1fr_20px_10px] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-20">
      <header className="row-start-1">
        <h5>{"SAMANTHA'S PHOTO CORNER"}</h5>
      </header>
      {isLoading ? (
        <div className="row-start-4">
          <Loading text={"Great choices!"} />
        </div>
      ) : (
        <>
          <h3 className="row-start-2">STEP 4</h3>
          <h2 className="row-start-3">{`Choose Top ${NUM_PHOTOS}`}</h2>
          <main className="row-start-4 grid grid-cols-2 gap-4 w-4/5">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative"
                onClick={() => {
                  toggleSelection(screenshot);
                }}>
                <NumberedCircle
                  className={`absolute justify-center items-center inset-0 z-1 ${
                    selectedImages.includes(screenshot) ? "flex" : "hidden"
                  }`}
                  num={
                    // possible race condition with the onClick()
                    selectedImages.includes(screenshot)
                      ? selectedImages.indexOf(screenshot) + 1
                      : 0
                  }
                />
                <AspectRatio ratio={4 / 5}>
                  <Image
                    src={screenshot} // png string
                    alt={`Screenshot ${index + 1}`}
                    className="object-cover h-full w-full"
                    width={500} // these dont do anything idk what they're for tbh, but if u get rid of them then next.js complains so \o/
                    height={500}
                  />
                </AspectRatio>
              </div>
            ))}
          </main>
          <div className="row-start-5 flex w-full justify-center flex-row">
            <PrimaryButton
              disable={selectedImages.length < NUM_PHOTOS}
              onClick={() => {
                generatePhotostrip();
              }}>
              {/* TODO there's some weird styling thing here. without a <Link/> the regular variant looks weird  */}
              {/* This works but its pretty inelegant */}
              {/* <span className="font-geist font-bold text-lg"> */}
              <h4>Next</h4>
              {/* </span> */}
            </PrimaryButton>
          </div>
        </>
      )}
      <footer className="row-start-6">
        <Footer />
      </footer>
    </div>
  );
}
