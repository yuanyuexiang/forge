'use client';

import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Button, Alert, Timeline, Tag } from 'antd';
import { WifiOutlined, DisconnectOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { DIRECTUS_CONFIG } from '@/lib/api/directus-config';
import { TokenManager } from '@/lib/auth/token-manager';
import { apiLogger } from '@/lib/utils/logger';

const { Title, Text, Paragraph } = Typography;

interface DiagnosticResult {
  test: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  details?: any;
}

export default function WebSocketDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [wsInstance, setWsInstance] = useState<WebSocket | null>(null);

  const addDiagnostic = (test: string, status: 'pending' | 'success' | 'error', message: string, details?: any) => {
    setDiagnostics(prev => {
      const existing = prev.find(d => d.test === test);
      if (existing) {
        return prev.map(d => d.test === test ? { test, status, message, details } : d);
      }
      return [...prev, { test, status, message, details }];
    });
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setDiagnostics([]);

    // 1. 检查认证
    addDiagnostic('auth', 'pending', '检查用户认证状态...');
    const token = TokenManager.getCurrentToken();
    const userId = TokenManager.getCurrentUserId();
    
    if (!token || !userId) {
      addDiagnostic('auth', 'error', '用户未登录或 token 无效', { token: !!token, userId });
      setIsRunning(false);
      return;
    }
    addDiagnostic('auth', 'success', `用户已认证 (ID: ${userId})`, { token: token.substring(0, 20) + '...' });

    // 2. 检查 WebSocket 端点配置
    addDiagnostic('endpoint', 'pending', '检查 WebSocket 端点配置...');
    const wsEndpoint = DIRECTUS_CONFIG.getWebSocketEndpoint();
    addDiagnostic('endpoint', 'success', `WebSocket 端点: ${wsEndpoint}`, { endpoint: wsEndpoint });

    // 3. 尝试建立 WebSocket 连接
    addDiagnostic('connection', 'pending', '尝试建立 WebSocket 连接...');
    
    try {
      // 构建 WebSocket URL，包含认证参数
      const wsUrl = `${wsEndpoint}?access_token=${encodeURIComponent(token)}`;
      apiLogger.info('尝试连接 WebSocket:', wsUrl);
      
      const ws = new WebSocket(wsUrl, ['graphql-ws']);
      setWsInstance(ws);

      // 设置超时
      const timeout = setTimeout(() => {
        ws.close();
        addDiagnostic('connection', 'error', 'WebSocket 连接超时 (10秒)', { timeout: '10s' });
        setIsRunning(false);
      }, 10000);

      ws.onopen = () => {
        clearTimeout(timeout);
        addDiagnostic('connection', 'success', 'WebSocket 连接已建立', { readyState: ws.readyState });
        
        // 4. 发送初始化消息 (GraphQL-WS 协议)
        addDiagnostic('init', 'pending', '发送连接初始化消息...');
        
        const initMessage = {
          type: 'connection_init',
          payload: {
            authorization: `Bearer ${token}`
          }
        };
        
        ws.send(JSON.stringify(initMessage));
        apiLogger.info('发送初始化消息:', initMessage);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          apiLogger.info('收到 WebSocket 消息:', message);
          
          if (message.type === 'connection_ack') {
            addDiagnostic('init', 'success', '连接初始化成功', message);
            
            // 5. 尝试订阅测试
            addDiagnostic('subscription', 'pending', '测试产品数据订阅...');
            
            const subscriptionMessage = {
              id: 'test-subscription',
              type: 'start',
              payload: {
                query: `
                  subscription {
                    products_mutated(event: update) {
                      key
                      event
                      data {
                        id
                        name
                        user_created {
                          id
                        }
                      }
                    }
                  }
                `,
                variables: {}
              }
            };
            
            ws.send(JSON.stringify(subscriptionMessage));
            apiLogger.info('发送订阅消息:', subscriptionMessage);
            
            // 等待订阅响应
            setTimeout(() => {
              addDiagnostic('subscription', 'success', '订阅消息已发送，等待数据更新...', subscriptionMessage);
              setIsRunning(false);
            }, 2000);
            
          } else if (message.type === 'error') {
            addDiagnostic('init', 'error', '连接初始化失败', message);
            setIsRunning(false);
          } else if (message.type === 'data' && message.id === 'test-subscription') {
            addDiagnostic('subscription', 'success', '收到订阅数据！', message.payload);
          } else if (message.type === 'complete') {
            addDiagnostic('subscription', 'error', '订阅已完成（可能是错误）', message);
          }
        } catch (error: any) {
          apiLogger.error('解析 WebSocket 消息失败:', error);
          addDiagnostic('init', 'error', '消息解析失败', { error: error.message, data: event.data });
        }
      };

      ws.onerror = (error) => {
        clearTimeout(timeout);
        addDiagnostic('connection', 'error', 'WebSocket 连接错误', error);
        setIsRunning(false);
      };

      ws.onclose = (event) => {
        clearTimeout(timeout);
        const message = `WebSocket 连接已关闭 (代码: ${event.code}, 原因: ${event.reason || '未知'})`;
        if (event.code === 1000) {
          addDiagnostic('connection', 'success', message, { code: event.code, reason: event.reason });
        } else {
          addDiagnostic('connection', 'error', message, { code: event.code, reason: event.reason });
        }
        setWsInstance(null);
        setIsRunning(false);
      };

    } catch (error: any) {
      addDiagnostic('connection', 'error', 'WebSocket 连接异常', { error: error.message });
      setIsRunning(false);
    }
  };

  const closeConnection = () => {
    if (wsInstance) {
      wsInstance.close(1000, '用户主动关闭');
      setWsInstance(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <LoadingOutlined style={{ color: '#1890ff' }} />;
      case 'success':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'error':
        return <CloseCircleOutlined style={{ color: '#f5222d' }} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Title level={2}>WebSocket 连接诊断工具</Title>
        
        <Alert
          message="诊断说明"
          description="此工具将测试 GraphQL WebSocket 连接的各个环节，帮助诊断实时订阅功能的问题。"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Card title="诊断控制" style={{ marginBottom: 24 }}>
          <Space>
            <Button 
              type="primary" 
              icon={<WifiOutlined />}
              onClick={runDiagnostics}
              loading={isRunning}
              disabled={isRunning}
            >
              开始诊断
            </Button>
            
            {wsInstance && (
              <Button 
                danger
                icon={<DisconnectOutlined />}
                onClick={closeConnection}
              >
                关闭连接
              </Button>
            )}
            
            <Button onClick={() => setDiagnostics([])}>
              清除结果
            </Button>
          </Space>
        </Card>

        <Card title="诊断结果">
          {diagnostics.length === 0 ? (
            <Text type="secondary">点击"开始诊断"来测试 WebSocket 连接</Text>
          ) : (
            <Timeline>
              {diagnostics.map((diagnostic, index) => (
                <Timeline.Item
                  key={index}
                  dot={getStatusIcon(diagnostic.status)}
                >
                  <div>
                    <Space>
                      <Text strong>{diagnostic.test}</Text>
                      <Tag color={
                        diagnostic.status === 'success' ? 'green' : 
                        diagnostic.status === 'error' ? 'red' : 'blue'
                      }>
                        {diagnostic.status}
                      </Tag>
                    </Space>
                    <div style={{ marginTop: 8 }}>
                      <Text>{diagnostic.message}</Text>
                    </div>
                    {diagnostic.details && (
                      <div style={{ marginTop: 8, padding: 12, backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                        <pre style={{ margin: 0, fontSize: '12px' }}>
                          {JSON.stringify(diagnostic.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          )}
        </Card>

        <Card title="配置信息" style={{ marginTop: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>WebSocket 端点: </Text>
              <Text code>{DIRECTUS_CONFIG.getWebSocketEndpoint()}</Text>
            </div>
            <div>
              <Text strong>GraphQL 端点: </Text>
              <Text code>{DIRECTUS_CONFIG.getGraphQLEndpoint()}</Text>
            </div>
            <div>
              <Text strong>用户状态: </Text>
              <Text>{TokenManager.getCurrentUserId() ? `已登录 (${TokenManager.getCurrentUserId()})` : '未登录'}</Text>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
}
