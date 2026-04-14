import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ikmprobolinggo.com",
        pathname: "/storage/**",
      },
    ],
  }
};

export default nextConfig;
