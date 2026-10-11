import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/baner.png",
        destination: "/images/banner.png",
        permanent: true,
      },
      {
        source: "/banner.png",
        destination: "/images/banner.png",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
