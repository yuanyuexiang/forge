# WebSocket 配置说明

## 概述

本项目使用 GraphQL WebSocket 订阅来实现实时功能（如订单实时监控）。

## 架构

### HTTP 请求（查询和变更）
- **本地开发**: 通过 Next.js API Route (`/api/graphql`) 代理到 `https://forge.kcbaotech.com/graphql`
- **生产环境**: 直接访问同域名下的 `/graphql` 端点

### WebSocket 连接（订阅）
- **本地开发**: 直接连接到 `wss://forge.kcbaotech.com/graphql`
- **生产环境**: 连接到同域名下的 `wss://your-domain.com/graphql`

## 为什么 WebSocket 不通过代理？

Next.js API Routes 基于无服务器函数，**不支持 WebSocket 协议升级**。因此：

1. ✅ **HTTP 请求**（Query/Mutation）→ 通过 `/api/graphql` 代理
2. ❌ **WebSocket 连接**（Subscription）→ 无法通过 API Route 代理
3. ✅ **解决方案**：浏览器直接连接到远程 WebSocket 服务器

## 安全性

### CORS 配置要求

确保 Directus 服务器允许来自本地开发服务器的 WebSocket 连接：

**Directus `.env` 配置：**
```env
# 允许的跨域来源
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000,https://your-production-domain.com

# WebSocket 支持
WEBSOCKETS_ENABLED=true
WEBSOCKETS_GRAPHQL_SUBSCRIPTIONS=true
```

### 认证

WebSocket 连接使用相同的 JWT Token 进行认证：

```typescript
connectionParams: async () => {
  const token = TokenManager.getCurrentToken();
  return token ? { access_token: token } : {};
}
```

## 连接配置

### 保持活跃
```typescript
keepAlive: 30000 // 30秒发送一次 ping
```

### 自动重连
```typescript
retryAttempts: 5,
shouldRetry: () => true
```

### 连接事件监听
```typescript
on: {
  connected: () => console.log('WebSocket connected'),
  closed: () => console.log('WebSocket closed'),
  error: (error) => console.error('WebSocket error', error),
}
```

## 故障排除

### 1. WebSocket 连接失败

**检查 Directus 配置：**
```bash
# 进入 Directus 容器
docker exec -it directus /bin/sh

# 检查环境变量
env | grep WEBSOCKETS
env | grep CORS
```

**预期输出：**
```
WEBSOCKETS_ENABLED=true
WEBSOCKETS_GRAPHQL_SUBSCRIPTIONS=true
CORS_ENABLED=true
CORS_ORIGIN=http://localhost:3000
```

### 2. CORS 错误

如果看到浏览器控制台错误：
```
Access to WebSocket at 'wss://forge.kcbaotech.com/graphql' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**解决方案：**
1. 在 Directus 的 `.env` 文件中添加 `http://localhost:3000` 到 `CORS_ORIGIN`
2. 重启 Directus 服务器

### 3. 认证失败

如果订阅返回 401 错误：

1. 检查 Token 是否有效：
```javascript
console.log('Token:', TokenManager.getCurrentToken());
```

2. 检查 Directus 权限设置：
   - 确保用户角色有权限访问订阅
   - 确保 `orders` 集合允许订阅操作

### 4. 订阅无数据

如果 WebSocket 连接成功但没有数据：

1. 检查 Directus 实时功能是否启用
2. 检查用户权限是否正确配置
3. 验证 GraphQL 订阅语法是否正确

## 开发环境测试

### 1. 检查 WebSocket 连接状态

打开浏览器开发者工具 → Network → WS（WebSocket）

应该看到：
```
Status: 101 Switching Protocols
```

### 2. 监控 WebSocket 消息

在 Network → WS 标签中，选择连接，查看 Messages 面板

**连接握手：**
```json
{"type":"connection_init","payload":{"access_token":"eyJ..."}}
```

**订阅开始：**
```json
{"id":"1","type":"subscribe","payload":{"query":"subscription {...}"}}
```

**接收数据：**
```json
{"id":"1","type":"next","payload":{"data":{"orders_mutated":{...}}}}
```

## 生产环境部署

在生产环境中，确保：

1. ✅ Directus 和前端应用在同一域名下（或配置正确的 CORS）
2. ✅ 使用 HTTPS（WebSocket 将使用 WSS）
3. ✅ 配置反向代理（如 Nginx）支持 WebSocket 升级

**Nginx 配置示例：**
```nginx
location /graphql {
    proxy_pass http://directus:8055;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 性能优化

### 1. 连接复用
Apollo Client 自动复用 WebSocket 连接，多个订阅共享同一个连接。

### 2. 自动清理
组件卸载时自动取消订阅：
```typescript
useEffect(() => {
  const subscription = subscribeToMore(...);
  return () => subscription.unsubscribe();
}, []);
```

### 3. 错误恢复
自动重连机制确保网络波动时快速恢复。

## 监控

### 实时指示器组件

使用 `<RealtimeIndicator>` 组件显示连接状态：

```tsx
<RealtimeIndicator connected={connected} />
```

- 🟢 绿色：已连接
- 🔴 红色：未连接

## 相关文件

- `/src/lib/api/apollo-client.ts` - Apollo Client 配置（包括 WebSocket）
- `/src/hooks/useRealtimeOrders.ts` - 实时订单 Hook
- `/src/components/RealtimeIndicator.tsx` - 连接状态指示器
- `/src/graphql/orders-operations.graphql` - 订单订阅定义

## 参考资源

- [GraphQL Subscriptions](https://www.apollographql.com/docs/react/data/subscriptions/)
- [graphql-ws](https://github.com/enisdenjo/graphql-ws)
- [Directus Realtime](https://docs.directus.io/guides/real-time/subscriptions.html)
