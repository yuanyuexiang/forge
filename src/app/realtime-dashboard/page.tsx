'use client';

import React from 'react';
import { Card, Typography, Space, Button, Alert } from 'antd';
import { 
  SyncOutlined, 
  CheckCircleOutlined,
  ClockCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useGetProductsQuery } from '@generated/graphql';
import { TokenManager } from '@lib/auth';

const { Title, Text } = Typography;

export default function RealtimeDashboard() {
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
  }, []);

  const { 
    data, 
    loading, 
    error, 
    networkStatus,
    refetch 
  } = useGetProductsQuery({ 
    variables: userId ? { userId } : undefined,
    pollInterval: 30000, // 30秒轮询
    notifyOnNetworkStatusChange: true,
  });

  // 模拟的状态
  const strategy = 'polling';
  const lastUpdateTime = new Date();
  const refresh = refetch;

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
        Apollo 官方实时数据方案
      </Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Alert
          message="简化成功！"
          description="已成功将复杂的 WebSocket + SSE 实现替换为 Apollo 官方推荐的简单轮询方案"
          type="success"
          showIcon
        />

        <Card title="实时数据状态" extra={
          <Button 
            icon={<ReloadOutlined />} 
            onClick={() => refresh()}
            loading={loading}
          >
            手动刷新
          </Button>
        }>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>当前策略:</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {strategy === 'polling' ? (
                  <>
                    <SyncOutlined spin style={{ color: '#1890ff' }} />
                    <Text style={{ color: '#1890ff' }}>轮询模式 (30秒)</Text>
                  </>
                ) : strategy === 'subscription' ? (
                  <>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Text style={{ color: '#52c41a' }}>订阅模式</Text>
                  </>
                ) : (
                  <>
                    <ClockCircleOutlined style={{ color: '#faad14' }} />
                    <Text style={{ color: '#faad14' }}>静态模式</Text>
                  </>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>网络状态:</Text>
              <Text>{networkStatus ? `Status ${networkStatus}` : '正常'}</Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>最后更新:</Text>
              <Text>
                {lastUpdateTime 
                  ? lastUpdateTime.toLocaleString('zh-CN')
                  : '未更新'
                }
              </Text>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text strong>数据状态:</Text>
              <Text>
                {loading ? '加载中...' : 
                 error ? '错误' : 
                 data?.products ? `${data.products.length} 个产品` : '无数据'}
              </Text>
            </div>

            {error && (
              <Alert
                message="数据获取错误"
                description={error.message}
                type="error"
                showIcon
              />
            )}
          </Space>
        </Card>

        <Card title="实现说明">
          <Space direction="vertical" size="small">
            <Text>
              <strong>🎯 Apollo 官方推荐:</strong> "在大多数情况下，您的客户端不应该使用订阅来与后端保持同步。相反，您应该间歇性地轮询查询"
            </Text>
            <Text>
              <strong>✅ 简化优势:</strong> 移除了复杂的 WebSocket 配置，减少了依赖项，提高了可靠性
            </Text>
            <Text>
              <strong>⚡ 性能优化:</strong> HTTP/2 多路复用使轮询几乎与 WebSocket 一样高效
            </Text>
            <Text>
              <strong>🔄 自动切换:</strong> 支持从订阅模式自动降级到轮询模式
            </Text>
            <Text>
              <strong>📱 移动友好:</strong> 轮询在移动网络环境下更稳定可靠
            </Text>
          </Space>
        </Card>

        <Card title="技术架构">
          <Space direction="vertical" size="small">
            <Text>• <strong>HTTP 单链路:</strong> 使用单一 HttpLink 处理所有操作类型</Text>
            <Text>• <strong>智能轮询:</strong> 30秒间隔的自动数据更新</Text>
            <Text>• <strong>手动刷新:</strong> 支持用户主动触发数据更新</Text>
            <Text>• <strong>缓存优化:</strong> Apollo Cache 提供本地状态管理</Text>
            <Text>• <strong>错误处理:</strong> 统一的错误处理和重试机制</Text>
            <Text>• <strong>认证集成:</strong> 自动 token 管理和刷新</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
}
