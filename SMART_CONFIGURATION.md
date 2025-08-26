# 简化版 GraphQL 配置系统

## 设计理念

你说得对！根本不需要复杂的环境变量配置。当前端部署在云上时，我们访问时就已经确定了域名，系统可以智能检测并自动配置。

## 🎯 核心原理

### 智能域名检测

```javascript
// 系统自动检测当前域名
if (window.location.host.includes('forge')) {
  // forge.matrix-net.tech - 前后端同域，直接访问
  endpoint = '/graphql'
  useProxy = false
} else {
  // 其他情况 - 使用代理避免 CORS
  endpoint = '/api/graphql'  
  useProxy = true
}
```

### 环境自适应

- **开发环境** (`localhost:3000`): 总是使用代理 `/api/graphql`
- **生产环境** (`forge.matrix-net.tech`): 智能检测，同域直连 `/graphql`

## 📊 配置逻辑

| 环境 | 域名 | 端点 | 代理 | 说明 |
|------|------|------|------|------|
| 开发 | localhost:3000 | `/api/graphql` | ✅ | 避免 CORS |
| 生产 | forge.matrix-net.tech | `/graphql` | ❌ | 同域直连 |
| 生产 | 其他域名 | `/api/graphql` | ✅ | 使用代理 |

## 🔧 工作原理

### 1. 智能端点选择
```typescript
const getSmartEndpoint = () => {
  if (environment === 'development') {
    return { endpoint: '/api/graphql', useProxy: true };
  }
  
  if (window.location.host.includes('forge')) {
    return { endpoint: '/graphql', useProxy: false };
  }
  
  return { endpoint: '/api/graphql', useProxy: true };
};
```

### 2. 自动配置生成
```typescript
export const defaultApiConfig = {
  endpoint: getSmartEndpoint().endpoint,
  useProxy: getSmartEndpoint().useProxy,
  requiresAuth: true,
  timeout: 30000,
  retryCount: 3
};
```

## 🚀 优势

### ✅ **简单易懂**
- 无需环境变量文件
- 无需手动配置
- 基于域名自动判断

### ✅ **零配置**
- 开发环境直接 `npm run dev`
- 生产环境直接部署
- 自适应所有场景

### ✅ **高性能**
- 同域直连，无代理开销
- 自动选择最优路径
- 智能 CORS 处理

### ✅ **无缝部署**
- 同一套代码适用所有环境
- 无需修改配置文件
- 自动适应部署域名

## 📋 部署场景

### 场景 1: Forge 同域部署 (推荐)
```
前端: https://forge.matrix-net.tech
后端: https://forge.matrix-net.tech/graphql
配置: 自动检测同域，直接访问 /graphql
```

### 场景 2: 分离部署
```
前端: https://app.example.com  
后端: https://api.example.com/graphql
配置: 自动使用代理 /api/graphql
```

### 场景 3: 开发环境
```
前端: http://localhost:3000
后端: https://directus.matrix-net.tech/graphql
配置: 自动使用代理避免 CORS
```

## 🔍 调试工具

### 查看当前配置
访问 `/api/config` 查看实时配置状态：

```json
{
  "currentConfig": {
    "endpoint": "/graphql",
    "useProxy": false
  },
  "analysis": {
    "isUsingProxy": false,
    "targetEndpoint": "/graphql",
    "currentHost": "forge.matrix-net.tech"
  },
  "explanation": {
    "production": "生产环境根据域名智能检测：forge 域名直连 /graphql"
  }
}
```

### 测试连接
```bash
npm run test:proxy
```

## 📁 关键文件

- `src/app/lib/api-config.ts` - 智能配置逻辑
- `src/app/lib/directus-config.ts` - 基础配置  
- `src/app/api/graphql/route.ts` - GraphQL 代理
- `src/app/api/config/route.ts` - 配置调试

## 🎉 总结

通过智能域名检测，系统能够：

1. **自动判断部署环境**
2. **选择最优访问路径** 
3. **处理 CORS 问题**
4. **零配置部署**

无需任何 `.env` 文件，一套代码适用所有场景！
