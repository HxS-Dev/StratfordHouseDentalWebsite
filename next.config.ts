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
  // Optimize output for deployment
  output: 'standalone',
  // Minimize build time and memory
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
