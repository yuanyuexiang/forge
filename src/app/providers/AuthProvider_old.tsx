'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

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

  useEffect(() => {
    // 检查本地存储中的登录状态
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (token && userData) {
          // 直接从localStorage恢复用户信息
          try {
            const user = JSON.parse(userData);
            setUser(user);
          } catch (error) {
            console.error('解析用户数据失败:', error);
            // 清除无效数据
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        console.error('检查认证状态失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        // 登录成功
        const userData = {
          id: data.user?.id || 'unknown',
          email: data.user?.email || email,
          name: data.user?.first_name || data.user?.name || email.split('@')[0]
        };

        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify(userData));
        if (data.refresh_token) {
          localStorage.setItem('refreshToken', data.refresh_token);
        }
        
        setUser(userData);
        return { success: true };
      } else {
        // 登录失败
        const errorMessage = data.errors?.[0]?.message || '登录失败';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('登录错误:', error);
      return { success: false, error: '网络连接失败，请重试' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
