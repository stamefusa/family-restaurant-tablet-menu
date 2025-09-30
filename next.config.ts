import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // 開発時は画像最適化をスキップ
  },
};

export default nextConfig;