# CORS 和 GraphQL 代理配置说明

## 🚫 CORS 问题

当前项目在开发环境中遇到的 CORS（跨域资源共享）问题：

```
Request URL: https://directus.matrix-net.tech/graphql
Referrer Policy: strict-origin-when-cross-origin
```

## ✅ 解决方案

### 1. 使用本地 GraphQL 代理（当前方案）

**配置：**
```typescript
// src/app/lib/apollo-client.ts
const httpLink = new HttpLink({ 
  uri: '/api/graphql'  // 使用本地代理端点
});
```

**工作流程：**
```
浏览器 → Apollo Client → /api/graphql (本地代理) → Directus GraphQL
```

**优势：**
- ✅ 完全避免 CORS 问题
- ✅ 可以在服务端添加额外的认证和日志
- ✅ 更好的错误处理
- ✅ 可以缓存和限流

### 2. 配置 Directus 允许跨域（备选方案）

如果你有 Directus 服务器的控制权，可以配置 CORS：

```env
# .env (Directus 服务器)
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000,https://your-frontend-domain.com
CORS_METHODS=GET,POST,PATCH,DELETE
CORS_ALLOWED_HEADERS=Content-Type,Authorization
```

### 3. 开发环境代理配置（Next.js）

在 `next.config.ts` 中配置代理：

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/directus/:path*',
        destination: 'https://directus.matrix-net.tech/:path*',
      },
    ];
  },
};

export default nextConfig;
```

## 🔧 当前项目配置

### Apollo Client 配置

```typescript
// src/app/lib/apollo-client.ts
const getGraphQLEndpoint = () => {
  // 开发环境使用本地代理避免CORS
  if (process.env.NODE_ENV === 'development') {
    return '/api/graphql';
  }
  
  // 生产环境可以直接连接（如果CORS配置正确）
  return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '/api/graphql';
};
```

### GraphQL 代理实现

当前 `/api/graphql` 端点：
- ✅ 转发所有 GraphQL 请求到 Directus
- ✅ 处理认证 token
- ✅ 提供错误日志
- ✅ 返回正确的响应格式

## 📊 测试结果

从服务器日志可以看到：

```
GraphQL Proxy - Response status: 200
GraphQL Proxy - Response preview: {"data":{"products":[{"id":"1","name":"iPhone 14"...
```

**产品查询成功：**
- ✅ GetProducts 查询正常
- ✅ GetCategories 查询正常
- ✅ 返回了完整的产品数据

## 🚀 推荐方案

对于当前项目，**建议继续使用本地 GraphQL 代理方案**：

1. **开发环境**：使用 `/api/graphql` 代理
2. **生产环境**：根据服务器 CORS 配置决定是否直连

这种方案提供了最大的灵活性和最佳的开发体验。

## 🛠️ 环境变量配置

可以在 `.env.local` 中配置：

```env
# GraphQL 端点配置
NEXT_PUBLIC_GRAPHQL_ENDPOINT=/api/graphql

# 如果要直连 Directus（仅当 CORS 配置正确时）
# NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://directus.matrix-net.tech/graphql
```
