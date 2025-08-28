// 统一的日志管理系统
// 替换项目中散落的 console.log 语句，提供统一的日志接口

import { getEnvironmentInfo } from './environment';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  component?: string;
}

class Logger {
  private component: string;
  private isDevelopment: boolean;

  constructor(component: string = 'App') {
    this.component = component;
    this.isDevelopment = getEnvironmentInfo().isDevelopment;
  }

  /**
   * 创建特定组件的日志器
   */
  static create(component: string): Logger {
    return new Logger(component);
  }

  /**
   * 格式化日志消息
   */
  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      component: this.component,
    };
  }

  /**
   * 输出日志到控制台
   */
  private output(entry: LogEntry): void {
    const prefix = `[${entry.timestamp}] [${entry.component}] [${entry.level.toUpperCase()}]`;
    
    switch (entry.level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(prefix, entry.message, entry.data || '');
        }
        break;
      case 'info':
        if (this.isDevelopment) {
          console.info(prefix, entry.message, entry.data || '');
        }
        break;
      case 'warn':
        console.warn(prefix, entry.message, entry.data || '');
        break;
      case 'error':
        console.error(prefix, entry.message, entry.data || '');
        break;
    }
  }

  /**
   * Debug 级别日志（仅在开发环境显示）
   */
  debug(message: string, data?: any): void {
    const entry = this.formatMessage('debug', message, data);
    this.output(entry);
  }

  /**
   * Info 级别日志（仅在开发环境显示）
   */
  info(message: string, data?: any): void {
    const entry = this.formatMessage('info', message, data);
    this.output(entry);
  }

  /**
   * Warning 级别日志（所有环境显示）
   */
  warn(message: string, data?: any): void {
    const entry = this.formatMessage('warn', message, data);
    this.output(entry);
  }

  /**
   * Error 级别日志（所有环境显示）
   */
  error(message: string, data?: any): void {
    const entry = this.formatMessage('error', message, data);
    this.output(entry);
  }

  /**
   * 记录 API 请求
   */
  apiRequest(method: string, url: string, data?: any): void {
    this.debug(`API Request: ${method} ${url}`, data);
  }

  /**
   * 记录 API 响应
   */
  apiResponse(status: number, url: string, data?: any): void {
    if (status >= 400) {
      this.error(`API Error: ${status} ${url}`, data);
    } else {
      this.debug(`API Success: ${status} ${url}`, data);
    }
  }

  /**
   * 记录认证相关事件
   */
  auth(action: string, details?: any): void {
    this.info(`Auth: ${action}`, details);
  }

  /**
   * 记录 GraphQL 操作
   */
  graphql(operation: string, variables?: any, errors?: any): void {
    if (errors) {
      this.error(`GraphQL Error: ${operation}`, { variables, errors });
    } else {
      this.debug(`GraphQL: ${operation}`, variables);
    }
  }

  /**
   * 记录文件操作
   */
  file(action: string, fileName: string, details?: any): void {
    this.debug(`File ${action}: ${fileName}`, details);
  }

  /**
   * 记录环境信息
   */
  environment(info: any): void {
    this.info('Environment Info', info);
  }
}

// 默认日志器实例
export const logger = new Logger('Global');

// 组件特定的日志器
export const authLogger = Logger.create('Auth');
export const apiLogger = Logger.create('API');
export const graphqlLogger = Logger.create('GraphQL');
export const fileLogger = Logger.create('File');
export const uploadLogger = Logger.create('Upload');
export const proxyLogger = Logger.create('Proxy');

// 便捷的全局日志函数
export const log = {
  debug: (message: string, data?: any) => logger.debug(message, data),
  info: (message: string, data?: any) => logger.info(message, data),
  warn: (message: string, data?: any) => logger.warn(message, data),
  error: (message: string, data?: any) => logger.error(message, data),
};
