import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",  // Ensure output is standalone for deployment

  // Remove experimental features that are deprecated
  experimental: {},

  images: {
    unoptimized: true,
  },

  // Disable source maps for production builds
  webpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false;
    }
  
    // Ensure minimizers are typed
    config.optimization.minimizer?.forEach((minimizer: any) => {
      if (typeof minimizer.options === 'object') {
        minimizer.options.parallel = 2; // Adjust this value based on server capacity
      }
    });
  
    return config;
  },

  productionBrowserSourceMaps: false, // Disable browser source maps in production
};

export default nextConfig;
