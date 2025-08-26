#!/usr/bin/env node

/**
 * GraphQL 代理测试脚本
 * 用于测试生产环境中的 GraphQL 代理是否正常工作
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const GRAPHQL_ENDPOINT = `${BASE_URL}/api/graphql`;

async function testGraphQLProxy() {
  console.log('🧪 测试 GraphQL 代理...');
  console.log(`📍 测试端点: ${GRAPHQL_ENDPOINT}`);
  
  try {
    // 1. 测试 OPTIONS 预检请求
    console.log('\n1️⃣ 测试 OPTIONS 预检请求...');
    const optionsResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://forge.matrix-net.tech',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type,authorization'
      }
    });
    
    console.log(`   状态码: ${optionsResponse.status}`);
    console.log(`   CORS 头部:`);
    console.log(`     Allow-Origin: ${optionsResponse.headers.get('Access-Control-Allow-Origin')}`);
    console.log(`     Allow-Methods: ${optionsResponse.headers.get('Access-Control-Allow-Methods')}`);
    console.log(`     Allow-Headers: ${optionsResponse.headers.get('Access-Control-Allow-Headers')}`);
    
    if (optionsResponse.status !== 200) {
      throw new Error(`OPTIONS 请求失败: ${optionsResponse.status}`);
    }
    
    // 2. 测试简单的 GraphQL 查询
    console.log('\n2️⃣ 测试基础 GraphQL 查询...');
    const queryResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://forge.matrix-net.tech'
      },
      body: JSON.stringify({
        query: `query { __typename }`
      })
    });
    
    console.log(`   状态码: ${queryResponse.status}`);
    const queryResult = await queryResponse.text();
    console.log(`   响应: ${queryResult.substring(0, 200)}${queryResult.length > 200 ? '...' : ''}`);
    
    // 3. 测试认证查询（如果有token）
    const token = process.env.TEST_TOKEN;
    if (token) {
      console.log('\n3️⃣ 测试认证查询...');
      const authResponse = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Origin': 'https://forge.matrix-net.tech'
        },
        body: JSON.stringify({
          query: `query { users_me { id email } }`
        })
      });
      
      console.log(`   状态码: ${authResponse.status}`);
      const authResult = await authResponse.text();
      console.log(`   响应: ${authResult.substring(0, 200)}${authResult.length > 200 ? '...' : ''}`);
    } else {
      console.log('\n3️⃣ 跳过认证测试 (没有提供 TEST_TOKEN)');
    }
    
    console.log('\n✅ GraphQL 代理测试完成!');
    
  } catch (error) {
    console.error('\n❌ GraphQL 代理测试失败:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  testGraphQLProxy();
}

module.exports = { testGraphQLProxy };
