import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// 创建认证链接
const authLink = setContext((_, { headers }) => {
  // 从localStorage获取token
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {})
    }
  };
});

// 创建错误处理链接
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    
    // 如果是401错误，清除token并重定向到登录页
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
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