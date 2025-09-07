'use client';

import React from 'react';
import { Card, Typography, Space, Divider } from 'antd';
import { useSubscription } from '@/hooks/useSubscription';
import { useRealtimeUpdates } from '@/hooks/useRealtimeUpdates-simple';
import RealtimeStatus from '@/components/RealtimeStatus';

const { Title, Text } = Typography;

export default function SubscriptionTest() {
  const { connectionStatus } = useSubscription();
  const { 
    connectionStatus: updatesConnectionStatus,
    lastProductUpdate,
    lastOrderUpdate,
    lastCustomerUpdate 
  } = useRealtimeUpdates();

  return (
    <div style={{ padding: '24px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="mb-6 flex justify-between items-center">
          <Title level={2} style={{ margin: 0, color: '#111827' }}>
            GraphQL Subscription 测试页面
          </Title>
          <RealtimeStatus connectionStatus={connectionStatus} showLabel />
        </div>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 连接状态卡片 */}
          <Card title="连接状态" size="small">
            <Space direction="vertical" size="middle">
              <div>
                <Text strong>基础订阅连接状态: </Text>
                <Text type={connectionStatus === 'connected' ? 'success' : 
                          connectionStatus === 'connecting' ? 'warning' : 'danger'}>
                  {connectionStatus === 'connected' ? '已连接' : 
                   connectionStatus === 'connecting' ? '连接中...' : '已断开'}
                </Text>
              </div>
              
              <div>
                <Text strong>实时更新连接状态: </Text>
                <Text type={updatesConnectionStatus === 'connected' ? 'success' : 
                          updatesConnectionStatus === 'connecting' ? 'warning' : 'danger'}>
                  {updatesConnectionStatus === 'connected' ? '已连接' : 
                   updatesConnectionStatus === 'connecting' ? '连接中...' : '已断开'}
                </Text>
              </div>
            </Space>
          </Card>

          {/* 实时数据更新卡片 */}
          <Card title="实时数据更新" size="small">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 商品更新 */}
              <div>
                <Text strong>最新商品更新:</Text>
                <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                  {lastProductUpdate ? (
                    <pre style={{ margin: 0, fontSize: '12px' }}>
                      {JSON.stringify(lastProductUpdate, null, 2)}
                    </pre>
                  ) : (
                    <Text type="secondary">暂无商品更新</Text>
                  )}
                </div>
              </div>

              <Divider style={{ margin: '12px 0' }} />

              {/* 订单更新 */}
              <div>
                <Text strong>最新订单更新:</Text>
                <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                  {lastOrderUpdate ? (
                    <pre style={{ margin: 0, fontSize: '12px' }}>
                      {JSON.stringify(lastOrderUpdate, null, 2)}
                    </pre>
                  ) : (
                    <Text type="secondary">暂无订单更新</Text>
                  )}
                </div>
              </div>

              <Divider style={{ margin: '12px 0' }} />

              {/* 客户更新 */}
              <div>
                <Text strong>最新客户更新:</Text>
                <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                  {lastCustomerUpdate ? (
                    <pre style={{ margin: 0, fontSize: '12px' }}>
                      {JSON.stringify(lastCustomerUpdate, null, 2)}
                    </pre>
                  ) : (
                    <Text type="secondary">暂无客户更新</Text>
                  )}
                </div>
              </div>
            </Space>
          </Card>

          {/* 说明卡片 */}
          <Card title="使用说明" size="small">
            <Space direction="vertical" size="small">
              <Text>• 这个页面用于测试 GraphQL Subscription 功能</Text>
              <Text>• 当后端数据发生变化时，你应该能在上面看到实时更新</Text>
              <Text>• 连接状态指示器会显示 WebSocket 连接是否正常</Text>
              <Text>• 请在其他页面修改数据，然后回到这里查看是否收到了实时更新</Text>
            </Space>
          </Card>
        </Space>
      </div>
    </div>
  );
}
