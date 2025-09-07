'use client';

import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Space, Row, Col, Tag, Typography, notification, Form, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { useFinalRealtimeUpdates } from '@hooks/useFinalRealtimeUpdates';

const { Title, Text } = Typography;

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  updatedAt: string;
  updatedBy: string;
}

export default function RealtimeProductPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: '苹果 iPhone 15',
      price: 5999,
      description: '最新款 iPhone，配备 A17 芯片',
      updatedAt: new Date().toISOString(),
      updatedBy: 'user1'
    },
    {
      id: '2', 
      name: '三星 Galaxy S24',
      price: 4999,
      description: '安卓旗舰手机，AI摄影功能强大',
      updatedAt: new Date().toISOString(),
      updatedBy: 'user2'
    }
  ]);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const {
    isConnected,
    currentMethod,
    notifyDataChange,
    lastUpdate
  } = useFinalRealtimeUpdates({
    enableWebSocket: true,
    enableSSE: true,
    enablePolling: true,
    dataTypes: ['products']
  });

  // 监听实时数据变更
  useEffect(() => {
    const handleDataChange = (event: CustomEvent) => {
      const { type, data, sourceClientId } = event.detail;
      
      if (type === 'products') {
        console.log('收到产品数据变更:', data);
        
        if (data.action === 'create') {
          setProducts(prev => [...prev, data.product]);
          notification.success({
            message: '新产品已添加',
            description: `${data.product.name} - 来自其他用户`,
            duration: 3
          });
        } else if (data.action === 'update') {
          setProducts(prev => prev.map(p => 
            p.id === data.product.id ? data.product : p
          ));
          notification.info({
            message: '产品已更新',
            description: `${data.product.name} - 来自其他用户`,
            duration: 3
          });
        } else if (data.action === 'delete') {
          setProducts(prev => prev.filter(p => p.id !== data.productId));
          notification.warning({
            message: '产品已删除',
            description: `产品ID: ${data.productId} - 来自其他用户`,
            duration: 3
          });
        }
      }
    };

    window.addEventListener('realtimeDataChange', handleDataChange as EventListener);
    return () => {
      window.removeEventListener('realtimeDataChange', handleDataChange as EventListener);
    };
  }, []);

  const handleAddProduct = async (values: any) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: values.name,
      price: parseFloat(values.price),
      description: values.description,
      updatedAt: new Date().toISOString(),
      updatedBy: 'current-user'
    };

    // 更新本地状态
    setProducts(prev => [...prev, newProduct]);
    
    // 广播变更到其他客户端
    await notifyDataChange('products', {
      action: 'create',
      product: newProduct
    });

    setIsModalVisible(false);
    form.resetFields();
    
    notification.success({
      message: '产品添加成功',
      description: '已同步到所有连接的客户端'
    });
  };

  const handleUpdateProduct = async (values: any) => {
    if (!editingProduct) return;

    const updatedProduct: Product = {
      ...editingProduct,
      name: values.name,
      price: parseFloat(values.price),
      description: values.description,
      updatedAt: new Date().toISOString(),
      updatedBy: 'current-user'
    };

    // 更新本地状态
    setProducts(prev => prev.map(p => 
      p.id === editingProduct.id ? updatedProduct : p
    ));
    
    // 广播变更到其他客户端
    await notifyDataChange('products', {
      action: 'update',
      product: updatedProduct
    });

    setIsModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
    
    notification.success({
      message: '产品更新成功',
      description: '已同步到所有连接的客户端'
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    // 更新本地状态
    setProducts(prev => prev.filter(p => p.id !== productId));
    
    // 广播变更到其他客户端
    await notifyDataChange('products', {
      action: 'delete',
      productId
    });
    
    notification.success({
      message: '产品删除成功',
      description: '已同步到所有连接的客户端'
    });
  };

  const openAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
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
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={2}>📱 实时产品管理</Title>
        <Space>
          <Tag color={isConnected ? 'green' : 'red'}>
            {isConnected ? '🟢 已连接' : '🔴 未连接'}
          </Tag>
          <Tag color={getMethodColor(currentMethod)}>
            {currentMethod === 'websocket' && '🔌 WebSocket'}
            {currentMethod === 'sse' && '📡 SSE'}
            {currentMethod === 'polling' && '🔄 轮询'}
            {currentMethod === 'none' && '❌ 无连接'}
          </Tag>
          {lastUpdate && (
            <Tag color="blue">
              最后更新: {lastUpdate.toLocaleTimeString()}
            </Tag>
          )}
        </Space>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={openAddModal}
          disabled={!isConnected}
        >
          添加产品
        </Button>
        <Text style={{ marginLeft: '16px', color: '#666' }}>
          在多个浏览器标签页中打开此页面，测试实时数据同步效果
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col xs={24} sm={12} md={8} key={product.id}>
            <Card
              title={product.name}
              extra={
                <Space>
                  <Button 
                    size="small" 
                    icon={<EditOutlined />}
                    onClick={() => openEditModal(product)}
                    disabled={!isConnected}
                  />
                  <Button 
                    size="small" 
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteProduct(product.id)}
                    disabled={!isConnected}
                  />
                </Space>
              }
              style={{ height: '100%' }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>价格: </Text>
                  <Text style={{ color: '#ff4d4f', fontSize: '16px', fontWeight: 'bold' }}>
                    ¥{product.price.toLocaleString()}
                  </Text>
                </div>
                
                <div>
                  <Text>{product.description}</Text>
                </div>
                
                <div style={{ fontSize: '12px', color: '#999' }}>
                  <div>更新时间: {new Date(product.updatedAt).toLocaleString()}</div>
                  <div>更新者: {product.updatedBy}</div>
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={editingProduct ? '编辑产品' : '添加产品'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okButtonProps={{ disabled: !isConnected }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editingProduct ? handleUpdateProduct : handleAddProduct}
        >
          <Form.Item
            label="产品名称"
            name="name"
            rules={[{ required: true, message: '请输入产品名称' }]}
          >
            <Input placeholder="请输入产品名称" />
          </Form.Item>
          
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <Input 
              type="number" 
              placeholder="请输入价格" 
              addonBefore="¥"
            />
          </Form.Item>
          
          <Form.Item
            label="产品描述"
            name="description"
            rules={[{ required: true, message: '请输入产品描述' }]}
          >
            <Input.TextArea 
              rows={3}
              placeholder="请输入产品描述"
            />
          </Form.Item>
        </Form>
      </Modal>

      <Card 
        title="📝 使用说明" 
        style={{ marginTop: '24px' }}
        type="inner"
      >
        <ol>
          <li>在多个浏览器标签页或窗口中打开此页面</li>
          <li>确认所有页面都显示"已连接"状态</li>
          <li>在其中一个页面添加、编辑或删除产品</li>
          <li>观察其他页面是否实时更新</li>
          <li>注意右上角的连接方式标识（WebSocket/SSE/轮询）</li>
        </ol>
        
        <div style={{ marginTop: '16px' }}>
          <Text strong>技术特性:</Text>
          <ul style={{ marginTop: '8px' }}>
            <li>✅ 跨浏览器实时数据同步</li>
            <li>✅ 多种连接方式自动切换</li>
            <li>✅ 断线重连机制</li>
            <li>✅ 数据变更通知</li>
            <li>✅ 云端部署兼容</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
