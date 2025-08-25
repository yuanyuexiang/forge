import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// 根据环境配置GraphQL端点
const getGraphQLEndpoint = () => {
  // 在开发环境使用本地代理避免CORS
  if (process.env.NODE_ENV === 'development') {
    return '/api/graphql';
  }
  
  // 生产环境可以直接连接（如果CORS配置正确）
  // 或者使用环境变量配置的端点
  return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '/api/graphql';
};

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

// 创建 HTTP 链接
const httpLink = new HttpLink({ 
  uri: getGraphQLEndpoint()
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    },
    query: {
      errorPolicy: 'all'
    }
  }
});

export default client;