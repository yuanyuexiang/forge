import { ApolloClient, InMemoryCache, HttpLink, from, fromPromise } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { DIRECTUS_CONFIG } from './directus-config';
import { TokenManager } from '../auth/token-manager';
import { getEnvironmentInfo } from '../utils/environment';
import { authLogger, apiLogger } from '../utils/logger';

// 刷新 token 的函数
const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    // 直接使用GraphQL system端点刷新token
    const response = await fetch('https://forge.kcbaotech.com/graphql/system', {
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
        variables: { refresh_token: refreshToken }
      }),
    });

    const result = await response.json();

    if (result.errors || !result.data?.auth_refresh?.access_token) {
      // Refresh token 无效，清除存储
      TokenManager.clearTokens();
      return null;
    }

    const authData = result.data.auth_refresh;
    
    // 更新存储的 token
    TokenManager.saveTokens(authData.access_token, authData.refresh_token);

    return authData.access_token;
  } catch (error) {
    authLogger.error('Token refresh failed', error);
    TokenManager.clearTokens();
    return null;
  }
};

// 创建认证链接
const authLink = setContext(async (_, { headers }) => {
  // 使用 TokenManager 获取 token
  let token = TokenManager.getCurrentToken();
  
  // 检查 token 是否即将过期（如果是 JWT）
  if (token) {
    const env = getEnvironmentInfo();
    if (env.isBrowser) {
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
        authLogger.error('Error checking token expiration', error);
      }
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
      apiLogger.error(
        'GraphQL error',
        { message, locations, path }
      );
    });
  }

  if (networkError) {
    apiLogger.error('Network error', networkError);
    
    // 如果是401错误（token过期），尝试刷新token并重试请求
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      const env = getEnvironmentInfo();
      if (env.isBrowser) {
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
              TokenManager.clearTokens();
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
  // 动态选择 GraphQL 端点
  const httpLink = new HttpLink({ 
    uri: DIRECTUS_CONFIG.getGraphQLEndpoint(),
    fetchOptions: {
      timeout: 30000
    }
  });

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
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