import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Reduce memory usage during build
    workerThreads: false,
    cpus: 1,
  },
  // Disable source maps in production to reduce memory
  productionBrowserSourceMaps: false,
};

export default nextConfig;
