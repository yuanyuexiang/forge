// Directus API 配置 - 基于环境自动检测
import { TokenManager } from './token-manager';
import { getEnvironmentInfo, isLocalEnvironment } from './environment';
import { apiLogger } from './logger';

/*
 * GraphQL 架构说明：
 * - 客户端组件：使用 Apollo Client 系统 (src/generated/graphql.ts)
 * - 服务器端 API 路由：使用 executeServerSideGraphQLQuery 函数
 * - 认证查询：AUTH_QUERIES 用于服务器端认证逻辑
 */

const getDirectusUrl = () => {
  const env = getEnvironmentInfo();
  
  // 检查是否在浏览器环境
  if (env.isBrowser) {
    // 云端部署时，Directus 在同一域名下
    if (!env.isLocal) {
      return window.location.origin; // 使用当前域名
    }
  }
  
  // 本地开发时使用远程 Directus
  return 'https://directus.matrix-net.tech';
};

export const DIRECTUS_CONFIG = {
  // GraphQL 端点 - 自动检测
  GRAPHQL_URL: `${getDirectusUrl()}/graphql`,
  GRAPHQL_SYSTEM_URL: `${getDirectusUrl()}/graphql/system`,
  
  // 本地代理端点
  LOCAL_GRAPHQL_PROXY: '/api/graphql',
  
  // 文件上传端点
  FILE_UPLOAD_URL: `${getDirectusUrl()}/files`,
  
  // 基础配置
  BASE_URL: (() => {
    const env = getEnvironmentInfo();
    return env.isBrowser ? window.location.origin : 'http://localhost:3000';
  })(),
  
  // 获取当前环境应该使用的 GraphQL 端点
  getGraphQLEndpoint: () => {
    // 无论在哪个环境，都统一使用代理端点
    // 本地开发：代理到 directus.matrix-net.tech
    // 云端部署：代理到本地的 Directus 实例
    return '/api/graphql';
  },
};

// 判断是否需要使用代理
const shouldUseProxy = () => {
  const env = getEnvironmentInfo();
  if (env.isServer) return false; // 服务器端不使用代理
  
  // 只有在本地开发环境才使用代理
  return env.isLocal;
};

// 文件资产配置
export const FILE_CONFIG = {
  // 获取文件的完整 URL（直接访问）
  getFileUrl: (fileId: string) => {
    if (!fileId) return '';
    if (fileId.startsWith('http')) return fileId;
    return `${getDirectusUrl()}/assets/${fileId}`;
  },
  
  // 获取带认证的资产 URL（智能选择代理或直连）
  getAssetUrl: (fileId: string, authToken?: string) => {
    if (!fileId) return '';
    if (fileId.startsWith('http')) return fileId;
    
    // 尝试获取令牌，优先使用传入的令牌
    let token = authToken;
    if (!token) {
      const env = getEnvironmentInfo();
      if (env.isBrowser) {
        // 使用 TokenManager 统一获取令牌
        token = TokenManager.getCurrentToken() || undefined;
      }
    }
    
    // 判断是否使用代理
    const useProxy = shouldUseProxy();
    
    if (useProxy) {
      // 本地开发环境：使用代理
      const baseUrl = `${DIRECTUS_CONFIG.BASE_URL}/api/assets/${fileId}`;
      return token ? `${baseUrl}?token=${encodeURIComponent(token)}` : baseUrl;
    } else {
      // 云端部署环境：直接访问 Directus
      const baseUrl = `${getDirectusUrl()}/assets/${fileId}`;
      return token ? `${baseUrl}?access_token=${encodeURIComponent(token)}` : baseUrl;
    }
  },
  
  // 获取带变换参数的图片 URL
  getImageUrl: (fileId: string, transforms?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'png' | 'webp' | 'avif';
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  }, authToken?: string) => {
    if (!fileId) return '';
    if (fileId.startsWith('http')) return fileId;
    
    // 尝试获取令牌，优先使用传入的令牌
    let token = authToken;
    if (!token) {
      const env = getEnvironmentInfo();
      if (env.isBrowser) {
        // 使用 TokenManager 统一获取令牌
        token = TokenManager.getCurrentToken() || undefined;
      }
    }
    
    const useProxy = shouldUseProxy();
    const params = new URLSearchParams();
    
    // 添加变换参数
    if (transforms) {
      Object.entries(transforms).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    // 添加认证参数
    if (token) {
      const tokenParam = useProxy ? 'token' : 'access_token';
      params.append(tokenParam, token);
    }
    
    const baseUrl = useProxy 
      ? `${DIRECTUS_CONFIG.BASE_URL}/api/assets/${fileId}`
      : `${getDirectusUrl()}/assets/${fileId}`;
    
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  }
};

// 服务器端 GraphQL 查询辅助函数（直接连接，不通过代理）
export async function executeServerSideGraphQLQuery(
  query: string, 
  variables: any = {}, 
  authToken?: string,
  useSystemEndpoint: boolean = false
) {
  const url = useSystemEndpoint 
    ? DIRECTUS_CONFIG.GRAPHQL_SYSTEM_URL 
    : DIRECTUS_CONFIG.GRAPHQL_URL;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      apiLogger.error('服务器端 GraphQL 错误', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL 查询失败');
    }
    
    return result.data;
  } catch (error) {
    apiLogger.error('服务器端 GraphQL 请求失败', error);
    throw error;
  }
}

// 认证相关的 GraphQL 查询
export const AUTH_QUERIES = {
  LOGIN: `
    mutation AuthLogin($email: String!, $password: String!) {
      auth_login(email: $email, password: $password) {
        access_token
        refresh_token
      }
    }
  `,
  
  GET_CURRENT_USER: `
    query {
      users_me {
        id
        email
        first_name
        last_name
        role {
          id
          name
        }
      }
    }
  `,
};
