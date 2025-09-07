'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Row, Col, Tag, Typography, Divider, Tabs, notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined, ApiOutlined } from '@ant-design/icons';
import { useFinalRealtimeUpdates } from '@hooks/useFinalRealtimeUpdates';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

export default function ComprehensiveRealtimeTestPage() {
  const [testResults, setTestResults] = useState<{
    [key: string]: 'pending' | 'success' | 'failed'
  }>({});

  const {
    status,
    isConnected,
    currentMethod,
    lastUpdate,
    detailedStatus,
    notifyDataChange,
    refreshData,
    reconnect,
    hybridUpdates,
    sseSync
  } = useFinalRealtimeUpdates({
    enableWebSocket: true,
    enableSSE: true,
    enablePolling: true,
    dataTypes: ['products', 'orders', 'customers', 'categories']
  });

  // 监听数据变更事件
  useEffect(() => {
    const handleDataChange = (event: CustomEvent) => {
      notification.success({
        message: '收到实时数据变更',
        description: `类型: ${event.detail.type}, 来源: ${event.detail.sourceClientId}`,
        duration: 3
      });
    };

    window.addEventListener('realtimeDataChange', handleDataChange as EventListener);
    return () => {
      window.removeEventListener('realtimeDataChange', handleDataChange as EventListener);
    };
  }, []);

  const runTest = async (testName: string, testFn: () => Promise<boolean>) => {
    setTestResults(prev => ({ ...prev, [testName]: 'pending' }));
    
    try {
      const result = await testFn();
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: result ? 'success' : 'failed' 
      }));
      return result;
    } catch (error) {
      setTestResults(prev => ({ ...prev, [testName]: 'failed' }));
      console.error(`测试失败: ${testName}`, error);
      return false;
    }
  };

  const testSSEConnection = async () => {
    return runTest('SSE连接测试', async () => {
      if (!sseSync.isConnected) {
        sseSync.connect();
        // 等待连接建立
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      return sseSync.isConnected;
    });
  };

  const testDataBroadcast = async () => {
    return runTest('数据广播测试', async () => {
      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: '测试数据广播'
      };
      
      return await notifyDataChange('products', testData);
    });
  };

  const testReconnection = async () => {
    return runTest('重连测试', async () => {
      await reconnect();
      await new Promise(resolve => setTimeout(resolve, 3000));
      return isConnected;
    });
  };

  const testDataRefresh = async () => {
    return runTest('数据刷新测试', async () => {
      return await refreshData();
    });
  };

  const runAllTests = async () => {
    notification.info({
      message: '开始全面测试',
      description: '正在运行所有实时同步功能测试...'
    });

    await testSSEConnection();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await testDataBroadcast();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await testDataRefresh();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    await testReconnection();

    notification.success({
      message: '测试完成',
      description: '所有测试已完成，请查看结果'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'failed': return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      case 'pending': return <SyncOutlined spin style={{ color: '#1890ff' }} />;
      default: return null;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'websocket': return 'blue';
      case 'sse': return 'green';
      case 'polling': return 'orange';
      case 'none': return 'red';
      default: return 'default';
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <Title level={2}>🚀 综合实时同步功能测试</Title>
      <Paragraph>
        这是一个综合测试页面，用于验证所有实时同步功能的工作状态。
        包括 WebSocket、Server-Sent Events (SSE) 和轮询三种方式的完整测试。
      </Paragraph>

      <Tabs defaultActiveKey="1">
        <TabPane tab="📊 状态监控" key="1">
          <Row gutter={[16, 16]}>
            {/* 总体状态 */}
            <Col xs={24} lg={8}>
              <Card title="🎯 总体状态" extra={
                <Tag color={getMethodColor(currentMethod)}>
                  {currentMethod.toUpperCase()}
                </Tag>
              }>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>连接状态: </Text>
                    <Tag color={isConnected ? 'green' : 'red'}>
                      {isConnected ? '🟢 已连接' : '🔴 未连接'}
                    </Tag>
                  </div>
                  
                  <div>
                    <Text strong>当前方法: </Text>
                    <Tag color={getMethodColor(currentMethod)}>
                      {currentMethod === 'websocket' && '🔌 WebSocket'}
                      {currentMethod === 'sse' && '📡 Server-Sent Events'}
                      {currentMethod === 'polling' && '🔄 轮询'}
                      {currentMethod === 'none' && '❌ 无连接'}
                    </Tag>
                  </div>
                  
                  <div>
                    <Text strong>活跃连接: </Text>
                    <Tag color="blue">{status.activeConnections}</Tag>
                  </div>
                  
                  <div>
                    <Text strong>最后更新: </Text>
                    <Text>{lastUpdate ? lastUpdate.toLocaleTimeString() : '无'}</Text>
                  </div>
                  
                  <div>
                    <Text strong>错误计数: </Text>
                    <Tag color={status.errorCount > 0 ? 'red' : 'green'}>
                      {status.errorCount}
                    </Tag>
                  </div>
                </Space>
              </Card>
            </Col>

            {/* WebSocket 状态 */}
            <Col xs={24} lg={8}>
              <Card title="🔌 WebSocket 状态">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>启用状态: </Text>
                    <Tag color={detailedStatus.websocket.enabled ? 'green' : 'red'}>
                      {detailedStatus.websocket.enabled ? '已启用' : '已禁用'}
                    </Tag>
                  </div>
                  
                  <div>
                    <Text strong>连接状态: </Text>
                    <Tag color={
                      detailedStatus.websocket.status === 'connected' ? 'green' : 
                      detailedStatus.websocket.status === 'connecting' ? 'orange' : 'red'
                    }>
                      {detailedStatus.websocket.status}
                    </Tag>
                  </div>

                  <div>
                    <Text strong>更新方法: </Text>
                    <Tag color="blue">{hybridUpdates.updateMethod}</Tag>
                  </div>
                </Space>
              </Card>
            </Col>

            {/* SSE 状态 */}
            <Col xs={24} lg={8}>
              <Card title="📡 SSE 状态">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <Text strong>启用状态: </Text>
                    <Tag color={detailedStatus.sse.enabled ? 'green' : 'red'}>
                      {detailedStatus.sse.enabled ? '已启用' : '已禁用'}
                    </Tag>
                  </div>
                  
                  <div>
                    <Text strong>连接状态: </Text>
                    <Tag color={
                      detailedStatus.sse.status === 'connected' ? 'green' : 
                      detailedStatus.sse.status === 'connecting' ? 'orange' : 'red'
                    }>
                      {detailedStatus.sse.status}
                    </Tag>
                  </div>

                  <div>
                    <Text strong>客户端ID: </Text>
                    <Text code>{sseSync.clientId}</Text>
                  </div>
                  
                  <div>
                    <Text strong>活跃连接: </Text>
                    <Tag color="blue">{detailedStatus.sse.activeConnections}</Tag>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="🧪 功能测试" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card 
                title="🎮 测试控制台"
                extra={
                  <Button 
                    type="primary" 
                    onClick={runAllTests}
                    icon={<ApiOutlined />}
                  >
                    运行所有测试
                  </Button>
                }
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                      <Button 
                        block 
                        onClick={testSSEConnection}
                        loading={testResults['SSE连接测试'] === 'pending'}
                      >
                        {getStatusIcon(testResults['SSE连接测试'])}
                        SSE连接测试
                      </Button>
                    </Col>
                    
                    <Col xs={24} sm={12} md={6}>
                      <Button 
                        block 
                        onClick={testDataBroadcast}
                        loading={testResults['数据广播测试'] === 'pending'}
                      >
                        {getStatusIcon(testResults['数据广播测试'])}
                        数据广播测试
                      </Button>
                    </Col>
                    
                    <Col xs={24} sm={12} md={6}>
                      <Button 
                        block 
                        onClick={testDataRefresh}
                        loading={testResults['数据刷新测试'] === 'pending'}
                      >
                        {getStatusIcon(testResults['数据刷新测试'])}
                        数据刷新测试
                      </Button>
                    </Col>
                    
                    <Col xs={24} sm={12} md={6}>
                      <Button 
                        block 
                        onClick={testReconnection}
                        loading={testResults['重连测试'] === 'pending'}
                      >
                        {getStatusIcon(testResults['重连测试'])}
                        重连测试
                      </Button>
                    </Col>
                  </Row>
                </Space>
              </Card>
            </Col>

            <Col xs={24}>
              <Card title="📋 测试结果">
                {Object.keys(testResults).length > 0 ? (
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {Object.entries(testResults).map(([testName, result]) => (
                      <div key={testName} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        background: '#fafafa',
                        borderRadius: '4px'
                      }}>
                        <Text strong>{testName}</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {getStatusIcon(result)}
                          <Tag color={
                            result === 'success' ? 'green' : 
                            result === 'failed' ? 'red' : 'blue'
                          }>
                            {result === 'success' && '通过'}
                            {result === 'failed' && '失败'}
                            {result === 'pending' && '进行中'}
                          </Tag>
                        </div>
                      </div>
                    ))}
                  </Space>
                ) : (
                  <Text type="secondary">暂无测试结果</Text>
                )}
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="📖 使用说明" key="3">
          <Card title="🎯 测试目标">
            <Space direction="vertical">
              <Paragraph>
                <Text strong>主要功能验证:</Text>
              </Paragraph>
              <ul>
                <li>✅ 验证多种实时连接方式的工作状态</li>
                <li>✅ 测试跨浏览器数据同步功能</li>
                <li>✅ 确认自动故障转移机制</li>
                <li>✅ 验证重连和错误恢复能力</li>
                <li>✅ 测试云端部署环境的兼容性</li>
              </ul>

              <Paragraph>
                <Text strong>测试步骤:</Text>
              </Paragraph>
              <ol>
                <li>打开多个浏览器标签页访问此页面</li>
                <li>观察各页面的连接状态是否正常</li>
                <li>在其中一个页面运行"数据广播测试"</li>
                <li>确认其他页面是否收到实时通知</li>
                <li>测试网络中断后的自动重连功能</li>
                <li>验证不同连接方式的切换效果</li>
              </ol>

              <Paragraph>
                <Text strong>技术架构:</Text>
              </Paragraph>
              <ul>
                <li>🔌 <Text strong>WebSocket:</Text> 低延迟双向通信，适合实时性要求高的场景</li>
                <li>📡 <Text strong>SSE:</Text> 单向推送，兼容性好，适合云端部署</li>
                <li>🔄 <Text strong>轮询:</Text> 最后的保障方案，确保基本功能可用</li>
                <li>🎯 <Text strong>智能切换:</Text> 根据网络状况自动选择最优连接方式</li>
              </ul>
            </Space>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
}
