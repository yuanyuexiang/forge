/**
 * API 配置使用示例
 * 
 * 此文件展示了如何在项目中使用改进后的 API 配置管理
 */

import { 
  getApiConfig, 
  setApiConfig, 
  resetApiConfig, 
  getApiConfigSummary,
  isApiConfigValid 
} from './api-config';

// 基本使用示例
export const configUsageExamples = {
  
  // 1. 获取当前配置
  getCurrentConfig: () => {
    const config = getApiConfig();
    console.log('Current API config:', config);
    return config;
  },

  // 2. 设置自定义配置
  setCustomConfig: () => {
    try {
      setApiConfig({
        endpoint: 'https://my-custom-endpoint.com/graphql',
        timeout: 60000,
        retryCount: 5
      });
      console.log('Custom config set successfully');
    } catch (error) {
      console.error('Failed to set config:', error);
    }
  },

  // 3. 重置到默认配置
  resetToDefault: () => {
    resetApiConfig();
    console.log('Config reset to default');
  },

  // 4. 获取配置摘要（调试用）
  getDebugInfo: () => {
    const summary = getApiConfigSummary();
    console.log('Environment:', summary.environment);
    console.log('Config:', summary.config);
    return summary;
  },

  // 5. 验证配置
  validateConfig: () => {
    const isValid = isApiConfigValid();
    console.log('Current config is valid:', isValid);
    return isValid;
  },

  // 6. 在组件中使用
  useInComponent: () => {
    // React 组件中的使用示例
    /*
    const [config, setConfig] = useState(getApiConfig());
    
    const handleConfigChange = (newConfig) => {
      try {
        setApiConfig(newConfig);
        setConfig(getApiConfig());
        toast.success('配置已更新');
      } catch (error) {
        toast.error('配置无效: ' + error.message);
      }
    };
    */
  }
};

// 配置管理 Hook 示例（用于 React 组件）
export const useApiConfig = () => {
  // 这里可以实现一个自定义 Hook
  // 用于在 React 组件中管理 API 配置
  /*
  const [config, setConfigState] = useState(getApiConfig());
  
  const updateConfig = useCallback((newConfig) => {
    try {
      setApiConfig(newConfig);
      setConfigState(getApiConfig());
      return true;
    } catch (error) {
      console.error('Failed to update config:', error);
      return false;
    }
  }, []);
  
  const resetConfig = useCallback(() => {
    resetApiConfig();
    setConfigState(getApiConfig());
  }, []);
  
  return {
    config,
    updateConfig,
    resetConfig,
    isValid: isApiConfigValid(config)
  };
  */
};
