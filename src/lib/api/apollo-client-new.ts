import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { TokenManager } from '@lib/auth/token-manager';
import { apiLogger } from '@lib/utils/logger';

// 简化的 HTTP Link - 支持查询、变更和 HTTP Multipart Subscriptions
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DIRECTUS_URL + '/graphql',
  // Apollo Client 会自动为 subscription 操作添加必要的 headers
});

// 认证链接
const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await TokenManager.getValidToken();
    
    return {
      headers: {
        ...headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      }
    };
  } catch (error) {
    apiLogger.error('Authentication failed:', error);
    return { headers };
  }
});

// 错误处理链接
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      apiLogger.error('GraphQL error:', {
        message,
        locations,
        path,
        extensions,
        operation: operation.operationName
      });
      
      // 处理认证错误
      if (extensions?.code === 'UNAUTHENTICATED') {
        TokenManager.clearTokens();
        // 可以在这里触发重新登录逻辑
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    });
  }

  if (networkError) {
    apiLogger.error('Network error:', networkError);
    
    // 处理网络认证错误
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      TokenManager.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }
});

// 创建 Apollo Client
const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    httpLink  // 单一 HTTP 链接处理所有操作类型
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // 配置字段策略以支持轮询更新
          products: {
            merge: (existing = [], incoming) => incoming,
          },
          orders: {
            merge: (existing = [], incoming) => incoming,
          },
          customers: {
            merge: (existing = [], incoming) => incoming,
          },
          categories: {
            merge: (existing = [], incoming) => incoming,
          }
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});

export default client;
