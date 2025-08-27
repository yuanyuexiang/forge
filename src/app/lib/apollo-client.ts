import { ApolloClient, InMemoryCache, HttpLink, from, fromPromise } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// 刷新 token 的函数
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return null;
    }

    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      // Refresh token 无效，清除存储
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    }

    const data = await response.json();
    
    // 更新存储的 token
    localStorage.setItem('accessToken', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('refreshToken', data.refresh_token);
    }

    return data.access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return null;
  }
};

// 创建认证链接
const authLink = setContext(async (_, { headers }) => {
  // 从localStorage获取token
  let token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  // 检查 token 是否即将过期（如果是 JWT）
  if (token && typeof window !== 'undefined') {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;

      // 如果 token 在 5 分钟内过期，尝试刷新
      if (timeUntilExpiry < 300) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          token = newToken;
        }
      }
    } catch (error) {
      console.error('Error checking token expiration:', error);
    }
  }
  
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {})
    }
  };
});

// 创建错误处理链接
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    // 如果是401错误（token过期），尝试刷新token并重试请求
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      if (typeof window !== 'undefined') {
        return fromPromise(
          refreshAccessToken().then((newToken) => {
            if (newToken) {
              // 使用新token重试请求
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${newToken}`,
                },
              });
              return newToken;
            } else {
              // 刷新失败，重定向到登录页
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              window.location.href = '/login';
              throw new Error('Authentication failed');
            }
          })
        ).flatMap(() => forward(operation));
      }
    }
  }
});

// 创建 Apollo Client
const createApolloClient = () => {
  // 固定使用 GraphQL API 端点
  const httpLink = new HttpLink({ 
    uri: '/api/graphql',
    fetchOptions: {
      timeout: 30000
    }
  });

  // 组合所有链接
  const link = from([
    errorLink,
    authLink,
    httpLink
  ]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        // 可以在这里定义缓存策略
        Query: {
          fields: {
            // 例如：为分页查询定义合并策略
          }
        }
      }
    }),
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true
      },
      query: {
        errorPolicy: 'all'
      },
      mutate: {
        errorPolicy: 'all'
      }
    },
    // 开发环境配置
    devtools: {
      enabled: process.env.NODE_ENV === 'development'
    }
  });
};

// 创建单例客户端实例
const client = createApolloClient();

export default client;

// 导出重新创建客户端的函数（用于配置更新时）
export const recreateApolloClient = () => {
  const newClient = createApolloClient();
  return newClient;
};