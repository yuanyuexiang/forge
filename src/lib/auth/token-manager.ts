import { APP_CONFIG } from '@config/app-config';

// 认证令牌管理工具
export class TokenManager {
  private static refreshPromise: Promise<string | null> | null = null;

  // 获取当前令牌
  static getCurrentToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return localStorage.getItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN) ||           // AuthProvider 使用的键名
           localStorage.getItem('directus_auth_token') || 
           localStorage.getItem('authToken') ||
           localStorage.getItem('directus_token');
  }

  // 获取刷新令牌
  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    return localStorage.getItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN) ||          // AuthProvider 使用的键名
           localStorage.getItem('directus_refresh_token') || 
           localStorage.getItem('refresh_token');
  }

  // 保存令牌
  static saveTokens(accessToken: string, refreshToken?: string) {
    if (typeof window === 'undefined') return;
    
    // 保存到 AuthProvider 使用的键名
    localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem('directus_auth_token', accessToken);
    localStorage.setItem('authToken', accessToken);
    
    if (refreshToken) {
      localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      localStorage.setItem('directus_refresh_token', refreshToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  // 清除令牌
  static clearTokens() {
    if (typeof window === 'undefined') return;
    
    // 清除所有可能的令牌键名
    localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem('directus_auth_token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('directus_token');
    localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem('directus_refresh_token');
    localStorage.removeItem('refresh_token');
  }

    // 刷新访问令牌
  static async refreshAccessToken(): Promise<string | null> {
    // 避免并发刷新
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.doRefreshToken();
    
    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }
  
  private static async doRefreshToken(): Promise<string | null> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      console.warn('TokenManager: No refresh token available');
      return null;
    }

    try {
      console.log('TokenManager: Attempting to refresh token using GraphQL...');
      
      // 使用 GraphQL 系统端点刷新 token
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        console.error('TokenManager: GraphQL refresh failed with status', response.status);
        this.clearTokens();
        return null;
      }

      const data = await response.json();
      
      if (data.access_token) {
        this.saveTokens(data.access_token, data.refresh_token);
        console.log('TokenManager: Token refreshed successfully via GraphQL');
        return data.access_token;
      } else {
        console.error('TokenManager: No access token in GraphQL refresh response');
        return null;
      }
    } catch (error) {
      console.error('TokenManager: GraphQL refresh token error:', error);
      this.clearTokens();
      return null;
    }
  }

  // 获取有效的令牌（包括自动刷新）
  static async getValidToken(): Promise<string | null> {
    let token = this.getCurrentToken();
    
    if (!token) {
      console.log('TokenManager: No token found');
      return null;
    }

    // 检查令牌是否即将过期
    if (this.shouldRefreshToken(token)) {
      console.log('TokenManager: Token expires soon, refreshing...');
      token = await this.refreshAccessToken();
    }

    return token;
  }

  // 检查令牌是否即将过期（提前5分钟刷新）
  static shouldRefreshToken(token?: string): boolean {
    const currentToken = token || this.getCurrentToken();
    if (!currentToken) return false;

    try {
      const payload = JSON.parse(atob(currentToken.split('.')[1]));
      const exp = payload.exp * 1000; // 转换为毫秒
      const now = Date.now();
      const fiveMinutes = 5 * 60 * 1000;
      
      return (exp - now) < fiveMinutes;
    } catch (error) {
      console.error('令牌解析失败:', error);
      return true; // 解析失败时也尝试刷新
    }
  }
}
