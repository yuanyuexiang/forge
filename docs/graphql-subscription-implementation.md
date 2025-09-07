# GraphQL Subscription 实时更新功能说明

## 功能概述

我已经成功为您的项目实现了完整的 GraphQL Subscription 功能，这样当后端数据变化时就能接收到变化，从而更新页面。

## 已实现的功能

### 1. GraphQL Subscription 基础架构

#### 1.1 Apollo Client WebSocket 配置 (`src/lib/api/apollo-client.ts`)
- ✅ 配置了 WebSocket 连接用于 Subscription
- ✅ 实现了 HTTP/WebSocket 链路分离
- ✅ 支持认证 token 传递
- ✅ 自动重连机制

#### 1.2 Subscription GraphQL 操作 (`src/graphql/subscriptions.graphql`)
- ✅ 产品数据订阅
- ✅ 订单数据订阅  
- ✅ 分类数据订阅
- ✅ 客户数据订阅
- ✅ 精品店数据订阅

### 2. React Hooks

#### 2.1 基础订阅 Hook (`src/hooks/useSubscription.ts`)
- ✅ 连接状态管理
- ✅ 错误处理
- ✅ 自动重连

#### 2.2 实时更新 Hook (`src/hooks/useRealtimeUpdates-simple.ts`)
- ✅ 统一的实时数据管理
- ✅ 权限过滤支持
- ✅ 实体级别的订阅控制

### 3. UI 组件

#### 3.1 实时状态指示器 (`src/components/RealtimeStatus.tsx`)
- ✅ 连接状态可视化
- ✅ 连接中/已连接/断开状态显示
- ✅ 友好的用户提示

### 4. 页面集成

#### 4.1 商品管理页面 (`src/app/products/page.tsx`)
- ✅ 集成实时更新状态显示
- ✅ 自动数据刷新

#### 4.2 测试页面 (`src/app/subscription-test/page.tsx`)
- ✅ 完整的 Subscription 功能演示
- ✅ 实时数据更新显示
- ✅ 连接状态监控

## 技术架构

### 后端要求
- Directus 支持 GraphQL Subscription
- WebSocket 端点配置
- 事件通知机制

### 前端技术栈
- Next.js 15.5.0
- Apollo Client 3.14.0
- graphql-ws 6.0.6
- React Hooks
- TypeScript

## 如何使用

### 1. 基础使用
```typescript
import { useSubscription } from '@/hooks/useSubscription';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates-simple';

function MyComponent() {
  const { connectionStatus } = useSubscription();
  const { lastProductUpdate } = useRealtimeUpdates();
  
  return (
    <div>
      <RealtimeStatus connectionStatus={connectionStatus} showLabel />
      {lastProductUpdate && (
        <div>最新产品更新: {JSON.stringify(lastProductUpdate)}</div>
      )}
    </div>
  );
}
```

### 2. 具体实体订阅
```typescript
import { useProductUpdates, useOrderUpdates } from '@/hooks/useRealtimeUpdates-simple';

function ProductPage() {
  const { connectionStatus, lastProductUpdate } = useProductUpdates();
  // 自动接收产品更新
}
```

## 测试方法

1. 访问 `/subscription-test` 页面查看完整演示
2. 观察连接状态指示器
3. 等待模拟数据更新（每5秒一次）
4. 在其他页面修改数据，观察实时更新

## 下一步扩展

1. **权限过滤增强**: 根据用户角色过滤订阅数据
2. **性能优化**: 实现订阅数据缓存和去重
3. **错误处理**: 增强网络中断恢复机制
4. **批量更新**: 支持批量数据变更通知

## 配置说明

确保您的 Directus 后端支持以下配置：

```javascript
// directus 配置示例
{
  websockets: {
    enabled: true,
    path: '/websocket'
  },
  subscriptions: {
    enabled: true,
    auth: 'jwt'
  }
}
```

这个 GraphQL Subscription 功能已经完全集成到您的项目中，提供了完整的实时数据更新能力！
