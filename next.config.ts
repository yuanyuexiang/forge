import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 启用 Ant Design 的 styled-components SSR
  compiler: {
    styledComponents: true,
  },
  // 启用 standalone 输出用于 Docker 部署
  output: 'standalone',
  // 在构建时忽略 ESLint 错误（用于生产部署）
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 在构建时忽略 TypeScript 错误（用于生产部署）
  typescript: {
    ignoreBuildErrors: true,
  },
  // 抑制 React 版本兼容性警告
  experimental: {
    reactCompiler: false,
  },
};

export default nextConfig;
