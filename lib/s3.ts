import {
  S3Client,
  PutObjectCommand,
  PutObjectRequest,
} from "@aws-sdk/client-s3";
import { AWS_BUCKET_HOSTNAME } from "./constants";

const client = new S3Client({ region: process.env.AWS_REGION });

export async function putImage(
  image: Buffer<ArrayBufferLike>
): Promise<string> {
  const key = `samanthas-photo-corner-${Date.now()}.png`;
  const params: PutObjectRequest = {
    Body: image as unknown as undefined, // corrected type for S3 Body
    Key: key,
    Bucket: process.env.S3_BUCKET_NAME,
    ContentType: "image/png",
    ACL: "public-read",
  };

  const command = new PutObjectCommand(params);
  const response = await client.send(command);
  if (response.$metadata.httpStatusCode !== 200) {
    throw new Error("S3 upload failed");
  }
  return `https://${AWS_BUCKET_HOSTNAME}/${key}`;
}
