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
  
  // 文件上传端点
  FILE_UPLOAD_URL: `${getDirectusUrl()}/files`,
  
  // 基础配置
  BASE_URL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
};

// 判断是否需要使用代理
const shouldUseProxy = () => {
  if (typeof window === 'undefined') return false; // 服务器端不使用代理
  
  // 如果域名包含 forge，说明是同域部署，不需要代理
  if (window.location.host.includes('forge')) {
    return false;
  }
  
  // 其他情况（本地开发等）使用代理
  return true;
};

// 文件资产配置
export const FILE_CONFIG = {
  // 获取文件的完整 URL（直接访问）
  getFileUrl: (fileId: string) => {
    if (!fileId) return '';
    if (fileId.startsWith('http')) return fileId;
    return `${getDirectusUrl()}/assets/${fileId}`;
  },
  
  // 获取带认证的资产 URL（智能选择代理或直连）
  getAssetUrl: (fileId: string, authToken?: string) => {
    if (!fileId) return '';
    if (fileId.startsWith('http')) return fileId;
    
    // 尝试获取令牌，优先使用传入的令牌
    let token = authToken;
    if (!token && typeof window !== 'undefined') {
      // 使用与TokenManager相同的优先级顺序
      token = localStorage.getItem('accessToken') ||
              localStorage.getItem('directus_auth_token') || 
              localStorage.getItem('authToken') ||
              localStorage.getItem('directus_token') ||
              undefined;
    }
    
    // 判断是否使用代理
    const useProxy = shouldUseProxy();
    
    if (useProxy) {
      // 本地开发环境：使用代理
      const baseUrl = `${DIRECTUS_CONFIG.BASE_URL}/api/assets/${fileId}`;
      return token ? `${baseUrl}?token=${encodeURIComponent(token)}` : baseUrl;
    } else {
      // 云端部署环境：直接访问 Directus
      const baseUrl = `${getDirectusUrl()}/assets/${fileId}`;
      return token ? `${baseUrl}?access_token=${encodeURIComponent(token)}` : baseUrl;
    }
  },
  
  // 获取带变换参数的图片 URL
  getImageUrl: (fileId: string, transforms?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'jpg' | 'png' | 'webp' | 'avif';
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  }, authToken?: string) => {
    if (!fileId) return '';
    if (fileId.startsWith('http')) return fileId;
    
    // 尝试获取令牌，优先使用传入的令牌
    let token = authToken;
    if (!token && typeof window !== 'undefined') {
      // 使用与TokenManager相同的优先级顺序
      token = localStorage.getItem('accessToken') ||
              localStorage.getItem('directus_auth_token') || 
              localStorage.getItem('authToken') ||
              localStorage.getItem('directus_token') ||
              undefined;
    }
    
    const useProxy = shouldUseProxy();
    const params = new URLSearchParams();
    
    // 添加变换参数
    if (transforms) {
      Object.entries(transforms).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    // 添加认证参数
    if (token) {
      const tokenParam = useProxy ? 'token' : 'access_token';
      params.append(tokenParam, token);
    }
    
    const baseUrl = useProxy 
      ? `${DIRECTUS_CONFIG.BASE_URL}/api/assets/${fileId}`
      : `${getDirectusUrl()}/assets/${fileId}`;
    
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  }
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
