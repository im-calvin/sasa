import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function requestCameraPermission(): Promise<
  MediaStream | undefined
> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
    });
    console.log("Camera permission granted");
    return stream;
  } catch (error) {
    console.error("Camera permission denied", error);
  }
}
