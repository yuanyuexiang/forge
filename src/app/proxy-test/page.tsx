'use client';

import React, { useState } from 'react';
import { Card, Button, Typography, Space, Alert } from 'antd';

const { Title, Text, Paragraph } = Typography;

export default function ProxyTestPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testDirectCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://forge.matrix-net.tech/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'query { __typename }'
        })
      });
      const result = await response.text();
      setTestResult(`直接调用结果: ${result.substring(0, 200)}...`);
    } catch (error) {
      setTestResult(`直接调用错误: ${error}`);
    }
    setIsLoading(false);
  };

  const testProxyCall = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'query { __typename }'
        })
      });
      const result = await response.text();
      setTestResult(`代理调用结果: ${result.substring(0, 200)}...`);
    } catch (error) {
      setTestResult(`代理调用错误: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>GraphQL 代理测试</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="代理配置说明"
          description="本地开发时，Apollo Client 应该使用 /api/graphql 代理端点，而不是直接请求 https://forge.matrix-net.tech/graphql"
          type="info"
          showIcon
        />

        <Card title="测试 GraphQL 端点">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Paragraph>
              <Text strong>当前 Apollo Client 配置:</Text><br/>
              <Text code>DIRECTUS_CONFIG.getGraphQLEndpoint() = "/api/graphql"</Text>
            </Paragraph>

            <Space>
              <Button 
                type="primary" 
                onClick={testProxyCall}
                loading={isLoading}
              >
                测试代理调用 (/api/graphql)
              </Button>
              
              <Button 
                onClick={testDirectCall}
                loading={isLoading}
              >
                测试直接调用 (forge.matrix-net.tech)
              </Button>
            </Space>

            {testResult && (
              <Card size="small" title="测试结果">
                <Text code style={{ fontSize: '12px' }}>
                  {testResult}
                </Text>
              </Card>
            )}
          </Space>
        </Card>

        <Card title="网络请求说明">
          <Space direction="vertical" size="small">
            <Text>• <strong>正确方式:</strong> 前端 → /api/graphql → Next.js 代理 → forge.matrix-net.tech</Text>
            <Text>• <strong>错误方式:</strong> 前端 → https://forge.matrix-net.tech/graphql (直接调用)</Text>
            <Text>• <strong>优势:</strong> 避免CORS问题，统一认证处理，支持本地开发和生产环境</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
}
