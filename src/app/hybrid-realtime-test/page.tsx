'use client';

import React from 'react';
import { Card, Typography, Space, Divider, Tag, Alert } from 'antd';
import { useSubscription } from '@/hooks/useSubscription';
import { useHybridRealtimeUpdates } from '@/hooks/useHybridRealtimeUpdates';
import RealtimeStatus from '@/components/RealtimeStatus';

const { Title, Text } = Typography;

export default function HybridRealtimeTest() {
  const { connectionStatus } = useSubscription();
  const { 
    connectionStatus: updatesConnectionStatus,
    updateMethod,
    lastProductUpdate,
    lastOrderUpdate,
    lastCustomerUpdate,
    errors
  } = useHybridRealtimeUpdates({
    enableProducts: true,
    enableOrders: true,
    enableCustomers: true,
    enablePolling: true,
    pollingInterval: 10000 // 10秒轮询一次，用于演示
  });

  return (
    <div style={{ padding: '24px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="mb-6 flex justify-between items-center">
          <Title level={2} style={{ margin: 0, color: '#111827' }}>
            混合式实时更新测试页面
          </Title>
          <RealtimeStatus connectionStatus={connectionStatus} showLabel />
        </div>

        <Alert
          message="混合更新策略"
          description="此页面展示混合式实时更新：优先使用 WebSocket 订阅，失败时自动切换到轮询机制。这确保在任何网络环境下都能获得数据更新。"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 连接状态卡片 */}
          <Card title="连接状态与更新方法" size="small">
            <Space direction="vertical" size="middle">
              <div>
                <Text strong>基础连接状态: </Text>
                <Tag color={connectionStatus === 'connected' ? 'green' : 
                          connectionStatus === 'connecting' ? 'orange' : 'red'}>
                  {connectionStatus === 'connected' ? '已连接' : 
                   connectionStatus === 'connecting' ? '连接中...' : '已断开'}
                </Tag>
              </div>
              
              <div>
                <Text strong>实时更新状态: </Text>
                <Tag color={updatesConnectionStatus === 'connected' ? 'green' : 
                          updatesConnectionStatus === 'connecting' ? 'orange' : 'red'}>
                  {updatesConnectionStatus === 'connected' ? '已连接' : 
                   updatesConnectionStatus === 'connecting' ? '连接中...' : '已断开'}
                </Tag>
              </div>

              <div>
                <Text strong>当前更新方法: </Text>
                <Tag color={updateMethod === 'websocket' ? 'blue' : 
                          updateMethod === 'polling' ? 'gold' : 'default'}>
                  {updateMethod === 'websocket' ? 'WebSocket 实时订阅' : 
                   updateMethod === 'polling' ? '轮询机制' : '未启用'}
                </Tag>
              </div>

              {updateMethod === 'polling' && (
                <Alert
                  message="当前使用轮询模式"
                  description="WebSocket 连接失败，已自动切换到轮询机制。数据将每10秒检查一次更新。"
                  type="warning"
                  showIcon
                />
              )}

              {updateMethod === 'websocket' && (
                <Alert
                  message="WebSocket 连接成功"
                  description="正在使用 WebSocket 实时订阅，数据变化会立即推送。"
                  type="success"
                  showIcon
                />
              )}
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
                    <div>
                      <div style={{ marginBottom: '8px' }}>
                        <Tag color={lastProductUpdate.data?.source === 'polling' ? 'gold' : 'blue'}>
                          {lastProductUpdate.data?.source === 'polling' ? '轮询获取' : 'WebSocket'}
                        </Tag>
                        <Text type="secondary">
                          {lastProductUpdate.data?.timestamp ? 
                            new Date(lastProductUpdate.data.timestamp).toLocaleString() : 
                            '时间未知'}
                        </Text>
                      </div>
                      <pre style={{ margin: 0, fontSize: '12px' }}>
                        {JSON.stringify(lastProductUpdate, null, 2)}
                      </pre>
                    </div>
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
                    <div>
                      <div style={{ marginBottom: '8px' }}>
                        <Tag color={lastOrderUpdate.data?.source === 'polling' ? 'gold' : 'blue'}>
                          {lastOrderUpdate.data?.source === 'polling' ? '轮询获取' : 'WebSocket'}
                        </Tag>
                        <Text type="secondary">
                          {lastOrderUpdate.data?.timestamp ? 
                            new Date(lastOrderUpdate.data.timestamp).toLocaleString() : 
                            '时间未知'}
                        </Text>
                      </div>
                      <pre style={{ margin: 0, fontSize: '12px' }}>
                        {JSON.stringify(lastOrderUpdate, null, 2)}
                      </pre>
                    </div>
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
                    <div>
                      <div style={{ marginBottom: '8px' }}>
                        <Tag color={lastCustomerUpdate.data?.source === 'polling' ? 'gold' : 'blue'}>
                          {lastCustomerUpdate.data?.source === 'polling' ? '轮询获取' : 'WebSocket'}
                        </Tag>
                        <Text type="secondary">
                          {lastCustomerUpdate.data?.timestamp ? 
                            new Date(lastCustomerUpdate.data.timestamp).toLocaleString() : 
                            '时间未知'}
                        </Text>
                      </div>
                      <pre style={{ margin: 0, fontSize: '12px' }}>
                        {JSON.stringify(lastCustomerUpdate, null, 2)}
                      </pre>
                    </div>
                  ) : (
                    <Text type="secondary">暂无客户更新</Text>
                  )}
                </div>
              </div>
            </Space>
          </Card>

          {/* 错误信息卡片 */}
          {(errors.productError || errors.orderError || errors.customerError) && (
            <Card title="错误信息" size="small">
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {errors.productError && (
                  <Alert
                    message="产品订阅错误"
                    description={errors.productError.message}
                    type="error"
                  />
                )}
                {errors.orderError && (
                  <Alert
                    message="订单订阅错误"
                    description={errors.orderError.message}
                    type="error"
                  />
                )}
                {errors.customerError && (
                  <Alert
                    message="客户订阅错误"
                    description={errors.customerError.message}
                    type="error"
                  />
                )}
              </Space>
            </Card>
          )}

          {/* 使用说明卡片 */}
          <Card title="使用说明" size="small">
            <Space direction="vertical" size="small">
              <Text>• 这个页面展示混合式实时更新策略</Text>
              <Text>• 📡 <Text strong>WebSocket 模式</Text>: 数据变化立即推送，零延迟</Text>
              <Text>• 🔄 <Text strong>轮询模式</Text>: 定期检查数据变化，适用于网络受限环境</Text>
              <Text>• 🔄 <Text strong>自动切换</Text>: WebSocket 失败时自动切换到轮询</Text>
              <Text>• 💡 在云端部署环境中，这种混合策略确保在任何情况下都能获得数据更新</Text>
              <Text>• 🕐 当前轮询间隔：10秒（可配置）</Text>
            </Space>
          </Card>
        </Space>
      </div>
    </div>
  );
}
