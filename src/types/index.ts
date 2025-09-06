// 共享类型定义

// 用户相关类型
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  created_at?: string;
  role?: {
    id: string;
    name: string;
  };
}

// 产品相关类型
export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  price: number;
  market_price?: number;
  stock: number;
  barcode?: string;
  brand?: string;
  status: ProductStatus;
  created_at?: string;
  updated_at?: string;
  category_id?: Category;
  images?: string[];
}

export type ProductStatus = 'draft' | 'pending_review' | 'on_sale' | 'off_sale';

// 分类相关类型
export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// 订单相关类型
export interface Order {
  id: string;
  user_id: User;
  total_price: number;
  status: OrderStatus;
  created_at?: string;
  updated_at?: string;
  items?: OrderItem[];
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  product_id: Product;
  quantity: number;
  unit_price: number;
  total_price: number;
}

// API 响应类型
export interface ApiResponse<T = any> {
  data?: T;
  errors?: ApiError[];
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  extensions?: {
    code: string;
    [key: string]: any;
  };
}

// 表单相关类型
export interface FormProps<T = any> {
  initialValues?: Partial<T>;
  onSubmit: (values: T) => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

// 表格相关类型
export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sorter?: boolean;
  width?: number;
}

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
}

// 组件 Props 类型
export interface LayoutProps {
  children: React.ReactNode;
}

export interface AdminLayoutProps extends LayoutProps {
  title?: string;
  breadcrumb?: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

// 认证相关类型
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires?: number;
  user?: User;
}

// 环境和配置类型
export type Environment = 'development' | 'production';

export interface EnvironmentInfo {
  isDevelopment: boolean;
  isProduction: boolean;
  isLocal: boolean;
  isServer: boolean;
  isBrowser: boolean;
  hostname?: string;
  nodeEnv: Environment;
}

// 日志相关类型
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  component?: string;
}

// 文件上传类型
export interface FileUploadResponse {
  id: string;
  filename_download: string;
  title?: string;
  type: string;
  filesize: number;
  width?: number;
  height?: number;
  url?: string;
}

export interface ImageTransforms {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpg' | 'png' | 'webp' | 'avif';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

// Directus 配置类型
export interface DirectusConfig {
  GRAPHQL_URL: string;
  GRAPHQL_SYSTEM_URL: string;
  LOCAL_GRAPHQL_PROXY: string;
  FILE_UPLOAD_URL: string;
  BASE_URL: string;
  getGraphQLEndpoint: () => string;
}

export interface FileConfig {
  getFileUrl: (fileId: string) => string;
  getAssetUrl: (fileId: string, authToken?: string) => string;
  getImageUrl: (fileId: string, transforms?: ImageTransforms, authToken?: string) => string;
}
