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

      // 使用本地代理端点刷新token
      const response = await fetch('/api/graphql/system', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation AuthRefresh($refresh_token: String!) {
              auth_refresh(refresh_token: $refresh_token) {
                access_token
                refresh_token
                expires
              }
            }
          `,
          variables: { refresh_token: refreshTokenValue }
        }),
      });

      const result = await response.json();
      
      if (result.errors || !result.data?.auth_refresh?.access_token) {
        // Refresh token 过期或无效，清除存储并返回 false
        localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem('user_info');
        setUser(null);
        return false;
      }

      const authData = result.data.auth_refresh;
      
      // 更新存储的 token
      localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN, authData.access_token);
      if (authData.refresh_token) {
        localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN, authData.refresh_token);
      }

      return true;
    } catch (error) {
      authLogger.error('Token refresh failed', error);
      localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem('user_info');
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
      authLogger.info('开始Directus认证', { email });

      // 使用本地代理端点进行认证
      const response = await fetch('/api/graphql/system', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              auth_login(email: "${email}", password: "${password}") {
                access_token
                refresh_token
                expires
              }
            }
          `
        }),
      });

      if (!response.ok) {
        authLogger.error('认证请求失败', { status: response.status });
        return false;
      }

      const result = await response.json();
      console.log('Directus认证响应:', result);
      
      if (result.errors) {
        const errorMessage = result.errors[0]?.message || '未知错误';
        const errorCode = result.errors[0]?.extensions?.code || 'UNKNOWN';
        authLogger.error('认证失败', { 
          message: errorMessage, 
          code: errorCode,
          errors: result.errors 
        });
        
        // 根据错误类型提供更友好的提示
        if (errorCode === 'INVALID_CREDENTIALS') {
          console.error('用户凭据无效，请检查邮箱和密码');
        } else if (errorCode === 'USER_SUSPENDED') {
          console.error('用户账户已被暂停');
        } else {
          console.error(`认证错误: ${errorMessage}`);
        }
        return false;
      }
      
      if (!result.data?.auth_login?.access_token) {
        authLogger.error('认证失败：没有获取到access_token', { response: result });
        return false;
      }

      const authData = result.data.auth_login;

      // 存储 tokens
      localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN, authData.access_token);
      if (authData.refresh_token) {
        localStorage.setItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN, authData.refresh_token);
      }

      // 获取用户信息
      try {
        const userResponse = await fetch('/api/graphql/system', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authData.access_token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                users_me {
                  id
                  email
                  first_name
                  last_name
                  status
                  role {
                    id
                    name
                    description
                  }
                  language
                  theme_light
                  theme_dark
                  appearance
                  email_notifications
                  last_access
                  last_page
                  location
                  title
                  description
                  avatar {
                    id
                    filename_download
                    title
                  }
                  text_direction
                }
              }
            `
          }),
        });

        const userResult = await userResponse.json();
        
        if (userResult.data?.users_me) {
          const userData = userResult.data.users_me;
          setUser(userData);
          // 保存用户信息到localStorage
          localStorage.setItem('user_info', JSON.stringify(userData));
          authLogger.info('登录成功，获取到完整用户信息');
        } else {
          authLogger.warn('登录成功但获取用户信息失败，使用基本信息');
          const basicUser = { 
            id: '', 
            email, 
            first_name: '', 
            last_name: '', 
            role: undefined
          };
          setUser(basicUser);
          localStorage.setItem('user_info', JSON.stringify(basicUser));
        }
      } catch (userError) {
        authLogger.error('获取用户信息失败', userError);
        const basicUser = { 
          id: '', 
          email, 
          first_name: '', 
          last_name: '', 
          role: undefined
        };
        setUser(basicUser);
        localStorage.setItem('user_info', JSON.stringify(basicUser));
      }
      
      return true;
    } catch (error) {
      authLogger.error('Login error', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
      
      if (refreshToken) {
        // 使用本地代理端点登出
        await fetch('/api/graphql/system', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              mutation AuthLogout($refresh_token: String!) {
                auth_logout(refresh_token: $refresh_token)
              }
            `,
            variables: { refresh_token: refreshToken }
          }),
        });
      }
    } catch (error) {
      console.error('Logout mutation failed:', error);
    } finally {
      // 无论logout请求是否成功，都清除本地存储
      localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem('user_info');
      setUser(null);
      router.push('/login');
    }
  };

  // 初始化时检查现有的认证状态
  useEffect(() => {
    const initAuth = async () => {
      console.log('=== AuthProvider initAuth 开始 ===');
      const accessToken = TokenManager.getCurrentToken();
      const storedUserInfo = localStorage.getItem('user_info');
      
      console.log('Access token exists:', !!accessToken);
      console.log('Stored user info exists:', !!storedUserInfo);
      
      if (accessToken) {
        // 首先尝试使用存储的用户信息
        if (storedUserInfo) {
          try {
            const userInfo = JSON.parse(storedUserInfo);
            console.log('从localStorage获取用户信息:', userInfo);
            setUser(userInfo);
            setLoading(false);
            console.log('=== AuthProvider initAuth 结束 (使用localStorage) ===');
            return;
          } catch (error) {
            console.error('解析localStorage用户信息失败:', error);
          }
        }

        // 如果没有存储的用户信息，使用GraphQL system端点获取当前用户
        try {
          console.log('使用本地代理端点获取用户信息...');
          const response = await fetch('/api/graphql/system', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              query: `
                query {
                  users_me {
                    id
                    email
                    first_name
                    last_name
                    role {
                      id
                      name
                      description
                    }
                  }
                }
              `
            }),
          });
          
          console.log('GraphQL system response status:', response.status);
          if (response.ok) {
            const result = await response.json();
            console.log('GraphQL system response:', result);
            
            if (result.data?.users_me) {
              const userData = result.data.users_me;
              console.log('从GraphQL system获取到用户数据:', userData);
              
              const userInfo = {
                id: userData.id,
                email: userData.email || '',
                first_name: userData.first_name || '',
                last_name: userData.last_name || '',
                role: userData.role || undefined,
              };
              
              setUser(userInfo);
              // 保存到localStorage以便下次使用
              localStorage.setItem('user_info', JSON.stringify(userInfo));
              setLoading(false);
              console.log('=== AuthProvider initAuth 结束 (使用GraphQL system) ===');
              return;
            }
          }
        } catch (error) {
          console.error('GraphQL system请求失败:', error);
        }

        // 如果GraphQL失败，尝试从token解析基本信息
        try {
          console.log('解析JWT token...');
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          console.log('JWT Token Payload:', payload);
          
          const fallbackUser = {
            id: payload.id,
            email: payload.email || '',
            first_name: payload.first_name || '',
            last_name: payload.last_name || '',
            role: payload.role || undefined,
          };
          console.log('设置fallback用户信息:', fallbackUser);
          setUser(fallbackUser);
        } catch (error) {
          console.error('initAuth过程中出错:', error);
          // 清除无效的认证信息
          localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(APP_CONFIG.AUTH.STORAGE_KEYS.REFRESH_TOKEN);
          localStorage.removeItem('user_info');
        }
      } else {
        console.log('没有找到access token');
      }
      
      console.log('设置loading为false');
      setLoading(false);
      console.log('=== AuthProvider initAuth 结束 ===');
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
