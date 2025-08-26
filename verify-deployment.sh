#!/bin/bash

# 部署后验证脚本
# 用于验证云端部署的应用是否正常工作

set -e

# 配置
FORGE_URL="${FORGE_URL:-https://forge.matrix-net.tech}"
DIRECTUS_URL="${DIRECTUS_URL:-https://directus.matrix-net.tech}"

echo "🚀 开始部署后验证..."
echo "📍 Forge URL: $FORGE_URL"
echo "📍 Directus URL: $DIRECTUS_URL"

# 1. 验证应用可访问性
echo ""
echo "1️⃣ 验证应用可访问性..."
response_code=$(curl -s -o /dev/null -w "%{http_code}" "$FORGE_URL" || echo "000")
if [ "$response_code" = "200" ]; then
    echo "✅ 应用可访问 (HTTP $response_code)"
else
    echo "❌ 应用不可访问 (HTTP $response_code)"
    exit 1
fi

# 2. 验证 GraphQL 代理的 OPTIONS 请求
echo ""
echo "2️⃣ 验证 GraphQL 代理 CORS 支持..."
options_response=$(curl -s -o /dev/null -w "%{http_code}" \
    -X OPTIONS \
    -H "Origin: $FORGE_URL" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: content-type,authorization" \
    "$FORGE_URL/api/graphql" || echo "000")

if [ "$options_response" = "200" ]; then
    echo "✅ GraphQL 代理 CORS 预检请求成功 (HTTP $options_response)"
else
    echo "❌ GraphQL 代理 CORS 预检请求失败 (HTTP $options_response)"
    exit 1
fi

# 3. 验证 GraphQL 代理基础查询
echo ""
echo "3️⃣ 验证 GraphQL 代理基础查询..."
graphql_response=$(curl -s -w "%{http_code}" \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Origin: $FORGE_URL" \
    -d '{"query": "query { __typename }"}' \
    "$FORGE_URL/api/graphql")

response_code=$(echo "$graphql_response" | tail -c 4)
response_body=$(echo "$graphql_response" | head -c -4)

if [ "$response_code" = "200" ]; then
    echo "✅ GraphQL 代理基础查询成功 (HTTP $response_code)"
    echo "   响应: $(echo "$response_body" | head -c 100)..."
else
    echo "❌ GraphQL 代理基础查询失败 (HTTP $response_code)"
    echo "   响应: $response_body"
    exit 1
fi

# 4. 验证直接 Directus 连接（确认问题已解决）
echo ""
echo "4️⃣ 验证直接 Directus CORS 问题..."
directus_options=$(curl -s -o /dev/null -w "%{http_code}" \
    -X OPTIONS \
    -H "Origin: $FORGE_URL" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: content-type,authorization" \
    "$DIRECTUS_URL/graphql" || echo "000")

if [ "$directus_options" = "405" ]; then
    echo "✅ 确认 Directus 直接连接存在 CORS 问题 (HTTP $directus_options) - 这是预期的"
    echo "   代理解决方案正常工作"
elif [ "$directus_options" = "200" ]; then
    echo "ℹ️  Directus 现在支持 CORS (HTTP $directus_options) - 可以考虑直接连接"
else
    echo "⚠️  Directus 连接状态不明 (HTTP $directus_options)"
fi

# 5. 检查健康检查端点（如果存在）
echo ""
echo "5️⃣ 检查健康检查端点..."
health_response=$(curl -s -o /dev/null -w "%{http_code}" "$FORGE_URL/api/health" || echo "404")
if [ "$health_response" = "200" ]; then
    echo "✅ 健康检查端点正常 (HTTP $health_response)"
elif [ "$health_response" = "404" ]; then
    echo "ℹ️  没有健康检查端点 (HTTP $health_response) - 这是正常的"
else
    echo "⚠️  健康检查端点异常 (HTTP $health_response)"
fi

echo ""
echo "🎉 部署后验证完成!"
echo ""
echo "📊 验证结果总结:"
echo "   ✅ 应用可访问性: 正常"
echo "   ✅ GraphQL 代理 CORS: 正常"
echo "   ✅ GraphQL 代理查询: 正常"
echo "   ✅ Directus CORS 问题: 已通过代理解决"
echo ""
echo "🔧 使用说明:"
echo "   1. 前端应用现在使用 /api/graphql 代理端点"
echo "   2. 避免了直接请求 $DIRECTUS_URL/graphql 的 CORS 问题"
echo "   3. 所有 GraphQL 请求都通过 Next.js 服务器代理"
echo "   4. 支持完整的 CORS 头部和预检请求"
