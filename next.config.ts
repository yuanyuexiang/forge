import type { NextConfig } from "next";
import path from "path";

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
  // Turbopack 配置
  turbopack: {
    resolveAlias: {
      // 确保使用正确的 React 版本
      'react': 'react',
      'react-dom': 'react-dom',
      // 路径别名
      '@components': './src/components',
      '@lib': './src/lib',
      '@providers': './src/providers',
      '@types': './src/types',
      '@hooks': './src/hooks',
      '@graphql': './src/graphql',
      '@generated': './src/generated',
      '@config': './src/config',
    }
  },
  // Webpack 配置（用于非 Turbopack 模式）
  webpack: (config: any) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve('./src/components'),
      '@lib': path.resolve('./src/lib'),
      '@providers': path.resolve('./src/providers'),
      '@types': path.resolve('./src/types'),
      '@hooks': path.resolve('./src/hooks'),
      '@graphql': path.resolve('./src/graphql'),
      '@generated': path.resolve('./src/generated'),
      '@config': path.resolve('./src/config'),
    };
    return config;
  },
};

export default nextConfig;
