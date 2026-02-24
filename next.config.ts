import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "omotayo.michofat.com",
      },
      {
        protocol: "https",
        hostname: "dwsuch.com",
      },
      {
        protocol: "https",
        hostname: "npc-huris.com.ng",
      },
    ],
  },
};

export default nextConfig;
