import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { TokenManager } from '@lib/auth/token-manager';
import { apiLogger } from '@lib/utils/logger';

// HTTP Link for all operations (including subscriptions via multipart HTTP)
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DIRECTUS_URL + '/graphql',
});

// Auth link to add authorization headers
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

// Error link for handling GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      apiLogger.error('GraphQL error:', {
        message,
        locations,
        path,
        extensions
      });
      
      // Handle authentication errors
      if (extensions?.code === 'UNAUTHENTICATED') {
        TokenManager.clearTokens();
        // 可以触发重新登录逻辑
      }
    });
  }

  if (networkError) {
    apiLogger.error('Network error:', networkError);
    
    // Handle specific network errors
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      TokenManager.clearTokens();
    }
  }
});

// Create the Apollo Client with HTTP-only approach
const client = new ApolloClient({
  link: from([
    errorLink,
    authLink,
    httpLink  // Single HTTP link handles queries, mutations, AND subscriptions
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      // Configure cache policies as needed
      Query: {
        fields: {
          // Add any specific field policies
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-and-network'
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'cache-first'
    }
  }
});

export default client;
