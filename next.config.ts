import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/catalogo",
        destination: "/productos",
        permanent: false,
      },
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
