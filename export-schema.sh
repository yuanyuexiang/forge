#!/bin/bash

# Directus 配置
DIRECTUS_URL="https://directus.matrix-net.tech"
EMAIL="tom.nanjing@gmail.com"
PASSWORD="sual116y"

# 临时文件
TOKEN_FILE="directus_token.json"
SCHEMA_FILE="schema.graphql"

echo "🔑 登录 Directus 获取 Token..."
curl -s -X POST "$DIRECTUS_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" > $TOKEN_FILE

ACCESS_TOKEN=$(jq -r '.data.access_token' $TOKEN_FILE)

if [ "$ACCESS_TOKEN" == "null" ] || [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ 获取 Token 失败，请检查邮箱/密码"
  exit 1
fi

echo "✅ 已获取 Token"

echo "📥 导出 GraphQL Schema..."
npx get-graphql-schema "$DIRECTUS_URL/graphql" \
  -h "Authorization=Bearer $ACCESS_TOKEN" > $SCHEMA_FILE

if [ $? -eq 0 ]; then
  echo "🎉 导出成功: $SCHEMA_FILE"
else
  echo "❌ 导出失败"
  exit 1
fi
