import { putImage } from "@/lib/s3";
import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const { images, frame } = await req.json(); // frame is 'light' | 'dark'

    if (!images || !Array.isArray(images) || images.length === 0 || !frame) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 },
      );
    }

    const frameT = frame as "light" | "dark";
    const framePath = frameT === "light" ? "frame1.png" : "frame2.png";

    // public is not accessible from the server, so we need to use process.cwd() to get the path
    const backgroundImagePath = path.join(process.cwd(), "public", framePath);
    const backgroundImage = await sharp(backgroundImagePath).toBuffer();

    const backgroundMetadata = await sharp(backgroundImagePath).metadata();
    console.log("Background Image Dimensions:", backgroundMetadata);

    // images should be 4 : 5 ratio
    const buffers = await Promise.all(
      images.map(async (image: string) => {
        const buffer = Buffer.from(image.split(",")[1], "base64"); // Decode base64
        const resizedBuffer = await sharp(buffer).resize(896, 1120).toBuffer();

        // Check the dimensions of each resized image
        const imageMetadata = await sharp(resizedBuffer).metadata();
        console.log("Resized Image Dimensions:", imageMetadata);

        return resizedBuffer;
      }),
    );

    // Composite the images vertically
    const compositeImageBuffer = await sharp(backgroundImage)
      .composite(
        buffers.map((buffer, index) => ({
          input: buffer,
          top: 1120 * index + 253,
          left: 92,
        })),
      )
      .png()
      .toBuffer();

    // store the image into s3
    const url = await putImage(compositeImageBuffer);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.json(
      { error: "Failed to process images" },
      { status: 500 },
    );
  }
}
