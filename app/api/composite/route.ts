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
    const framePath = frameT === "light" ? "frame1.svg" : "frame2.svg";

    // public is not accessible from the server, so we need to use process.cwd() to get the path
    const backgroundImagePath = path.join(process.cwd(), "public", framePath);
    const backgroundImageBuffer = await sharp(backgroundImagePath).toBuffer();

    // Get the background image dimensions to create our base canvas
    const { width, height } = await sharp(backgroundImageBuffer).metadata();
    if (!width || !height) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }

    console.log(width, height);

    // images should be 4 : 5 ratio
    const buffers = await Promise.all(
      images.map(async (image: string) => {
        const buffer = Buffer.from(image.split(",")[1], "base64"); // Decode base64
        const resizedBuffer = await sharp(buffer).resize(900, 1125).toBuffer();
        return resizedBuffer;
      }),
    );

    const blankCanvasBuffer = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .png()
      .toBuffer();

    // Define position mappings for the images
    const positions = [
      { top: 258, left: 93 }, // Image 1
      { top: 1456, left: 93 }, // Image 2
      { top: 2648, left: 93 }, // Image 3
    ];

    // Composite the images onto the blank canvas
    const compositeImages = buffers
      .map((buffer, index) => ({
        input: buffer,
        top: positions[index]?.top || 0,
        left: positions[index]?.left || 0,
      }))
      .slice(0, positions.length);

    const withImagesBuffer = await sharp(blankCanvasBuffer)
      .composite(compositeImages)
      .png()
      .toBuffer();

    // Overlay the background image on top of everything
    const finalCompositeBuffer = await sharp(withImagesBuffer)
      .composite([
        {
          input: backgroundImageBuffer,
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();

    // store the image into s3
    const url = await putImage(finalCompositeBuffer);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.json(
      { error: "Failed to process images" },
      { status: 500 },
    );
  }
}
