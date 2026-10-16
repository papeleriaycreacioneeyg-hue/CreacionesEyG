import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/storage/v1/object/public/**",
      },
    ],
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
