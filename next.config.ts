import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint の警告・エラーをビルド時に無視
  },
};

export default nextConfig;
