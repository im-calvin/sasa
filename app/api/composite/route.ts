import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const { images } = await req.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    const backgroundImage = await sharp("/background.png").toBuffer();

    // Load and process each image
    const buffers = await Promise.all(
      images.map(async (image: string) => {
        const buffer = Buffer.from(image.split(",")[1], "base64"); // Decode base64
        return sharp(buffer).resize(500, 500).toBuffer(); // Resize to uniform dimensions
      })
    );

    // Composite the images vertically
    const compositeImage = await sharp(backgroundImage)
      .composite(
        buffers.map((buffer, index) => ({
          input: buffer,
          top: 500 * index,
          left: 0,
        }))
      )
      .png()
      .toBuffer();

    // Return the composited image as a base64 string
    const base64Image = `data:image/png;base64,${compositeImage.toString(
      "base64"
    )}`;
    return NextResponse.json({ image: base64Image });
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.json(
      { error: "Failed to process images" },
      { status: 500 }
    );
  }
}
