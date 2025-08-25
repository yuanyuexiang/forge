# Docker 部署说明

## 📁 文件说明

- `Dockerfile` - 生产环境容器配置（多阶段构建，优化后的镜像）
- `Dockerfile.dev` - 开发环境容器配置
- `docker-compose.yml` - Docker Compose 配置文件
- `.dockerignore` - Docker 构建时忽略的文件

## 🚀 使用方法

### 1. 构建生产镜像

```bash
# 构建 Docker 镜像
docker build -t forge-app .

# 运行容器
docker run -p 3000:3000 forge-app
```

### 2. 使用 Docker Compose (推荐)

```bash
# 启动生产环境
docker-compose up -d

# 启动开发环境
docker-compose --profile dev up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

### 3. 开发环境

```bash
# 构建开发镜像
docker build -f Dockerfile.dev -t forge-dev .

# 运行开发容器（带热重载）
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules forge-dev
```

## 🔧 配置说明

### 生产环境特性

- **多阶段构建**：分离依赖安装、构建和运行阶段
- **Alpine Linux**：轻量级基础镜像，减少镜像大小
- **Standalone 输出**：Next.js 自包含输出，包含所有必要的依赖
- **非 root 用户**：安全的容器运行环境
- **优化的层缓存**：加快重复构建速度

### 环境变量

- `NODE_ENV=production` - 生产环境模式
- `NEXT_TELEMETRY_DISABLED=1` - 禁用 Next.js 遥测
- `PORT=3000` - 应用端口
- `HOSTNAME=0.0.0.0` - 监听所有网络接口

## 📋 构建优化

1. **忽略构建错误**：在 `next.config.ts` 中配置忽略 ESLint 和 TypeScript 错误
2. **Standalone 输出**：自动包含运行时所需的最小依赖
3. **静态资源处理**：正确复制和权限设置

## 🐛 故障排除

### 构建失败
```bash
# 查看构建日志
docker build --no-cache -t forge-app .

# 进入容器调试
docker run -it --entrypoint sh forge-app
```

### 运行时问题
```bash
# 查看容器日志
docker logs <container-id>

# 进入运行中的容器
docker exec -it <container-id> sh
```

## 📈 生产部署建议

1. **使用镜像标签**：`docker build -t forge-app:v1.0.0 .`
2. **环境变量管理**：使用 `.env` 文件或 K8s ConfigMap
3. **健康检查**：添加 Docker 健康检查
4. **资源限制**：设置内存和 CPU 限制
5. **日志管理**：配置日志收集和轮转
