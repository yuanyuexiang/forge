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

// 从环境变量获取配置
const getEnvConfig = (): Partial<ApiConfig> => {
  if (typeof window !== 'undefined') {
    return {}; // 客户端不使用环境变量
  }
  
  return {
    endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    timeout: process.env.NEXT_PUBLIC_API_TIMEOUT ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT) : undefined,
    retryCount: process.env.NEXT_PUBLIC_API_RETRY_COUNT ? parseInt(process.env.NEXT_PUBLIC_API_RETRY_COUNT) : undefined,
  };
};

// 获取当前环境
const getCurrentEnvironment = (): Environment => {
  return (process.env.NODE_ENV as Environment) || 'development';
};

// 默认配置
export const defaultApiConfig: ApiConfig = {
  endpoint: "/api/graphql", // 使用本地代理端点避免 CORS
  requiresAuth: true,
  authToken: undefined,
  useProxy: true,
  timeout: 30000, // 30秒超时
  retryCount: 3
};

// 直连配置（生产环境或用户直接连接）
export const directApiConfig: ApiConfig = {
  endpoint: "https://directus.matrix-net.tech/graphql",
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
    const envConfig = getEnvConfig();
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
    
    // 根据环境选择基础配置
    const environment = getCurrentEnvironment();
    const baseConfig = environment === 'production' ? directApiConfig : defaultApiConfig;
    
    // 合并所有配置：基础配置 < 环境变量 < 用户配置
    const finalConfig = mergeConfigs(baseConfig, envConfig, userConfig);
    
    return finalConfig;
  } catch (error) {
    console.error('Error getting API config:', error);
    return defaultApiConfig;
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
