import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iuxhnqurpbfjkficzogq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
