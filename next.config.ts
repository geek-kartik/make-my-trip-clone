import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "promos.makemytrip.com"
      },
      {
        protocol: "https",
        hostname: "imgak.mmtcdn.com"
      }
    ]
  }
};

export default nextConfig;
