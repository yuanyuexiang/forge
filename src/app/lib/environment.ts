// 统一的环境检测工具
// 解决项目中环境检测逻辑不一致的问题

export type Environment = 'development' | 'production';

interface EnvironmentInfo {
  isDevelopment: boolean;
  isProduction: boolean;
  isLocal: boolean;
  isServer: boolean;
  isBrowser: boolean;
  hostname?: string;
  nodeEnv: Environment;
}

/**
 * 检查是否为本地开发环境的主机名
 * 统一的本地主机名检测逻辑
 */
export function isLocalHostname(hostname: string): boolean {
  return hostname === 'localhost' ||
         hostname === '127.0.0.1' ||
         hostname.startsWith('192.168.') ||
         hostname.startsWith('10.') ||
         hostname.startsWith('172.') ||
         hostname.endsWith('.local') ||
         hostname.includes('127.0.0.1');
}

/**
 * 获取当前环境信息
 * 提供统一的环境检测接口
 */
export function getEnvironmentInfo(): EnvironmentInfo {
  const isServer = typeof window === 'undefined';
  const isBrowser = !isServer;
  
  // 获取 Node.js 环境变量
  const nodeEnv = (process.env.NODE_ENV || 'development') as Environment;
  
  // 获取浏览器环境信息
  let hostname: string | undefined;
  let isLocal = false;
  
  if (isBrowser && window.location) {
    hostname = window.location.hostname;
    isLocal = isLocalHostname(hostname);
  }
  
  // 在服务器端，检查开发环境
  if (isServer) {
    isLocal = nodeEnv === 'development';
  }
  
  return {
    isDevelopment: nodeEnv === 'development' || isLocal,
    isProduction: nodeEnv === 'production' && !isLocal,
    isLocal,
    isServer,
    isBrowser,
    hostname,
    nodeEnv,
  };
}

/**
 * 简化的环境检测函数
 */
export function isDevelopment(): boolean {
  return getEnvironmentInfo().isDevelopment;
}

export function isProduction(): boolean {
  return getEnvironmentInfo().isProduction;
}

export function isLocalEnvironment(): boolean {
  return getEnvironmentInfo().isLocal;
}

export function isServerSide(): boolean {
  return getEnvironmentInfo().isServer;
}

export function isBrowserSide(): boolean {
  return getEnvironmentInfo().isBrowser;
}

/**
 * 从请求头中检测环境（用于 API 路由）
 */
export function getEnvironmentFromRequest(host: string): {
  isLocal: boolean;
  isDevelopment: boolean;
  targetUrl: string;
} {
  const isLocal = isLocalHostname(host) || host.includes('localhost');
  const isDevelopment = isLocal || process.env.NODE_ENV === 'development';
  
  // 确定目标 URL
  let targetUrl: string;
  if (isLocal) {
    // 本地开发环境：代理到远程 Directus
    targetUrl = 'https://directus.matrix-net.tech';
  } else {
    // 云端环境：使用当前域名
    // 这里假设协议是 https，可以根据需要调整
    targetUrl = `https://${host}`;
  }
  
  return {
    isLocal,
    isDevelopment,
    targetUrl,
  };
}
