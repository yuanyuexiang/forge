// Directus API 配置 - 简化版本，基于域名自动检测
const getDirectusUrl = () => {
  // 如果在浏览器环境且域名包含 forge，说明是同域部署
  if (typeof window !== 'undefined' && window.location.host.includes('forge')) {
    return window.location.origin;
  }
  
  // 默认使用 Directus 
  return 'https://directus.matrix-net.tech';
};

export const DIRECTUS_CONFIG = {
  // GraphQL 端点 - 自动检测
  GRAPHQL_URL: `${getDirectusUrl()}/graphql`,
  GRAPHQL_SYSTEM_URL: `${getDirectusUrl()}/graphql/system`,
  
  // 本地代理端点
  LOCAL_GRAPHQL_PROXY: '/api/graphql',
  
  // 基础配置
  BASE_URL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
};

// GraphQL 查询辅助函数（客户端使用，通过代理）
export async function executeGraphQLQuery(
  query: string, 
  variables: any = {}, 
  authToken?: string,
  useProxy: boolean = true  // 默认使用代理，避免CORS问题
) {
  const url = useProxy 
    ? `${DIRECTUS_CONFIG.BASE_URL}${DIRECTUS_CONFIG.LOCAL_GRAPHQL_PROXY}`
    : DIRECTUS_CONFIG.GRAPHQL_URL;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL 错误:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL 查询失败');
    }
    
    return result.data;
  } catch (error) {
    console.error('GraphQL 请求失败:', error);
    throw error;
  }
}

// 服务器端 GraphQL 查询辅助函数（直接连接，不通过代理）
export async function executeServerSideGraphQLQuery(
  query: string, 
  variables: any = {}, 
  authToken?: string,
  useSystemEndpoint: boolean = false
) {
  const url = useSystemEndpoint 
    ? DIRECTUS_CONFIG.GRAPHQL_SYSTEM_URL 
    : DIRECTUS_CONFIG.GRAPHQL_URL;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('服务器端 GraphQL 错误:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL 查询失败');
    }
    
    return result.data;
  } catch (error) {
    console.error('服务器端 GraphQL 请求失败:', error);
    throw error;
  }
}

// 认证相关的 GraphQL 查询
export const AUTH_QUERIES = {
  LOGIN: `
    mutation AuthLogin($email: String!, $password: String!) {
      auth_login(email: $email, password: $password) {
        access_token
        refresh_token
      }
    }
  `,
  
  GET_CURRENT_USER: `
    query {
      users_me {
        id
        email
        first_name
        last_name
        role {
          id
          name
        }
      }
    }
  `,
};

// 业务数据 GraphQL 查询
export const DATA_QUERIES = {
  PRODUCTS: `
    query {
      products {
        id
        name
        description
        price
        stock
        created_at
        updated_at
      }
    }
  `,
  
  CATEGORIES: `
    query {
      categories {
        id
        name
        description
      }
    }
  `,
  
  ORDERS: `
    query {
      orders {
        id
        user_id
        total_price
        status
        created_at
        updated_at
      }
    }
  `,
  
  PAYMENTS: `
    query {
      payments {
        id
        order_id
        payment_method
        amount
        status
        paid_at
        created_at
        updated_at
      }
    }
  `,
  
  USERS: `
    query {
      users {
        id
        first_name
        last_name
        email
        status
        created_at
        last_access
      }
    }
  `,
};
