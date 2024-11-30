import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'pub-f562933a06224aeda971ebad86c0aea5.r2.dev'
      }
    ]
  }
};

export default nextConfig;
