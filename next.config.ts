import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      qualities: [70, 75], 
      
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ikmprobolinggo.com",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
