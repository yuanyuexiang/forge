# CORS 问题修复说明

## 问题描述

在云端部署时，前端应用直接请求 `https://directus.matrix-net.tech/graphql` 时出现 CORS 错误：
- **错误类型**: 405 Method Not Allowed
- **请求方法**: OPTIONS (预检请求)
- **原因**: Directus 服务器不支持 CORS 预检请求

## 解决方案

### 1. 修改 API 配置策略

**文件**: `src/app/lib/api-config.ts`

**更改**: 
- 生产环境也使用代理配置而不是直接连接
- 确保所有环境都通过 Next.js 代理访问 GraphQL

```typescript
// 修改前
const baseConfig = environment === 'production' ? directApiConfig : defaultApiConfig;

// 修改后  
const baseConfig = defaultApiConfig; // 总是使用代理配置
```

### 2. 启用代理作为默认选项

**文件**: `src/app/lib/directus-config.ts`

**更改**:
- 默认启用代理以避免 CORS 问题
- 添加服务器端 GraphQL 查询函数

```typescript
// 修改前
useProxy: boolean = false  // 暂时禁用代理

// 修改后
useProxy: boolean = true  // 默认使用代理，避免CORS问题
```

### 3. 完善 GraphQL 代理的 CORS 支持

**文件**: `src/app/api/graphql/route.ts`

**更改**:
- 添加完整的 CORS 头部支持
- 支持更多 HTTP 方法
- 添加预检请求缓存
- 支持 GET 方法查询

```typescript
// 新增的 CORS 头部
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
'Access-Control-Max-Age': '86400', // 24小时缓存预检请求
```

### 4. 优化认证流程

**文件**: `src/app/api/auth/route.ts`

**更改**:
- 使用新的服务器端 GraphQL 查询函数
- 保持认证流程的稳定性（服务器端不受 CORS 影响）

### 5. 添加健康检查端点

**文件**: `src/app/api/health/route.ts`

**新增**: 健康检查端点用于监控应用状态

### 6. 添加部署验证脚本

**文件**: `verify-deployment.sh`

**新增**: 部署后自动验证脚本，检查：
- 应用可访问性
- GraphQL 代理 CORS 支持  
- GraphQL 代理基础查询
- 直接 Directus 连接状态

## 架构变更

### 修改前
```
前端 -> 直接请求 https://directus.matrix-net.tech/graphql
       ❌ CORS 预检请求失败 (405 Method Not Allowed)
```

### 修改后
```
前端 -> /api/graphql (Next.js 代理) -> https://directus.matrix-net.tech/graphql
       ✅ 代理处理 CORS，转发请求到 Directus
```

## 验证步骤

### 本地测试
```bash
# 构建项目
npm run build

# 启动生产模式
npm start

# 测试 GraphQL 代理
npm run test:proxy
```

### 部署后验证
```bash
# 运行验证脚本
./verify-deployment.sh

# 或者手动测试
curl -X OPTIONS "https://forge.matrix-net.tech/api/graphql" \
  -H "Origin: https://forge.matrix-net.tech" \
  -H "Access-Control-Request-Method: POST"
```

## 配置参数

### 环境变量
- `BASE_URL`: 应用基础URL (默认: http://localhost:3000)
- `FORGE_URL`: 用于验证脚本 (默认: https://forge.matrix-net.tech)
- `DIRECTUS_URL`: 用于验证脚本 (默认: https://directus.matrix-net.tech)

### Docker 部署
确保在 `docker-compose.yaml` 中正确设置 Traefik 标签：
```yaml
labels:
  - "traefik.http.services.forge.loadbalancer.server.port=3000"
```

## 注意事项

1. **代理性能**: 所有 GraphQL 请求现在通过 Next.js 服务器代理，可能会增加一些延迟
2. **缓存策略**: CORS 预检请求缓存 24 小时，减少不必要的 OPTIONS 请求
3. **错误处理**: 代理包含完整的错误处理和日志记录
4. **兼容性**: 支持 GET 和 POST 方法，兼容不同的 GraphQL 客户端

## 监控建议

1. 监控 `/api/health` 端点确保应用健康
2. 查看应用日志中的 GraphQL 代理请求
3. 使用 `verify-deployment.sh` 定期验证部署状态
4. 监控 Directus 服务器的可用性
