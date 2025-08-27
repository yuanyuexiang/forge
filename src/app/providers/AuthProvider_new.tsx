'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 检查并刷新 token 的函数
  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        return false;
      }

      const data = await response.json();
      
      // 更新存储的 token
      localStorage.setItem('accessToken', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refreshToken', data.refresh_token);
      }

      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      return false;
    }
  };

  // 检查 token 是否即将过期并自动刷新
  const checkTokenExpiration = async () => {
    const accessToken = localStorage.getItem('accessToken');
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
      console.error('Error checking token expiration:', error);
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
      localStorage.setItem('accessToken', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('refreshToken', data.refresh_token);
      }

      // 设置用户信息
      setUser(data.user);
      
      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  // 初始化时检查现有的认证状态
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      
      if (accessToken) {
        // 检查 token 是否有效/即将过期
        const isTokenValid = await checkTokenExpiration();
        
        if (isTokenValid) {
          // 从 token 中提取用户信息
          try {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            // 这里可能需要根据您的 token payload 结构调整
            setUser({
              id: payload.id,
              email: payload.email || '',
              // 可能需要额外的 API 调用来获取完整的用户信息
            });
          } catch (error) {
            console.error('Error parsing token:', error);
            logout();
          }
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
    }, 60000); // 每分钟检查一次

    return () => clearInterval(interval);
  }, [user]);

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    refreshToken,
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
