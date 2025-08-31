# Expo 商品展示项目开发文档（基于 GraphQL 系统认证）

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

## 3. 主要功能模块实现建议

### 认证系统（基于 GraphQL 系统端点）
- **登录功能**：使用 `auth_login` mutation，支持双因素认证（OTP）
- **Token 管理**：自动刷新 token，使用 `auth_refresh` mutation
- **登出功能**：使用 `auth_logout` mutation 进行服务端登出
- **密码重置**：支持 `auth_password_request` 和 `auth_password_reset`
- **用户信息**：通过主 GraphQL 端点获取 `users_me` 信息

### 商品模块
- 商品列表页：展示商品卡片，支持下拉刷新与分页
- 商品详情页：展示图片、描述、价格等，支持图片预览
- 图片资源：本地 assets 或远程 URL

### 用户模块
- 登录页：表单输入，调用 GraphQL 认证 API，token 存储到 SecureStore
- 用户信息页：展示用户资料，支持编辑
- 双因素认证：支持 TFA 设置和验证

### 订单与支付
- 订单列表页：展示订单
- 支付页面：集成第三方支付 SDK（如支付宝、微信、Stripe）

### 分类与筛选
- 分类页：Tab 或 Picker 展示分类，筛选商品

### 文件上传
- 使用 expo-image-picker 选择图片，调用上传 API

### GraphQL 支持
- **双端点架构**：
  - 系统端点 (`/graphql/system`)：用于认证相关操作
  - 主端点 (`/graphql`)：用于业务数据查询
- Apollo Client 配置，支持自动 token 刷新
- 完整的 GraphQL 查询与 mutation 定义

## 4. GraphQL 认证流程

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

## 5. 平板适配建议
- 使用 SafeAreaView、ScrollView、Flex 布局
- 响应式样式：根据屏幕尺寸调整字体、图片大小
- 触控优化：按钮、图片支持手势操作

## 6. 迁移与对接建议
- **完全基于 GraphQL**：无需 REST API，统一使用 GraphQL 接口
- **双端点架构**：系统端点处理认证，主端点处理业务数据
- **自动 Token 管理**：Apollo Client 自动处理 token 刷新和错误重试
- **安全存储**：使用 SecureStore 安全存储敏感信息

## 7. API 端点映射
- 登录：`POST /api/auth` → GraphQL `auth_login`
- 刷新：`POST /api/auth/refresh` → GraphQL `auth_refresh`
- 登出：`POST /api/auth/logout` → GraphQL `auth_logout`
- 密码重置请求：`POST /api/auth/password-request` → GraphQL `auth_password_request`
- 密码重置：`POST /api/auth/password-reset` → GraphQL `auth_password_reset`
- 用户信息：主 GraphQL 端点 `users_me` query

---

如需某一模块详细实现方案或流程，请告知具体需求。
