'use client';

import React from 'react';
import { Card, Button, Space, Row, Col, Tag, Typography, Alert } from 'antd';
import { ReloadOutlined, ApiOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function OfficialApproachPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>📚 Apollo 官方推荐的实时数据方法</Title>
      
      <Alert
        message="基于 Apollo 官方文档的最佳实践"
        description="根据官方文档：'在大多数情况下，您的客户端不应该使用订阅来与后端保持同步。相反，您应该间歇性地轮询查询，或者在用户执行相关操作时按需重新执行查询。'"
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      <Row gutter={[16, 16]}>
        {/* HTTP Multipart Subscriptions */}
        <Col xs={24} lg={12}>
          <Card 
            title="🔌 HTTP Multipart Subscriptions" 
            extra={<Tag color="green">推荐</Tag>}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>✨ 无需额外配置！</Text>
              <Paragraph>
                Apollo Client 提供了对 HTTP 多部分订阅的开箱即用支持。
                当使用 HttpLink 作为终端链接时，会自动处理订阅操作。
              </Paragraph>
              
              <div>
                <Text strong>优势：</Text>
                <ul>
                  <li>✅ 无需 WebSocket 配置</li>
                  <li>✅ 更好的云环境兼容性</li>
                  <li>✅ 自动错误处理和重连</li>
                  <li>✅ 与现有 HTTP 基础设施兼容</li>
                </ul>
              </div>

              <Button 
                type="primary" 
                icon={<ApiOutlined />}
                disabled
              >
                需要后端支持 HTTP Multipart
              </Button>
            </Space>
          </Card>
        </Col>

        {/* Polling Strategy */}
        <Col xs={24} lg={12}>
          <Card 
            title="🔄 智能轮询策略" 
            extra={<Tag color="blue">可靠</Tag>}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>📊 数据轮询查询</Text>
              <Paragraph>
                按设定间隔重新执行查询，适用于大多数实时数据需求。
                这是 Apollo 官方推荐的主要方法。
              </Paragraph>
              
              <div>
                <Text strong>特点：</Text>
                <ul>
                  <li>✅ 100% 兼容性</li>
                  <li>✅ 可控的网络负载</li>
                  <li>✅ 简单可靠</li>
                  <li>✅ 容易调试和监控</li>
                </ul>
              </div>

              <Button 
                type="default" 
                icon={<ClockCircleOutlined />}
                disabled
              >
                30秒间隔轮询
              </Button>
            </Space>
          </Card>
        </Col>

        {/* When to Use Subscriptions */}
        <Col xs={24}>
          <Card title="🎯 何时使用订阅">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <div style={{ padding: '16px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px' }}>
                  <Text strong style={{ color: '#52c41a' }}>✅ 适合使用订阅的场景</Text>
                  <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                    <li><Text strong>小幅增量更改</Text> - 对大型对象的小更新</li>
                    <li><Text strong>低延迟需求</Text> - 聊天应用、实时通知</li>
                    <li><Text strong>高频率变化</Text> - 股票价格、游戏状态</li>
                  </ul>
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                <div style={{ padding: '16px', background: '#fff2e8', border: '1px solid #ffbb96', borderRadius: '6px' }}>
                  <Text strong style={{ color: '#fa8c16' }}>⚠️ 优先考虑轮询的场景</Text>
                  <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                    <li><Text strong>一般业务数据</Text> - 用户列表、订单状态</li>
                    <li><Text strong>低频更新</Text> - 配置信息、商品信息</li>
                    <li><Text strong>云环境部署</Text> - WebSocket 连接不稳定</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Implementation Strategy */}
        <Col xs={24}>
          <Card title="🚀 实现策略">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>推荐的混合策略：</Text>
              
              <div style={{ padding: '16px', background: '#f0f5ff', border: '1px solid #adc6ff', borderRadius: '6px' }}>
                <Text strong>1. 优先尝试 HTTP Multipart Subscriptions</Text>
                <br />
                <Text type="secondary">
                  如果后端支持，使用 Apollo Client 的内置 HTTP 订阅功能
                </Text>
              </div>
              
              <div style={{ padding: '16px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px' }}>
                <Text strong>2. 回退到智能轮询</Text>
                <br />
                <Text type="secondary">
                  订阅不可用时自动切换到轮询，确保功能可用性
                </Text>
              </div>
              
              <div style={{ padding: '16px', background: '#fff7e6', border: '1px solid #ffd591', borderRadius: '6px' }}>
                <Text strong>3. 按需手动刷新</Text>
                <br />
                <Text type="secondary">
                  在用户操作后主动刷新数据，提供即时反馈
                </Text>
              </div>
            </Space>
          </Card>
        </Col>

        {/* Code Example */}
        <Col xs={24}>
          <Card title="💻 代码示例">
            <pre style={{ 
              background: '#f5f5f5', 
              padding: '16px', 
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '12px'
            }}>
{`// 1. 简化的 Apollo Client 配置
const client = new ApolloClient({
  link: httpLink,  // 单一 HTTP link，自动支持 subscriptions
  cache: new InMemoryCache()
});

// 2. 智能实时数据 Hook
const { data, loading, strategy, refresh } = useRealtimeData({
  query: PRODUCTS_QUERY,
  subscription: PRODUCTS_SUBSCRIPTION,  // 可选
  enablePolling: true,
  pollingInterval: 30000
});

// 3. 使用方式
<Button onClick={refresh}>手动刷新</Button>
<Tag color={strategy === 'subscription' ? 'green' : 'blue'}>
  {strategy === 'subscription' ? '订阅模式' : '轮询模式'}
</Tag>`}
            </pre>
          </Card>
        </Col>
      </Row>

      <Card 
        title="📖 总结" 
        style={{ marginTop: '24px' }}
        type="inner"
      >
        <Space direction="vertical">
          <Text strong>基于 Apollo 官方文档的最佳实践：</Text>
          <ol>
            <li><Text strong>首选轮询策略</Text> - 适用于大多数场景，简单可靠</li>
            <li><Text strong>考虑 HTTP Multipart Subscriptions</Text> - 如果后端支持，无需额外配置</li>
            <li><Text strong>谨慎使用 WebSocket</Text> - 仅在真正需要低延迟时使用</li>
            <li><Text strong>提供手动刷新</Text> - 让用户可以主动获取最新数据</li>
          </ol>
          
          <Alert
            message="关键建议"
            description="根据官方文档，WebSocket 订阅主要适用于聊天应用、实时通知等低延迟场景。对于一般的业务数据，轮询查询更加可靠和易于维护。"
            type="warning"
            showIcon
          />
        </Space>
      </Card>
    </div>
  );
}
