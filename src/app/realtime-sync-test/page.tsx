'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Space, Row, Col, Tag, Typography, Divider, notification } from 'antd';
import { ApiOutlined, DisconnectOutlined, SendOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRealtimeSync } from '@hooks/useRealtimeSync';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function RealtimeSyncTestPage() {
  const [testMessage, setTestMessage] = useState('');
  const [dataType, setDataType] = useState('products');
  const [sendHistory, setSendHistory] = useState<Array<{ time: string; type: string; data: any }>>([]);
  
  const {
    connectionStatus,
    isConnected,
    clientId,
    userId,
    lastDataChange,
    activeConnections,
    notifyDataChange,
    getConnectionInfo,
    connect,
    disconnect
  } = useRealtimeSync();

  const handleSendTestData = async () => {
    if (!testMessage.trim()) {
      notification.warning({
        message: '请输入测试数据',
        description: '测试消息不能为空'
      });
      return;
    }

    try {
      const testData = {
        message: testMessage,
        timestamp: new Date().toISOString(),
        clientId: clientId
      };

      const success = await notifyDataChange(dataType, testData);
      
      if (success) {
        setSendHistory(prev => [
          { time: new Date().toLocaleTimeString(), type: dataType, data: testData },
          ...prev.slice(0, 9) // 保留最近10条
        ]);
        
        notification.success({
          message: '数据发送成功',
          description: `已向其他浏览器广播 ${dataType} 数据变更`
        });
        
        setTestMessage('');
      } else {
        notification.error({
          message: '数据发送失败',
          description: '请检查连接状态和网络'
        });
      }
    } catch (error) {
      notification.error({
        message: '发送异常',
        description: String(error)
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'green';
      case 'connecting': return 'orange';
      case 'disconnected': return 'red';
      default: return 'default';
    }
  };

  const handleRefreshInfo = async () => {
    await getConnectionInfo();
    notification.info({
      message: '连接信息已刷新',
      description: `当前活跃连接数: ${activeConnections}`
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Title level={2}>🔄 跨浏览器实时同步测试</Title>
      <Paragraph>
        这个页面测试基于 Server-Sent Events (SSE) 的跨浏览器实时数据同步功能。
        在多个浏览器标签页或窗口中打开此页面，在其中一个发送数据，观察其他页面的实时更新。
      </Paragraph>

      <Row gutter={[16, 16]}>
        {/* 连接状态面板 */}
        <Col xs={24} lg={12}>
          <Card 
            title="🔗 连接状态" 
            extra={
              <Space>
                <Button 
                  size="small" 
                  onClick={connect} 
                  disabled={isConnected}
                  icon={<ApiOutlined />}
                >
                  连接
                </Button>
                <Button 
                  size="small" 
                  onClick={disconnect} 
                  disabled={!isConnected}
                  icon={<DisconnectOutlined />}
                >
                  断开
                </Button>
                <Button 
                  size="small" 
                  onClick={handleRefreshInfo}
                  icon={<ReloadOutlined />}
                >
                  刷新
                </Button>
              </Space>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>状态: </Text>
                <Tag color={getStatusColor(connectionStatus)}>
                  {connectionStatus === 'connected' && '🟢 已连接'}
                  {connectionStatus === 'connecting' && '🟡 连接中'}
                  {connectionStatus === 'disconnected' && '🔴 已断开'}
                </Tag>
              </div>
              
              <div>
                <Text strong>客户端ID: </Text>
                <Text code>{clientId}</Text>
              </div>
              
              <div>
                <Text strong>用户ID: </Text>
                <Text code>{userId || '未知'}</Text>
              </div>
              
              <div>
                <Text strong>活跃连接数: </Text>
                <Tag color="blue">{activeConnections}</Tag>
              </div>
            </Space>
          </Card>
        </Col>

        {/* 发送数据面板 */}
        <Col xs={24} lg={12}>
          <Card title="📤 发送测试数据">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>数据类型: </Text>
                <Space.Compact>
                  <Button 
                    type={dataType === 'products' ? 'primary' : 'default'}
                    onClick={() => setDataType('products')}
                  >
                    产品
                  </Button>
                  <Button 
                    type={dataType === 'orders' ? 'primary' : 'default'}
                    onClick={() => setDataType('orders')}
                  >
                    订单
                  </Button>
                  <Button 
                    type={dataType === 'customers' ? 'primary' : 'default'}
                    onClick={() => setDataType('customers')}
                  >
                    客户
                  </Button>
                  <Button 
                    type={dataType === 'categories' ? 'primary' : 'default'}
                    onClick={() => setDataType('categories')}
                  >
                    分类
                  </Button>
                </Space.Compact>
              </div>
              
              <TextArea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="输入测试消息..."
                rows={3}
              />
              
              <Button 
                type="primary" 
                onClick={handleSendTestData}
                disabled={!isConnected}
                icon={<SendOutlined />}
                block
              >
                发送到其他浏览器
              </Button>
            </Space>
          </Card>
        </Col>

        {/* 接收数据面板 */}
        <Col xs={24} lg={12}>
          <Card title="📥 接收到的数据变更">
            {lastDataChange ? (
              <div>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>类型: </Text>
                    <Tag color="blue">{lastDataChange.type}</Tag>
                  </div>
                  
                  <div>
                    <Text strong>来源客户端: </Text>
                    <Text code>{lastDataChange.sourceClientId}</Text>
                  </div>
                  
                  <div>
                    <Text strong>时间: </Text>
                    <Text>{new Date(lastDataChange.timestamp).toLocaleString()}</Text>
                  </div>
                  
                  <div>
                    <Text strong>数据内容: </Text>
                    <div style={{ 
                      background: '#f5f5f5', 
                      padding: '8px', 
                      borderRadius: '4px',
                      marginTop: '4px'
                    }}>
                      <pre style={{ margin: 0, fontSize: '12px' }}>
                        {JSON.stringify(lastDataChange.data, null, 2)}
                      </pre>
                    </div>
                  </div>
                </Space>
              </div>
            ) : (
              <Text type="secondary">暂无接收到的数据变更</Text>
            )}
          </Card>
        </Col>

        {/* 发送历史面板 */}
        <Col xs={24} lg={12}>
          <Card title="📋 发送历史">
            {sendHistory.length > 0 ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                {sendHistory.map((item, index) => (
                  <div key={index} style={{ 
                    padding: '8px', 
                    background: index === 0 ? '#f6ffed' : '#fafafa',
                    borderRadius: '4px',
                    border: index === 0 ? '1px solid #b7eb8f' : '1px solid #d9d9d9'
                  }}>
                    <div>
                      <Tag color="green">{item.type}</Tag>
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {item.time}
                      </Text>
                    </div>
                    <div style={{ marginTop: '4px', fontSize: '12px' }}>
                      {item.data.message}
                    </div>
                  </div>
                ))}
              </Space>
            ) : (
              <Text type="secondary">暂无发送记录</Text>
            )}
          </Card>
        </Col>
      </Row>

      <Divider />

      <Card title="📖 测试说明" type="inner">
        <Space direction="vertical">
          <Paragraph>
            <Text strong>测试步骤:</Text>
          </Paragraph>
          <ol>
            <li>在多个浏览器标签页或窗口中打开此页面</li>
            <li>确认所有页面都显示"已连接"状态</li>
            <li>在其中一个页面输入测试消息并发送</li>
            <li>观察其他页面是否实时收到数据变更</li>
            <li>尝试不同的数据类型（产品、订单、客户、分类）</li>
          </ol>
          
          <Paragraph>
            <Text strong>技术特性:</Text>
          </Paragraph>
          <ul>
            <li>✅ 基于 Server-Sent Events (SSE) 的可靠连接</li>
            <li>✅ 自动重连机制</li>
            <li>✅ 跨浏览器实时数据同步</li>
            <li>✅ 用户权限过滤</li>
            <li>✅ 客户端去重（不会收到自己发送的消息）</li>
            <li>✅ 适用于云端部署环境</li>
          </ul>
        </Space>
      </Card>
    </div>
  );
}
