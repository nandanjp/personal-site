import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  images: {
    ...(process.env.NETLIFY && {
      loader: "custom",
      loaderFile: "./lib/netlify-image-loader.ts",
    }),
    // Must stay in step with remote_images in netlify.toml.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "personal-api.nandan-hl.dev",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
