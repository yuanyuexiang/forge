# Expo 商品展示项目开发文档（基于完整业务模型）

## 1. 技术选型
- 框架：Expo（React Native）
- UI 库：可选 React Native Paper、Ant Design Mobile RN 或 NativeBase
- 网络请求：推荐 Apollo Client（对接 GraphQL），或 axios/fetch（对接 REST）
- 状态管理：React Context、Redux Toolkit 或 Zustand
- 图片处理：expo-image、expo-media-library
- 认证：基于 GraphQL 系统端点的 JWT 认证，结合 SecureStore 存储 token

## 2. 目录结构建议
- `/src/components`：公共组件
- `/src/screens`：页面（商品列表、详情、登录等）
- `/src/graphql`：GraphQL 查询与接口
- `/src/api`：网络请求封装
- `/src/utils`：工具函数
- `/src/assets`：图片、图标等静态资源
- `/src/navigation`：路由导航
- `/src/store`：状态管理

## 3. 业务模型架构

### 核心实体关系
- **Boutiques（商铺）**: 商家店铺信息，包含评星、状态、图片等
- **Categories（分类）**: 商品分类体系
- **Products（商品）**: 核心商品信息，关联商铺和分类
- **Users（用户）**: 客户信息
- **Orders（订单）**: 用户订单主表
- **Order Items（订单项）**: 订单明细，关联商品和数量
- **Payments（支付）**: 支付记录，关联订单

### 数据关系
```
Boutiques (1) ← (N) Products (N) → (1) Categories
Users (1) ← (N) Orders (1) ← (N) Order Items (N) → (1) Products  
Orders (1) ← (N) Payments
```

## 4. 主要功能模块实现建议

### 认证系统（基于 GraphQL 系统端点）
- **登录功能**：使用 `auth_login` mutation，支持双因素认证（OTP）
- **Token 管理**：自动刷新 token，使用 `auth_refresh` mutation
- **登出功能**：使用 `auth_logout` mutation 进行服务端登出
- **密码重置**：支持 `auth_password_request` 和 `auth_password_reset`
- **用户信息**：通过主 GraphQL 端点获取 `users_me` 信息

### 店铺管理系统（管理员功能）
- **店铺列表管理**：展示所有店铺，支持状态筛选、评星筛选、搜索
- **店铺详情管理**：查看和编辑店铺基本信息、图片、排序
- **店铺状态控制**：激活、停用、暂停店铺，批量状态更新
- **店铺商品管理**：查看店铺下所有商品，统计分析
- **店铺订单管理**：查看店铺相关订单，销售统计
- **店铺业绩分析**：销售数据、商品统计、月度趋势
- **批量操作**：支持批量更新状态、批量删除等

### 店铺展示系统（用户端）
- **店铺列表页**：展示所有店铺，支持评星筛选、状态筛选
- **店铺详情页**：展示店铺信息、图片轮播、商品列表
- **店铺搜索**：支持按名称、评星等条件搜索
- **店铺排行**：按评星、销量等维度排序

### 商品模块
- **商品列表页**：支持分类筛选、价格排序、销量排序、评分筛选
- **商品详情页**：展示商品图片轮播、视频、详细信息、评价等
- **商品搜索**：支持关键词搜索、条码扫描
- **促销标识**：显示是否特价（is_on_sale）、市场价对比
- **店铺关联**：显示商品所属店铺信息

### 分类模块
- **分类浏览**：树形或网格展示商品分类
- **分类筛选**：在商品列表中按分类筛选

### 购物车与订单模块
- **购物车功能**：本地存储商品选择，计算总价
- **下单流程**：创建订单和订单项
- **订单列表**：展示用户历史订单，支持状态筛选
- **订单详情**：显示订单项、总价、支付状态

### 支付模块
- **支付页面**：集成第三方支付 SDK（支付宝、微信、Stripe）
- **支付状态**：实时更新支付结果
- **支付历史**：查看支付记录

### 用户模块
- **用户注册登录**：基于 GraphQL 认证系统
- **用户资料**：查看和编辑个人信息
- **双因素认证**：支持 TFA 设置和验证

## 5. 关键页面设计

### 管理端页面（店铺管理）

#### 店铺管理总览页
- 店铺统计卡片：总数量、活跃数量、平均评星
- 店铺列表表格：名称、评星、状态、创建时间、操作
- 筛选条件：状态、评星范围、创建时间
- 批量操作：批量激活、停用、删除
- 搜索功能：按店铺名称搜索

#### 店铺详情管理页
- 基本信息编辑：名称、描述、状态、评星
- 图片管理：主图片、轮播图片上传和排序
- 商品管理：店铺下商品列表、添加/移除商品
- 销售数据：销量统计、订单统计、收入分析
- 操作日志：创建、更新、状态变更记录

#### 店铺商品管理页
- 商品列表：显示店铺下所有商品
- 商品状态统计：发布、草稿、下架数量
- 批量操作：批量上架、下架、调整价格
- 商品筛选：按状态、分类、价格区间

#### 店铺订单管理页
- 订单列表：显示涉及该店铺商品的订单
- 销售统计：订单数量、销售额、平均客单价
- 时间筛选：按日、周、月查看数据
- 导出功能：导出订单数据和统计报表

### 用户端页面（商品展示）

#### 首页
- 推荐店铺轮播
- 热门分类网格
- 精选商品列表
- 搜索入口

#### 店铺列表页
- 店铺卡片：图片、名称、评星、简介
- 筛选条件：评星、状态
- 排序选项：评星、创建时间、名称
- 无限滚动加载

#### 店铺详情页
- 店铺头部：主图片、名称、评星、简介
- 店铺图片轮播
- 商品分类导航
- 店铺商品列表
- 店铺统计：商品数量、销量等

#### 商品列表页
- 筛选条件：分类、价格区间、评分、店铺
- 排序选项：价格、销量、评分、上架时间
- 店铺信息显示：在商品卡片中显示所属店铺
- 无限滚动加载

#### 商品详情页
- 图片/视频轮播
- 基本信息：名称、价格、副标题、品牌
- 店铺信息卡片：名称、评星、链接到店铺页
- 库存状态
- 立即购买/加入购物车按钮

#### 订单管理页
- 订单状态筛选：全部、待付款、已付款、已发货、已完成
- 订单卡片：商品图片、名称、数量、总价、店铺信息
- 操作按钮：查看详情、付款、确认收货

## 6. GraphQL 认证流程

### 登录流程
1. 用户输入邮箱、密码（可选 OTP）
2. 调用 `auth_login` mutation（系统端点）
3. 获取 `access_token` 和 `refresh_token`
4. 使用 `access_token` 调用 `users_me` query（主端点）
5. 存储 token 到 SecureStore，用户信息到状态管理

### Token 刷新流程
1. 检测 token 即将过期（提前 5 分钟）
2. 调用 `auth_refresh` mutation（系统端点）
3. 更新存储的 token

### 登出流程
1. 调用 `auth_logout` mutation（系统端点）
2. 清除本地存储的 token 和用户信息

## 7. 平板适配建议
- **响应式布局**：使用 Flex 布局适配不同屏幕尺寸
- **图片优化**：根据屏幕密度加载合适分辨率的图片
- **触控体验**：放大按钮和可点击区域
- **横屏适配**：商品详情页支持横屏浏览

## 8. 性能优化建议
- **图片懒加载**：商品列表使用懒加载
- **分页加载**：大列表使用分页或无限滚动
- **缓存策略**：Apollo Client 缓存商品和分类数据
- **预加载**：预加载热门商品和分类

## 9. 迁移与对接建议
- **完全基于 GraphQL**：无需 REST API，统一使用 GraphQL 接口
- **双端点架构**：系统端点处理认证，主端点处理业务数据
- **自动 Token 管理**：Apollo Client 自动处理 token 刷新和错误重试
- **安全存储**：使用 SecureStore 安全存储敏感信息

## 10. API 端点映射

### 认证相关
- 登录：`POST /api/auth` → GraphQL `auth_login`
- 刷新：`POST /api/auth/refresh` → GraphQL `auth_refresh`
- 登出：`POST /api/auth/logout` → GraphQL `auth_logout`

### 店铺管理相关（管理员）
- 店铺列表：`GET /api/admin/boutiques` → GraphQL `boutiques` query
- 创建店铺：`POST /api/admin/boutiques` → GraphQL `create_boutiques_item` mutation
- 批量操作：`PATCH /api/admin/boutiques` → GraphQL batch mutations
- 店铺详情：`GET /api/admin/boutiques/{id}` → GraphQL `boutiques_by_id` query
- 更新店铺：`PUT /api/admin/boutiques/{id}` → GraphQL `update_boutiques_item` mutation
- 删除店铺：`DELETE /api/admin/boutiques/{id}` → GraphQL `delete_boutiques_item` mutation
- 店铺商品：`GET /api/admin/boutiques/{id}/products` → GraphQL `products` query
- 店铺订单：`GET /api/admin/boutiques/{id}/orders` → GraphQL `order_items` query

### 业务数据（用户端）
- 商品列表：GraphQL `products` query
- 商品详情：GraphQL `products_by_id` query
- 分类列表：GraphQL `categories` query
- 店铺列表：GraphQL `boutiques` query
- 店铺详情：GraphQL `boutiques_by_id` query
- 订单管理：GraphQL `orders` 相关 queries/mutations
- 支付记录：GraphQL `payments` 相关 queries/mutations

---

如需某一模块详细实现方案或流程，请告知具体需求。
