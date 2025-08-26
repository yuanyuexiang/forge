# GraphQL 订单和支付管理实现

## 概述

已成功将订单管理和支付管理页面从传统的 REST API 调用迁移到 GraphQL 实现，与商品管理保持一致的架构模式。

## 实现的功能

### 📦 订单管理 (OrdersContentGraphQL)

**查询功能：**
- ✅ 获取所有订单列表 (`useGetOrdersQuery`)
- ✅ 获取订单详情和订单项 (`useGetOrderItemsQuery`)
- ✅ 实时搜索和过滤

**变更功能：**
- ✅ 更新订单状态 (`useUpdateOrderStatusMutation`)
- ✅ 支持状态：pending, processing, completed, cancelled

**界面特性：**
- 📊 统计卡片：总订单数、待处理、已完成、总收入
- 🔍 搜索：订单ID、用户名、邮箱、状态
- 📋 详情弹窗：完整订单信息和商品列表
- 🏷️ 状态管理：可视化状态更新

### 💳 支付管理 (PaymentsContentGraphQL)

**查询功能：**
- ✅ 获取所有支付记录 (`useGetPaymentsQuery`)
- ✅ 按订单ID查询支付 (`useGetPaymentsByOrderId`)
- ✅ 多维度筛选和搜索

**变更功能：**
- ✅ 更新支付状态 (`useUpdatePaymentStatusMutation`)
- ✅ 支持状态：pending, processing, completed, failed, cancelled

**界面特性：**
- 📊 统计卡片：总支付数、待支付、支付成功、总收款
- 🔍 搜索：支付ID、订单ID、用户信息
- 🏷️ 状态筛选：按支付状态过滤
- 💰 支付方式：信用卡、支付宝、微信支付等

## 技术架构

### GraphQL 操作文件

**订单操作** (`orders-operations.graphql`)：
```graphql
query GetOrders
query GetOrderById
query GetOrderItems
mutation CreateOrder
mutation UpdateOrder
mutation DeleteOrder
mutation UpdateOrderStatus
```

**支付操作** (`payments-operations.graphql`)：
```graphql
query GetPayments
query GetPaymentById
query GetPaymentsByOrderId
mutation CreatePayment
mutation UpdatePayment
mutation DeletePayment
mutation UpdatePaymentStatus
```

### 类型安全

- 🎯 自动生成的 TypeScript 类型
- 📝 完整的类型检查和智能提示
- 🔒 编译时错误检测

### 统一架构

与商品管理保持一致：
- 🧩 相同的组件结构和命名规范
- 🎨 统一的 UI 组件和样式
- 📡 相同的 GraphQL 模式和错误处理
- ⚡ 一致的性能优化策略

## 数据模型

### 订单 (Orders)
```typescript
type Order = {
  id: string
  user_id: User
  total_price: number
  status: string
  created_at: string
  updated_at: string
}
```

### 订单项 (Order Items)
```typescript
type OrderItem = {
  id: string
  order_id: Order
  product_id: Product
  quantity: number
  price: number
}
```

### 支付 (Payments)
```typescript
type Payment = {
  id: string
  order_id: Order
  payment_method: string
  amount: number
  status: string
  paid_at: string
}
```

## 使用方式

### 页面集成

**订单页面** (`/orders`)：
```tsx
import OrdersContentGraphQL from '../components/OrdersContentGraphQL';

// 替换原有的 OrdersContent
<OrdersContentGraphQL />
```

**支付页面** (`/payments`)：
```tsx
import PaymentsContentGraphQL from '../components/PaymentsContentGraphQL';

// 替换原有的 PaymentsContent
<PaymentsContentGraphQL />
```

### GraphQL 查询示例

```tsx
// 查询订单
const { data, loading, error } = useGetOrdersQuery();

// 更新订单状态
const [updateStatus] = useUpdateOrderStatusMutation({
  onCompleted: () => message.success('更新成功'),
  onError: (error) => message.error('更新失败')
});
```

## 优势

### 🚀 性能优化
- 精确字段查询，减少数据传输
- Apollo Client 缓存机制
- 自动重复请求去重

### 🛡️ 类型安全
- 编译时类型检查
- 自动生成类型定义
- IntelliSense 支持

### 🔧 开发体验
- 统一的 API 接口
- 清晰的错误处理
- 一致的命名规范

### 📱 用户体验
- 实时数据更新
- 响应式设计
- 流畅的交互

## 文件结构

```
src/
├── app/
│   ├── graphql/
│   │   ├── orders-operations.graphql     # 订单 GraphQL 操作
│   │   └── payments-operations.graphql   # 支付 GraphQL 操作
│   ├── components/
│   │   ├── OrdersContentGraphQL.tsx      # 订单管理组件
│   │   └── PaymentsContentGraphQL.tsx    # 支付管理组件
│   ├── orders/
│   │   └── page.tsx                      # 订单页面
│   └── payments/
│       └── page.tsx                      # 支付页面
└── generated/
    └── graphql.ts                        # 自动生成的类型和 hooks
```

## 后续扩展

可以继续添加的功能：

### 订单管理
- 📦 批量操作订单
- 📧 订单通知系统
- 📈 订单分析报表
- 🔄 订单退换货流程

### 支付管理
- 💰 退款处理
- 📊 支付统计分析
- 🔔 支付异常监控
- 🧾 对账和清算

### 通用功能
- 📤 数据导出
- 🔍 高级搜索
- 📱 移动端适配
- 🌐 国际化支持

## 总结

✅ **已完成**：订单管理和支付管理的 GraphQL 实现
✅ **已验证**：构建成功，类型检查通过
✅ **已统一**：与商品管理保持一致的架构模式
✅ **已优化**：性能、类型安全、开发体验全面提升

现在整个管理系统的核心业务模块（商品、订单、支付）都已经使用 GraphQL 实现，提供了一致的开发体验和用户体验。
