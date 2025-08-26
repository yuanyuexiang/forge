# GraphQL 端点动态配置系统

## 概述

本系统支持通过环境变量动态配置 GraphQL 端点，避免在前端代码中硬编码后端地址。支持多种部署场景，自动处理 CORS 问题。

## 🎯 设计目标

1. **不硬编码端点** - 前端代码不包含具体的后端地址
2. **环境适配** - 开发、测试、生产环境自动适配
3. **CORS 处理** - 自动判断是否需要代理避免 CORS 问题
4. **灵活配置** - 支持多种配置方式满足不同需求

## 🔧 配置方式

### 优先级顺序

1. **直接指定 GraphQL 端点** (最高优先级)
   ```bash
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.example.com/graphql
   ```

2. **Forge 后端配置** (生产环境推荐)
   ```bash
   NEXT_PUBLIC_FORGE_BACKEND_URL=https://forge.matrix-net.tech
   # 系统自动添加 /graphql 后缀
   ```

3. **Directus 配置** (开发环境或默认)
   ```bash
   NEXT_PUBLIC_DIRECTUS_URL=https://directus.matrix-net.tech
   # 系统自动添加 /graphql 后缀
   ```

### 代理配置

```bash
# 生产环境是否强制使用代理
NEXT_PUBLIC_USE_PROXY_IN_PRODUCTION=true|false

# 应用基础 URL（用于代理请求）
NEXT_PUBLIC_BASE_URL=https://your-app.com
```

## 📋 配置场景

### 场景 1: Forge 作为后端（推荐）

**环境文件** (`.env.local`):
```bash
NEXT_PUBLIC_FORGE_BACKEND_URL=https://forge.matrix-net.tech
NEXT_PUBLIC_USE_PROXY_IN_PRODUCTION=false
```

**效果**:
- 开发环境: `localhost:3000/api/graphql` (代理) → `https://forge.matrix-net.tech/graphql`
- 生产环境: 直接访问 `https://forge.matrix-net.tech/graphql`
- 优势: 同域部署，无 CORS 问题，无代理开销

### 场景 2: 外部 GraphQL 服务

**环境文件** (`.env.local`):
```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://external-api.com/graphql
NEXT_PUBLIC_USE_PROXY_IN_PRODUCTION=true
```

**效果**:
- 所有环境都通过代理访问，避免 CORS 问题

### 场景 3: 开发环境专用配置

**环境文件** (`.env.local`):
```bash
NEXT_PUBLIC_DIRECTUS_URL=https://directus.matrix-net.tech
# 开发环境自动使用代理，生产环境需要配置 CORS
```

## 🛠️ 自动判断逻辑

### 代理使用判断

```javascript
function shouldUseProxy() {
  // 开发环境默认使用代理
  if (process.env.NODE_ENV === 'development') return true;
  
  // 生产环境检查配置
  if (process.env.NEXT_PUBLIC_USE_PROXY_IN_PRODUCTION === 'true') return true;
  
  // 如果配置了 forge 后端，通常不需要代理（同域）
  if (process.env.NEXT_PUBLIC_FORGE_BACKEND_URL) return false;
  
  // 默认使用代理避免 CORS 问题
  return true;
}
```

### 端点解析逻辑

```javascript
function getGraphQLEndpoint() {
  // 1. 直接指定的端点
  if (process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
    return process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  }
  
  // 2. Forge 后端（生产环境推荐）
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_FORGE_BACKEND_URL) {
    return `${process.env.NEXT_PUBLIC_FORGE_BACKEND_URL}/graphql`;
  }
  
  // 3. Directus 或默认
  return `${directusUrl}/graphql`;
}
```

## 📊 配置调试

### 查看当前配置

访问 `/api/config` 端点查看详细的配置信息：

```json
{
  "environment": "development",
  "currentConfig": {
    "endpoint": "/api/graphql",
    "useProxy": true,
    "timeout": 30000
  },
  "analysis": {
    "isUsingProxy": true,
    "targetEndpoint": "http://localhost:3000/api/graphql -> https://forge.matrix-net.tech/graphql",
    "potentialCorsIssue": false
  },
  "recommendations": [
    "💡 建议：配置 NEXT_PUBLIC_FORGE_BACKEND_URL 环境变量以明确指定后端端点。"
  ]
}
```

### 测试配置

运行测试脚本：
```bash
npm run test:proxy
```

## 🚀 部署建议

### 本地开发
```bash
# 不需要额外配置，系统自动使用代理
npm run dev
```

### 生产部署（Forge 后端）
```bash
# 设置环境变量
export NEXT_PUBLIC_FORGE_BACKEND_URL=https://forge.matrix-net.tech
export NEXT_PUBLIC_USE_PROXY_IN_PRODUCTION=false

# 构建部署
npm run build
npm start
```

### Docker 部署
```dockerfile
ENV NEXT_PUBLIC_FORGE_BACKEND_URL=https://forge.matrix-net.tech
ENV NEXT_PUBLIC_USE_PROXY_IN_PRODUCTION=false
```

## 🔍 故障排除

### 常见问题

1. **CORS 错误**
   - 解决方案：设置 `NEXT_PUBLIC_USE_PROXY_IN_PRODUCTION=true`

2. **端点配置不生效**
   - 检查环境变量是否以 `NEXT_PUBLIC_` 开头
   - 重启开发服务器

3. **代理请求失败**
   - 检查目标端点是否可访问
   - 查看服务器日志确认代理配置

### 调试步骤

1. 访问 `/api/config` 查看配置状态
2. 运行 `npm run test:proxy` 测试连接
3. 检查浏览器开发者工具的网络请求
4. 查看服务器日志

## 📁 相关文件

- `src/app/lib/api-config.ts` - 主要配置逻辑
- `src/app/lib/directus-config.ts` - 端点配置
- `src/app/api/graphql/route.ts` - GraphQL 代理
- `src/app/api/config/route.ts` - 配置调试端点
- `.env.example` - 配置示例
- `.env.forge` - Forge 特定配置示例

## 🔗 快速链接

- 配置信息: `/api/config`
- 健康检查: `/api/health`
- GraphQL 代理: `/api/graphql`
