// Directus API 配置 - 基于环境自动检测
import { TokenManager } from '../auth/token-manager';
import { APP_CONFIG } from '@config/app-config';
import { getEnvironmentInfo, isLocalEnvironment } from '../utils/environment';
import { apiLogger } from '../utils/logger';

/*
 * GraphQL 架构说明：
 * - 客户端组件：使用 Apollo Client 系统 (src/generated/graphql.ts)
 * - 服务器端 API 路由：使用 executeServerSideGraphQLQuery 函数
 * - 认证查询：AUTH_QUERIES 用于服务器端认证逻辑
 */

const getDirectusUrl = () => {
  const env = getEnvironmentInfo();
  
  // 检查是否在浏览器环境
  if (env.isBrowser) {
    // 云端部署时，Directus 在同一域名下
    if (!env.isLocal) {
      return window.location.origin; // 使用当前域名
    }
  }
  
  // 本地开发时使用远程 Directus
  return process.env.NEXT_PUBLIC_DIRECTUS_URL || APP_CONFIG.API.DIRECTUS.DEFAULT_URL;
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
  BASE_URL: (() => {
    const env = getEnvironmentInfo();
    return env.isBrowser ? window.location.origin : 'http://localhost:3000';
  })(),
  
  // 获取当前环境应该使用的 GraphQL 端点
  getGraphQLEndpoint: () => {
    // 无论在哪个环境，都统一使用代理端点
    // 本地开发：代理到 forge.matrix-net.tech
    // 云端部署：代理到本地的 Directus 实例
    return '/api/graphql';
  },
};

// 判断是否需要使用代理
const shouldUseProxy = () => {
  const env = getEnvironmentInfo();
  if (env.isServer) return false; // 服务器端不使用代理
  
  // 只有在本地开发环境才使用代理
  return env.isLocal;
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
  getAssetUrl: (fileId: string, authToken?: string, options?: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    format?: 'auto' | 'webp' | 'png' | 'jpg' | 'jpeg';
  }) => {
    if (!fileId) return '';
    if (fileId.startsWith('http')) return fileId;
    
    // 尝试获取令牌，优先使用传入的令牌
    let token = authToken;
    if (!token) {
      const env = getEnvironmentInfo();
      if (env.isBrowser) {
        // 使用 TokenManager 统一获取令牌
        token = TokenManager.getCurrentToken() || undefined;
      }
    }
    
    // 判断是否使用代理
    const useProxy = shouldUseProxy();
    
    // 构建参数
    const params = new URLSearchParams();
    if (token) {
      if (useProxy) {
        params.set('token', token);
      } else {
        params.set('access_token', token);
      }
    }
    
    // 添加图片处理参数
    if (options) {
      if (options.width) params.set('width', options.width.toString());
      if (options.height) params.set('height', options.height.toString());
      if (options.quality) params.set('quality', options.quality.toString());
      if (options.fit) params.set('fit', options.fit);
      if (options.format) params.set('format', options.format);
    }
    
    if (useProxy) {
      // 本地开发环境：使用代理
      const baseUrl = `${DIRECTUS_CONFIG.BASE_URL}/api/assets/${fileId}`;
      return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    } else {
      // 云端部署环境：直接访问 Directus
      const baseUrl = `${getDirectusUrl()}/assets/${fileId}`;
      return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
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
    if (!token) {
      const env = getEnvironmentInfo();
      if (env.isBrowser) {
        // 使用 TokenManager 统一获取令牌
        token = TokenManager.getCurrentToken() || undefined;
      }
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
      apiLogger.error('服务器端 GraphQL 错误', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL 查询失败');
    }
    
    return result.data;
  } catch (error) {
    apiLogger.error('服务器端 GraphQL 请求失败', error);
    throw error;
  }
}

// 认证相关的 GraphQL 查询（基于系统端点）
export const AUTH_QUERIES = {
  // 登录 Mutation（系统端点）
  LOGIN: `
    mutation AuthLogin($email: String!, $password: String!, $mode: auth_mode, $otp: String) {
      auth_login(email: $email, password: $password, mode: $mode, otp: $otp) {
        access_token
        expires
        refresh_token
      }
    }
  `,
  
  // 刷新 Token Mutation（系统端点）
  REFRESH_TOKEN: `
    mutation AuthRefresh($refresh_token: String!, $mode: auth_mode) {
      auth_refresh(refresh_token: $refresh_token, mode: $mode) {
        access_token
        expires
        refresh_token
      }
    }
  `,
  
  // 登出 Mutation（系统端点）
  LOGOUT: `
    mutation AuthLogout($refresh_token: String!, $mode: auth_mode) {
      auth_logout(refresh_token: $refresh_token, mode: $mode)
    }
  `,
  
  // 获取当前用户信息 Query（主端点）
  GET_CURRENT_USER: `
    query GetCurrentUser {
      users_me {
        id
        first_name
        last_name
        email
        language
        theme
        avatar {
          id
          title
          filename_disk
          type
          width
          height
        }
        role {
          id
          name
          description
          icon
          enforce_tfa
          admin_access
          app_access
        }
        last_access
        last_page
        provider
        external_identifier
        email_notifications
        status
      }
    }
  `,
  
  // 更新用户信息 Mutation（系统端点）
  UPDATE_USER_ME: `
    mutation UpdateCurrentUser($data: update_directus_users_input!) {
      update_users_me(data: $data) {
        id
        first_name
        last_name
        email
        language
        theme
        avatar {
          id
          title
          filename_disk
        }
      }
    }
  `,
  
  // 密码重置请求 Mutation（系统端点）
  PASSWORD_REQUEST: `
    mutation AuthPasswordRequest($email: String!, $reset_url: String) {
      auth_password_request(email: $email, reset_url: $reset_url)
    }
  `,
  
  // 密码重置 Mutation（系统端点）
  PASSWORD_RESET: `
    mutation AuthPasswordReset($token: String!, $password: String!) {
      auth_password_reset(token: $token, password: $password)
    }
  `,
};

// 业务相关的 GraphQL 查询（基于主端点）
export const BUSINESS_QUERIES = {
  // 商品相关查询
  GET_PRODUCTS: `
    query GetProducts(
      $filter: products_filter
      $sort: [String]
      $limit: Int
      $offset: Int
      $search: String
    ) {
      products(
        filter: $filter
        sort: $sort
        limit: $limit
        offset: $offset
        search: $search
      ) {
        id
        name
        subtitle
        description
        price
        market_price
        is_on_sale
        main_image
        images
        brand
        stock
        status
        rating_avg
        total_reviews
        total_sales_volume
        created_at
        updated_at
        category_id {
          id
          name
        }
        boutique_id {
          id
          name
          stars
        }
      }
    }
  `,
  
  GET_PRODUCT_BY_ID: `
    query GetProductById($id: ID!) {
      products_by_id(id: $id) {
        id
        name
        subtitle
        description
        price
        market_price
        is_on_sale
        main_image
        images
        brand
        barcode
        stock
        status
        rating_avg
        total_reviews
        total_sales_volume
        seller_id
        video_url
        created_at
        updated_at
        category_id {
          id
          name
          description
        }
        boutique_id {
          id
          name
          stars
          status
          images
        }
      }
    }
  `,
  
  // 分类相关查询
  GET_CATEGORIES: `
    query GetCategories($filter: categories_filter, $sort: [String], $limit: Int) {
      categories(filter: $filter, sort: $sort, limit: $limit) {
        id
        name
        description
        created_at
        updated_at
      }
    }
  `,
  
  // 商铺相关查询
  GET_BOUTIQUES: `
    query GetBoutiques($filter: boutiques_filter, $sort: [String], $limit: Int, $offset: Int) {
      boutiques(filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
        id
        name
        stars
        status
        images
        main_image
        date_created
        date_updated
      }
    }
  `,
  
  GET_BOUTIQUE_BY_ID: `
    query GetBoutiqueById($id: ID!) {
      boutiques_by_id(id: $id) {
        id
        name
        stars
        status
        images
        main_image
        sort
        date_created
        date_updated
      }
    }
  `,
  
  // 订单相关查询
  GET_USER_ORDERS: `
    query GetUserOrders($userId: Int!, $filter: orders_filter, $sort: [String], $limit: Int) {
      orders(
        filter: { 
          user_id: { id: { _eq: $userId } }
          _and: [$filter]
        }
        sort: $sort
        limit: $limit
      ) {
        id
        status
        total_price
        created_at
        updated_at
        user_id {
          id
          name
          email
        }
      }
    }
  `,
  
  GET_ORDER_DETAILS: `
    query GetOrderById($id: ID!) {
      orders_by_id(id: $id) {
        id
        status
        total_price
        created_at
        updated_at
        user_id {
          id
          name
          email
        }
      }
      
      order_items(filter: { order_id: { id: { _eq: $id } } }) {
        id
        quantity
        price
        product_id {
          id
          name
          main_image
          price
        }
      }
    }
  `,
  
  // 用户相关查询
  GET_USERS: `
    query GetUsers($filter: users_filter, $limit: Int, $offset: Int) {
      users(filter: $filter, limit: $limit, offset: $offset) {
        id
        name
        email
        created_at
        updated_at
      }
    }
  `,
  
  GET_USER_BY_ID: `
    query GetUserById($id: ID!) {
      users_by_id(id: $id) {
        id
        name
        email
        created_at
        updated_at
      }
    }
  `,
};

// 店铺管理相关的 GraphQL 查询
export const BOUTIQUE_MANAGEMENT_QUERIES = {
  // 获取所有店铺（管理视图）
  GET_ALL_BOUTIQUES: `
    query GetAllBoutiques(
      $filter: boutiques_filter
      $sort: [String]
      $limit: Int
      $offset: Int
      $search: String
    ) {
      boutiques(
        filter: $filter
        sort: $sort
        limit: $limit
        offset: $offset
        search: $search
      ) {
        id
        name
        stars
        status
        images
        main_image
        sort
        date_created
        date_updated
        user_created {
          id
          first_name
          last_name
          email
        }
        user_updated {
          id
          first_name
          last_name
          email
        }
      }
    }
  `,
  
  // 获取店铺统计信息
  GET_BOUTIQUES_STATS: `
    query GetBoutiquesAggregated($filter: boutiques_filter) {
      boutiques_aggregated(filter: $filter) {
        countAll
        count {
          id
          status
          stars
        }
        avg {
          stars
        }
        max {
          stars
        }
        min {
          stars
        }
      }
    }
  `,
  
  // 创建新店铺
  CREATE_BOUTIQUE: `
    mutation CreateBoutique($data: create_boutiques_input!) {
      create_boutiques_item(data: $data) {
        id
        name
        stars
        status
        images
        main_image
        sort
        date_created
        user_created {
          id
          first_name
          last_name
        }
      }
    }
  `,
  
  // 更新店铺信息
  UPDATE_BOUTIQUE: `
    mutation UpdateBoutique($id: ID!, $data: update_boutiques_input!) {
      update_boutiques_item(id: $id, data: $data) {
        id
        name
        stars
        status
        images
        main_image
        sort
        date_updated
        user_updated {
          id
          first_name
          last_name
        }
      }
    }
  `,
  
  // 批量更新店铺状态
  UPDATE_BOUTIQUES_STATUS: `
    mutation UpdateBoutiqueStatus($ids: [ID]!, $status: String!) {
      update_boutiques_items(ids: $ids, data: { status: $status }) {
        id
        name
        status
        date_updated
      }
    }
  `,
  
  // 删除店铺
  DELETE_BOUTIQUE: `
    mutation DeleteBoutique($id: ID!) {
      delete_boutiques_item(id: $id) {
        id
      }
    }
  `,
  
  // 批量删除店铺
  DELETE_BOUTIQUES: `
    mutation DeleteBoutiques($ids: [ID]!) {
      delete_boutiques_items(ids: $ids) {
        ids
      }
    }
  `,
  
  // 获取店铺商品列表
  GET_BOUTIQUE_PRODUCTS: `
    query GetBoutiqueProducts(
      $boutiqueId: Int!
      $filter: products_filter
      $sort: [String]
      $limit: Int
      $offset: Int
    ) {
      products(
        filter: {
          boutique_id: { id: { _eq: $boutiqueId } }
          _and: [$filter]
        }
        sort: $sort
        limit: $limit
        offset: $offset
      ) {
        id
        name
        price
        market_price
        stock
        status
        rating_avg
        total_sales_volume
        created_at
        category_id {
          id
          name
        }
      }
    }
  `,
  
  // 获取店铺商品统计
  GET_BOUTIQUE_PRODUCTS_STATS: `
    query GetBoutiqueProductsStats($boutiqueId: Int!) {
      products_aggregated(
        filter: { boutique_id: { id: { _eq: $boutiqueId } } }
      ) {
        countAll
        count {
          status
        }
        avg {
          price
          rating_avg
        }
        sum {
          total_sales_volume
          stock
        }
      }
    }
  `,
  
  // 获取店铺相关订单
  GET_BOUTIQUE_ORDERS: `
    query GetBoutiqueOrders(
      $boutiqueId: Int!
      $filter: orders_filter
      $sort: [String]
      $limit: Int
      $offset: Int
    ) {
      order_items(
        filter: {
          product_id: {
            boutique_id: { id: { _eq: $boutiqueId } }
          }
        }
        sort: $sort
        limit: $limit
        offset: $offset
      ) {
        id
        quantity
        price
        order_id {
          id
          status
          total_price
          created_at
          user_id {
            id
            name
            email
          }
        }
        product_id {
          id
          name
          main_image
        }
      }
    }
  `,
  
  // 获取店铺销售统计
  GET_BOUTIQUE_SALES_STATS: `
    query GetBoutiqueSalesStats($boutiqueId: Int!) {
      order_items_aggregated(
        filter: {
          product_id: {
            boutique_id: { id: { _eq: $boutiqueId } }
          }
        }
      ) {
        countAll
        sum {
          quantity
          price
        }
        avg {
          price
        }
      }
    }
  `,
  
  // 获取店铺业绩概览
  GET_BOUTIQUE_PERFORMANCE: `
    query GetBoutiquePerformance($boutiqueId: Int!) {
      boutiques_by_id(id: $boutiqueId) {
        id
        name
        stars
        status
        date_created
      }
      
      products_aggregated(
        filter: { boutique_id: { id: { _eq: $boutiqueId } } }
        groupBy: ["status"]
      ) {
        group
        countAll
      }
      
      order_items_aggregated(
        filter: {
          product_id: {
            boutique_id: { id: { _eq: $boutiqueId } }
          }
        }
      ) {
        countAll
        sum {
          quantity
          price
        }
      }
    }
  `,
  
  // 高级店铺搜索
  SEARCH_BOUTIQUES: `
    query SearchBoutiques(
      $searchTerm: String
      $minStars: Int
      $maxStars: Int
      $status: String
      $sortBy: [String]
      $limit: Int
      $offset: Int
    ) {
      boutiques(
        search: $searchTerm
        filter: {
          stars: {
            _gte: $minStars
            _lte: $maxStars
          }
          status: { _eq: $status }
        }
        sort: $sortBy
        limit: $limit
        offset: $offset
      ) {
        id
        name
        stars
        status
        main_image
        date_created
        date_updated
      }
    }
  `,
};
