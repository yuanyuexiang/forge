# Apollo 官方实时数据方案重构

## 概述

基于 Apollo 官方文档的建议，我们将复杂的 WebSocket + SSE 实时数据实现替换为简单可靠的轮询方案。

> "在大多数情况下，您的客户端不应该使用订阅来与后端保持同步。相反，您应该间歇性地轮询查询"
> — Apollo GraphQL 官方文档

## 重构内容

### 删除的复杂实现
- ❌ 复杂的 WebSocket 链路配置
- ❌ SSE (Server-Sent Events) 实现  
- ❌ 多层混合实时更新 hooks
- ❌ graphql-ws 依赖
- ❌ 复杂的连接状态管理

### 新的简化架构

#### 1. 简化的 Apollo Client (`src/lib/api/apollo-client.ts`)
```typescript
// 单一 HTTP 链路处理所有操作
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_DIRECTUS_URL + '/graphql',
});

// 简单的认证和错误处理
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({ /* 优化的缓存策略 */ })
});
```

#### 2. 官方实时数据 Hook (`src/hooks/useRealtimeDataOfficial.ts`)
```typescript
export function useRealtimeProducts(variables) {
  return useRealtimeData({
    query: GetProductsDocument,
    variables,
    pollingInterval: 30000,  // 30秒轮询
    enablePolling: true,
    enableSubscription: false
  });
}
```

#### 3. 实时状态仪表板 (`src/app/realtime-dashboard/page.tsx`)
- 显示当前实时数据策略
- 展示最后更新时间
- 提供手动刷新功能
- 实时状态监控

## 技术优势

### 🎯 可靠性提升
- HTTP 连接比 WebSocket 更稳定
- 避免了网络代理和防火墙问题
- 移动网络环境下表现更好

### ⚡ 性能优化
- HTTP/2 多路复用使轮询高效
- Apollo Cache 提供本地状态管理
- 减少了复杂的状态同步逻辑

### 🔧 维护简化
- 移除了 225 行复杂的 Apollo Client 配置
- 简化为 90 行清晰的 HTTP 配置
- 减少了第三方依赖项

### 📱 兼容性改善
- 统一的 HTTP 协议处理
- 自动降级和错误恢复
- 更好的云环境兼容性

## 使用方式

### 在页面中使用实时数据
```typescript
import { useRealtimeProducts } from '@/hooks/useRealtimeDataOfficial';

function ProductsPage() {
  const { 
    data, 
    loading, 
    error, 
    strategy, 
    lastUpdateTime,
    refresh 
  } = useRealtimeProducts({ userId });

  // 数据会每30秒自动更新，或手动调用 refresh()
}
```

### 配置选项
```typescript
const options = {
  pollingInterval: 30000,      // 轮询间隔
  enablePolling: true,         // 启用轮询
  enableSubscription: false,   // 禁用订阅（可选）
  onDataChange: (data) => {},  // 数据变化回调
  onError: (error) => {}       // 错误处理回调
};
```

## 迁移记录

### 备份文件
- `src/lib/api/apollo-client-complex-backup.ts` - 原复杂配置备份

### 已删除文件
- `src/hooks/useRealtimeSync.ts`
- `src/hooks/useFinalRealtimeUpdates.ts`  
- `src/hooks/useHybridRealtimeUpdates.ts`
- `src/app/test-*` 相关测试页面
- `src/app/api/subscription-test/` 等测试 API

### 新增文件
- `src/hooks/useRealtimeDataOfficial.ts` - 官方实时数据 hook
- `src/app/realtime-dashboard/page.tsx` - 实时状态仪表板
- `src/app/official-approach/page.tsx` - 文档说明页面

## 测试验证

1. ✅ 应用正常启动 (http://localhost:3000)
2. ✅ 产品页面实时数据正常
3. ✅ 实时仪表板显示策略状态
4. ✅ 手动刷新功能正常
5. ✅ 错误处理和降级机制正常

## 未来扩展

如果需要真正的实时功能，可以：
1. 启用 `enableSubscription: true`
2. 配置 HTTP Multipart Subscriptions
3. 使用 Apollo 内置的订阅支持

但根据官方建议，轮询已经能满足大多数实时需求。
