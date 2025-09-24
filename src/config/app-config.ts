/**
 * 应用程序配置文件
 * 统一管理所有硬编码值和环境配置
 */

export const APP_CONFIG = {
  // 服务器配置
  SERVERS: {
    DEFAULT_PORT: 3000,
    ALTERNATIVE_PORT: 3001,
    LOCALHOST_HOSTS: ['localhost', '127.0.0.1'],
  },

  // API 配置
  API: {
    DIRECTUS: {
      DEFAULT_URL: 'https://forge.kcbaotech.com',
      GRAPHQL_ENDPOINT: '/graphql',
      ASSETS_ENDPOINT: '/assets',
    },
    REFRESH_INTERVAL: 60000, // 60秒
    REQUEST_TIMEOUT: 30000, // 30秒
  },

  // 认证配置
  AUTH: {
    TOKEN_REFRESH_INTERVAL: 60000, // 1分钟
    STORAGE_KEYS: {
      ACCESS_TOKEN: 'accessToken',
      REFRESH_TOKEN: 'refreshToken',
    },
  },

  // UI 配置
  UI: {
    PAGINATION: {
      DEFAULT_PAGE_SIZE: 10,
      PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
    },
    DEBOUNCE_DELAY: 300, // 毫秒
    NOTIFICATION_DURATION: 3, // 秒
  },

  // 文件上传配置
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
  },

  // 环境检测
  ENVIRONMENT: {
    DEVELOPMENT_HOSTS: ['localhost', '127.0.0.1', 'dev.', 'development.'],
    STAGING_HOSTS: ['staging.', 'test.'],
    PRODUCTION_HOSTS: ['kcbaotech.com', 'production.'],
  },

  // 日志配置
  LOGGING: {
    LEVELS: {
      ERROR: 'error',
      WARN: 'warn',
      INFO: 'info',
      DEBUG: 'debug',
    },
    MAX_LOG_LENGTH: 1000,
  },
} as const;

// 类型定义
export type AppConfig = typeof APP_CONFIG;
export type Environment = 'development' | 'staging' | 'production';
export type LogLevel = keyof typeof APP_CONFIG.LOGGING.LEVELS;
