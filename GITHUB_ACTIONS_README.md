# GitHub Actions 配置说明

## 🔧 修复的问题

### 1. 文件名不匹配
- ✅ 修复了 `docker-compose.yaml` → `docker-compose.yml`
- ✅ 添加了 `healthcheck.js` 到部署文件

### 2. 环境变量配置
- ✅ 使用变量替代硬编码的 IP 地址和用户名
- ✅ 支持动态 Docker 镜像标签

### 3. 安全性改进
- ✅ 移除硬编码的服务器信息
- ✅ 使用 GitHub Variables 管理敏感信息

### 4. 依赖问题
- ✅ 自动安装必要的工具 (`openssh-client`, `dos2unix`)

## 📋 需要配置的 GitHub Variables

在 GitHub 仓库设置中添加以下变量：

### Repository Variables (Settings → Secrets and variables → Actions → Variables)

| 变量名 | 描述 | 示例值 |
|--------|------|--------|
| `DOCKER_USERNAME` | Docker 镜像仓库用户名 | `yuanyuexiang` |
| `REMOTE_HOST` | 远程服务器 IP 地址 | `117.72.204.201` |
| `REMOTE_USER` | 远程服务器用户名 | `root` |

### Repository Secrets (Settings → Secrets and variables → Actions → Secrets)

| Secret 名 | 描述 |
|-----------|------|
| `DOCKER_PASSWORD` | Docker 镜像仓库密码 |
| `SSH_PRIVATE_KEY` | SSH 私钥（用于连接远程服务器） |

## 🚀 工作流程说明

### 构建阶段 (build-package)
1. 检出代码
2. 获取提交时间戳作为镜像标签
3. 登录 Docker 镜像仓库
4. 构建并推送 Docker 镜像
5. 上传部署文件到 artifact

### 部署阶段 (build-deploy)
1. 下载部署文件
2. 配置 SSH 连接到远程服务器
3. 创建 Docker Context
4. 使用新镜像部署应用
5. 清理旧镜像

## 🔄 Docker Compose 更新

现在支持环境变量：
```yaml
forge-app:
  image: ${DOCKER_IMAGE_TAG:-forge-app:latest}
```

这样可以在部署时动态指定镜像标签。

## ⚠️ 注意事项

1. **SSH 密钥格式**：确保 SSH 私钥是 OpenSSH 格式，不是 PuTTY 格式
2. **网络连接**：确保 GitHub Actions runner 可以访问你的远程服务器
3. **Docker 权限**：确保远程服务器用户有 Docker 操作权限
4. **端口开放**：确保服务器的 22 端口（SSH）和 3000 端口（应用）是开放的

## 🐛 故障排除

### SSH 连接失败
```bash
# 在本地测试 SSH 连接
ssh -i path/to/private_key user@remote_host

# 检查 SSH 密钥格式
ssh-keygen -l -f path/to/private_key
```

### Docker 镜像拉取失败
```bash
# 检查镜像是否存在
docker pull registry.cn-zhangjiakou.aliyuncs.com/yuanyuexiang/forge:tag

# 检查登录状态
docker login registry.cn-zhangjiakou.aliyuncs.com
```
