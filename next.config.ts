import type { NextConfig } from "next";
import { AWS_BUCKET_HOSTNAME } from "@/lib/constants";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: AWS_BUCKET_HOSTNAME,
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
