interface ApiConfig {
  endpoint: string;
  requiresAuth: boolean;
  authToken?: string;
  useProxy?: boolean;
}

export const defaultApiConfig: ApiConfig = {
  endpoint: "/api/graphql", // 使用本地代理端点避免 CORS
  requiresAuth: true,
  authToken: undefined,
  useProxy: true
};

// 直连配置（如果用户想直接连接）
export const directApiConfig: ApiConfig = {
  endpoint: "https://directus.matrix-net.tech/graphql",
  requiresAuth: true,
  authToken: undefined,
  useProxy: false
};

// 允许用户配置自己的 API
export const getApiConfig = (): ApiConfig => {
  if (typeof window !== 'undefined') {
    const savedConfig = localStorage.getItem('apiConfig');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.warn('Invalid API config in localStorage, using default');
      }
    }
  }
  return defaultApiConfig;
};

export const setApiConfig = (config: ApiConfig): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('apiConfig', JSON.stringify(config));
  }
};

// 移除演示模式检查，始终连接真实 API
export const isDemo = (): boolean => {
  return false; // 不再使用演示模式
};
