# 认证系统详解

## 🔐 为什么登录没有直接使用Apollo Client？

你观察得很敏锐！登录请求确实是 `POST /api/auth` 而不是直接使用Apollo Client。让我解释原因：

## 📊 当前认证架构

### 登录流程
```
前端 → POST /api/auth → fetch() → Directus /graphql/system → auth_login mutation
```

### 为什么这样设计？

#### 1. **Schema分离**
```typescript
// 认证端点（特殊）
DIRECTUS_CONFIG.GRAPHQL_SYSTEM_URL = 'https://directus.matrix-net.tech/graphql/system'

// 业务数据端点（常规）
DIRECTUS_CONFIG.GRAPHQL_URL = 'https://directus.matrix-net.tech/graphql'
```

#### 2. **认证专用Mutations**
常规GraphQL schema中没有认证相关的fields：
- ❌ `auth_login` - 不在常规schema中
- ❌ `users_me` - 不在常规schema中  
- ❌ `auth_refresh` - 不在常规schema中

#### 3. **循环依赖问题**
```typescript
// 问题：Apollo Client需要token，但token来自登录
const authLink = setContext(() => {
  const token = localStorage.getItem('authToken'); // 需要先登录获取
  return { headers: { authorization: `Bearer ${token}` } };
});
```

## ✅ 当前实现（正确的）

### `/api/auth/route.ts`
```typescript
// 已经在使用GraphQL！
const response = await fetch(DIRECTUS_CONFIG.GRAPHQL_SYSTEM_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: AUTH_QUERIES.LOGIN,  // GraphQL mutation
    variables: { email, password },
  }),
});
```

### AUTH_QUERIES.LOGIN
```graphql
mutation AuthLogin($email: String!, $password: String!) {
  auth_login(email: $email, password: $password) {
    access_token
    refresh_token
  }
}
```

## 🔄 实际上登录IS USING GraphQL

从你的日志可以看到：
```
Directus Auth - 使用官方 GraphQL 认证: tom.nanjing@gmail.com
Directus Auth - GraphQL 响应: { status: 200, hasData: true, hasErrors: false }
GraphQL 认证完全成功！
```

## 🎯 为什么不用Apollo Client做认证？

### 技术原因
1. **端点不同**: 认证用`/graphql/system`，数据用`/graphql`
2. **Schema不同**: 认证schema有特殊的mutations
3. **时序问题**: 需要token才能配置Apollo Client

### 设计考虑
- 🔒 **安全性**: 认证逻辑在服务端处理
- 🚀 **性能**: 避免额外的客户端配置
- 🛠️ **维护性**: 集中的认证处理

## 💡 如果真的想用Apollo Client做认证

可以创建两个Apollo Client实例：

```typescript
// 1. 认证专用（无token）
const authClient = new ApolloClient({
  uri: '/api/auth-graphql',  // 代理到/graphql/system
  cache: new InMemoryCache()
});

// 2. 业务数据（需要token）  
const dataClient = new ApolloClient({
  uri: '/api/graphql',
  headers: { authorization: `Bearer ${token}` },
  cache: new InMemoryCache()
});
```

## 🏆 推荐方案

**当前的实现是正确的**：
- ✅ 认证使用GraphQL（通过服务端fetch）
- ✅ 业务数据使用Apollo Client
- ✅ 避免了复杂的客户端认证配置
- ✅ 更好的安全性和可维护性

## 📈 总结

你的登录**确实在使用GraphQL**，只是通过服务端代理而不是直接的Apollo Client。这是一个明智的架构选择，平衡了GraphQL的优势和认证的特殊需求。

如果你想统一使用Apollo Client，我可以帮你实现，但当前的方案已经很优秀了！
