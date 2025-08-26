// API 配置类型定义
interface ApiConfig {
  endpoint: string;
  requiresAuth: boolean;
  authToken?: string;
  useProxy?: boolean;
  timeout?: number;
  retryCount?: number;
}

// 环境配置类型
type Environment = 'development' | 'production' | 'test';

// 配置验证错误类型
class ApiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiConfigError';
  }
}

// 获取当前环境
const getCurrentEnvironment = (): Environment => {
  return (process.env.NODE_ENV as Environment) || 'development';
};

// 智能端点检测 - 基于当前域名和环境自动判断
const getSmartEndpoint = (): { endpoint: string; useProxy: boolean } => {
  const environment = getCurrentEnvironment();
  
  if (environment === 'development') {
    // 开发环境：总是使用代理避免 CORS
    return {
      endpoint: '/api/graphql',
      useProxy: true
    };
  }
  
  // 生产环境：检测当前域名
  if (typeof window !== 'undefined') {
    const currentHost = window.location.host;
    
    // 如果当前域名包含 forge，说明前后端同域，直接访问 /graphql
    if (currentHost.includes('forge')) {
      return {
        endpoint: '/graphql',
        useProxy: false
      };
    }
  }
  
  // 服务器端渲染或其他情况，使用代理保证兼容性
  return {
    endpoint: '/api/graphql',
    useProxy: true
  };
};

// 创建默认配置
const createDefaultConfig = (): ApiConfig => {
  const { endpoint, useProxy } = getSmartEndpoint();
  
  return {
    endpoint,
    requiresAuth: true,
    authToken: undefined,
    useProxy,
    timeout: 30000, // 30秒超时
    retryCount: 3
  };
};

// 导出默认配置
export const defaultApiConfig: ApiConfig = createDefaultConfig();

// 直连配置（强制不使用代理）
export const directApiConfig: ApiConfig = {
  endpoint: typeof window !== 'undefined' && window.location.host.includes('forge') 
    ? '/graphql' 
    : 'https://directus.matrix-net.tech/graphql',
  requiresAuth: true,
  authToken: undefined,
  useProxy: false,
  timeout: 30000,
  retryCount: 3
};

// 配置验证函数
const validateApiConfig = (config: Partial<ApiConfig>): void => {
  if (config.endpoint && typeof config.endpoint !== 'string') {
    throw new ApiConfigError('Endpoint must be a string');
  }
  
  if (config.endpoint && !config.endpoint.startsWith('http') && !config.endpoint.startsWith('/')) {
    throw new ApiConfigError('Endpoint must be a valid URL or relative path');
  }
  
  if (config.timeout && (typeof config.timeout !== 'number' || config.timeout <= 0)) {
    throw new ApiConfigError('Timeout must be a positive number');
  }
  
  if (config.retryCount && (typeof config.retryCount !== 'number' || config.retryCount < 0)) {
    throw new ApiConfigError('Retry count must be a non-negative number');
  }
};

// 合并配置的辅助函数
const mergeConfigs = (...configs: Partial<ApiConfig>[]): ApiConfig => {
  const merged = configs.reduce((acc, config) => ({ ...acc, ...config }), {});
  return { ...defaultApiConfig, ...merged };
};

// 获取 API 配置
export const getApiConfig = (): ApiConfig => {
  try {
    let userConfig: Partial<ApiConfig> = {};
    
    // 只在客户端读取 localStorage
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('apiConfig');
      if (savedConfig) {
        try {
          userConfig = JSON.parse(savedConfig);
          validateApiConfig(userConfig);
        } catch (e) {
          console.warn('Invalid API config in localStorage, using default:', e);
          userConfig = {};
        }
      }
    }
    
    // 基础配置使用智能检测的默认配置
    const baseConfig = createDefaultConfig();
    
    // 合并配置：基础配置 < 用户配置
    const finalConfig = mergeConfigs(baseConfig, userConfig);
    
    return finalConfig;
  } catch (error) {
    console.error('Error getting API config:', error);
    return createDefaultConfig();
  }
};

// 设置 API 配置
export const setApiConfig = (config: Partial<ApiConfig>): void => {
  try {
    validateApiConfig(config);
    
    if (typeof window !== 'undefined') {
      const currentConfig = getApiConfig();
      const newConfig = { ...currentConfig, ...config };
      localStorage.setItem('apiConfig', JSON.stringify(newConfig));
    }
  } catch (error) {
    console.error('Error setting API config:', error);
    throw error;
  }
};

// 重置配置到默认值
export const resetApiConfig = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('apiConfig');
  }
};

// 获取配置摘要（用于调试）
export const getApiConfigSummary = (): { environment: Environment; config: ApiConfig } => {
  return {
    environment: getCurrentEnvironment(),
    config: getApiConfig()
  };
};

// 检查配置是否有效
export const isApiConfigValid = (config?: ApiConfig): boolean => {
  try {
    const configToTest = config || getApiConfig();
    validateApiConfig(configToTest);
    return true;
  } catch {
    return false;
  }
};

// 导出类型
export type { ApiConfig, Environment };
export { ApiConfigError };
