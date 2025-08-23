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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 检查本地存储中的登录状态
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');
        
        if (token && userId) {
          // 验证 token 是否有效
          try {
            const response = await fetch('/api/user/me', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.ok) {
              const userData = await response.json();
              setUser({
                id: userData.id,
                email: userData.email,
                name: userData.first_name || userData.email
              });
            } else {
              // Token 无效，清除本地存储
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('userId');
            }
          } catch (error) {
            console.error('Error validating token:', error);
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // 使用 Directus 认证 API 进行登录
      try {
        // 直接调用 Directus 的认证端点
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        });

        const result = await response.json();

        if (response.ok && result.access_token) {
          // 登录成功
          const user: User = {
            id: result.user?.id || 'unknown',
            email: result.user?.email || email,
            name: result.user?.first_name || result.user?.email || email,
          };
          
          setUser(user);
          
          // 保存认证 token
          localStorage.setItem('authToken', result.access_token);
          localStorage.setItem('refreshToken', result.refresh_token || '');
          localStorage.setItem('userId', user.id);
          
          return { success: true };
        } else {
          return { 
            success: false, 
            error: result.errors?.[0]?.message || '登录失败，请检查邮箱和密码' 
          };
        }
        
      } catch (error) {
        console.error('Login error:', error);
        return { 
          success: false, 
          error: '连接服务器失败，请稍后重试' 
        };
      }
      
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: '登录过程中发生错误，请稍后重试' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
