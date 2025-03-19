import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   domains: ["127.0.0.1"],
  // },

  // images: {
  //   domains: ["http://127.0.0.1:8055/", "http://localhost:8055/"],
  // },
  images: {
    domains: ["localhost", "127.0.0.1"],
  },
};

export default nextConfig;
