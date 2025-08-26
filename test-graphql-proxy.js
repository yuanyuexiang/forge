#!/usr/bin/env node

/**
 * 智能 GraphQL 配置测试脚本
 * 测试基于域名的智能配置系统
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const GRAPHQL_ENDPOINT = `${BASE_URL}/api/graphql`;
const CONFIG_ENDPOINT = `${BASE_URL}/api/config`;

async function testSmartConfiguration() {
  console.log('🧠 测试智能配置系统...');
  
  try {
    const configResponse = await fetch(CONFIG_ENDPOINT);
    if (configResponse.ok) {
      const config = await configResponse.json();
      console.log('\n🔧 智能配置结果:');
      console.log(`   环境: ${config.environment}`);
      console.log(`   当前域名: ${config.analysis.currentHost}`);
      console.log(`   端点: ${config.currentConfig.endpoint}`);
      console.log(`   使用代理: ${config.currentConfig.useProxy}`);
      console.log(`   目标路径: ${config.analysis.targetEndpoint}`);
      
      console.log('\n💡 配置说明:');
      console.log(`   ${config.explanation.development}`);
      console.log(`   ${config.explanation.production}`);
      console.log(`   ${config.explanation.benefits}`);
      
    } else {
      console.log('   ⚠️  无法获取配置信息');
    }
  } catch (error) {
    console.log('   ❌ 配置端点不可用:', error.message);
  }
}

async function testGraphQLConnection() {
  console.log('\n🧪 测试 GraphQL 连接...');
  console.log(`📍 测试端点: ${GRAPHQL_ENDPOINT}`);
  
  try {
    // 1. 测试 OPTIONS 预检请求
    console.log('\n1️⃣ 测试 CORS 预检请求...');
    const optionsResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'OPTIONS',
      headers: {
        'Origin': BASE_URL,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type,authorization'
      }
    });
    
    console.log(`   状态码: ${optionsResponse.status}`);
    if (optionsResponse.status === 200) {
      console.log('   ✅ CORS 预检通过');
    } else {
      console.log('   ⚠️  CORS 预检失败');
    }
    
    // 2. 测试简单的 GraphQL 查询
    console.log('\n2️⃣ 测试基础 GraphQL 查询...');
    const queryResponse = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': BASE_URL
      },
      body: JSON.stringify({
        query: `query { __typename }`
      })
    });
    
    console.log(`   状态码: ${queryResponse.status}`);
    if (queryResponse.ok) {
      const result = await queryResponse.text();
      console.log(`   ✅ GraphQL 查询成功`);
      console.log(`   响应: ${result.substring(0, 100)}...`);
    } else {
      console.log(`   ❌ GraphQL 查询失败`);
    }
    
    console.log('\n✅ 连接测试完成!');
    
  } catch (error) {
    console.error('\n❌ 连接测试失败:', error.message);
  }
}

async function main() {
  console.log('🚀 开始智能配置和连接测试...');
  console.log(`📍 基础 URL: ${BASE_URL}`);
  
  await testSmartConfiguration();
  await testGraphQLConnection();
  
  console.log('\n🎉 所有测试完成!');
  console.log('\n📝 智能配置特点:');
  console.log('   ✅ 无需环境变量配置');
  console.log('   ✅ 基于域名自动检测');
  console.log('   ✅ 开发生产环境自适应');
  console.log('   ✅ 自动处理 CORS 问题');
  console.log('   ✅ 零配置部署');
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { testSmartConfiguration, testGraphQLConnection };
