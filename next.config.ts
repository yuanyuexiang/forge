import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 启用 Ant Design 的 styled-components SSR
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
