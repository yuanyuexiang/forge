'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { TokenManager } from '@lib/auth/token-manager';
import { authLogger } from '@lib/utils/logger';
import { APP_CONFIG } from '@config/app-config';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: {
    id: string;
    name: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isLoading: boolean;  // 添加 isLoading 别名
  refreshToken: () => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 检查并刷新 token 的函数
  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshTokenValue) {
        return false;
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshTokenValue }),
      });

      if (!response.ok) {
        // Refresh token 过期或无效，清除存储并返回 false
        localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
        setUser(null);
        return false;
      }

      const data = await response.json();
      
      // 更新存储的 token
      localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
      if (data.refresh_token) {
        localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
      }

      return true;
    } catch (error) {
      authLogger.error('Token refresh failed', error);
      localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
      setUser(null);
      return false;
    }
  };

  // 检查 token 是否即将过期并自动刷新
  const checkTokenExpiration = async () => {
    const accessToken = TokenManager.getCurrentToken();
    if (!accessToken) {
      return false;
    }

    try {
      // 解析 JWT token 获取过期时间
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;

      // 如果 token 在 5 分钟内过期，尝试刷新
      if (timeUntilExpiry < 300) {
        return await refreshToken();
      }

      return true;
    } catch (error) {
      authLogger.error('Error checking token expiration', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      // 存储 tokens
      localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
      if (data.refresh_token) {
        localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
      }

      // 设置用户信息
      setUser(data.user);
      
      return true;
    } catch (error) {
      authLogger.error('Login error', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
    setUser(null);
    router.push('/login');
  };

  // 初始化时检查现有的认证状态
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = TokenManager.getCurrentToken();
      
      if (accessToken) {
        // 检查 token 是否有效/即将过期
        const isTokenValid = await checkTokenExpiration();
        
        if (isTokenValid) {
          // 如果 token 有效，我们需要获取用户信息
          // 暂时设置一个基本的用户对象，实际应用中可以调用用户信息 API
          try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            setUser({
              id: payload.id,
              email: payload.email || '',
            });
          } catch (error) {
            authLogger.error('Error parsing token', error);
            // 如果无法解析 token，清除认证状态
            localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
            localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
          }
        } else {
          // token 无效，清除认证状态
          localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  // 设置定期检查 token 过期的定时器
  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        await checkTokenExpiration();
      }
    }, APP_CONFIG.AUTH.TOKEN_REFRESH_INTERVAL); // 使用配置文件中的间隔

    return () => clearInterval(interval);
  }, [user]);

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    isLoading: loading,  // 添加 isLoading 别名
    refreshToken,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
