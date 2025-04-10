import { putImage } from "@/lib/s3";
import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const { images } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 },
      );
    }

    // public is not accessible from the server, so we need to use process.cwd() to get the path
    const backgroundImagePath = path.join(
      process.cwd(),
      "public",
      "background.png",
    );
    const backgroundImage = await sharp(backgroundImagePath).toBuffer();

    // Load and process each image
    const buffers = await Promise.all(
      images.map(async (image: string) => {
        const buffer = Buffer.from(image.split(",")[1], "base64"); // Decode base64
        return sharp(buffer).resize(500, 500).toBuffer(); // Resize to uniform dimensions
      }),
    );

    // Composite the images vertically
    const compositeImageBuffer = await sharp(backgroundImage)
      .composite(
        buffers.map((buffer, index) => ({
          input: buffer,
          top: 500 * index,
          left: 0,
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
