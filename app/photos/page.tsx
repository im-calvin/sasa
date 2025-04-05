"use client";
import { useState } from "react";
import { useScreenshots } from "@/lib/ScreenshotsContext";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function PhotosPage() {
  const { screenshots } = useScreenshots();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [photostrip, setPhotostrip] = useState<string | null>(null);

  const toggleSelection = (image: string) => {
    setSelectedImages((prev) => {
      if (prev.includes(image)) {
        return prev.filter((img) => img !== image); // Deselect image
      } else if (prev.length < 4) {
        return [...prev, image]; // Select image if under limit
      }
      return prev; // Do nothing if limit reached
    });
  };

  const generatePhotostrip = async () => {
    const response = await fetch("/api/composite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: selectedImages }),
    });

    if (response.ok) {
      const data = await response.json();
      setPhotostrip(data.image);
    } else {
      console.error("Failed to generate photostrip");
    }
  };

  return (
    <div className="p-8">
      <div className="grid grid-cols-2 gap-4">
        {screenshots.map((screenshot, index) => (
          <div key={index} className="relative">
            <CheckCircle
              className={`absolute top-2 left-2 text-white ${
                selectedImages.includes(screenshot)
                  ? "text-blue-500"
                  : "text-gray-300"
              }`}
            />
            <Image
              src={screenshot} // png string
              alt={`Screenshot ${index + 1}`}
              className={`w-full h-auto border cursor-pointer ${
                selectedImages.includes(screenshot)
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => toggleSelection(screenshot)}
              width={500} // Provide width for next/image
              height={500} // Provide height for next/image
            />
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Selected {selectedImages.length} of 4 images.
      </p>
      <Button onClick={generatePhotostrip}>Generate photostrip</Button>
      {photostrip && (
        <div className="mt-4">
          <img src={photostrip} alt="Photostrip" />
        </div>
      )}
    </div>
  );
}
