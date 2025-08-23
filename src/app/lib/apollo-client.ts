import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getApiConfig } from './api-config';

// 创建认证链接
const authLink = setContext((_, { headers }) => {
  const config = getApiConfig();
  const token = config.authToken;
  
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {})
    }
  };
});

// 创建 HTTP 链接
const httpLink = new HttpLink({ 
  uri: () => getApiConfig().endpoint
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