'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Tag, 
  Button, 
  Modal, 
  Descriptions, 
  Typography, 
  Select, 
  message,
  Space,
  Statistic,
  Row,
  Col,
  Divider
} from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    description: string;
  };
}

interface Payment {
  id: string;
  payment_method: string;
  amount: number;
  status: string;
  paid_at: string;
  transaction_id?: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

interface Order {
  id: string;
  user_id: string;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  payment: Payment;
  user: User;
}

const OrdersContent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');

  // 加载订单数据
  const loadOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        console.log('订单数据加载成功:', data);
      } else {
        message.error('加载订单失败');
      }
    } catch (error) {
      console.error('加载订单失败:', error);
      message.error('加载订单失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // 订单状态标签颜色
  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'pending': 'orange',
      'confirmed': 'blue',
      'processing': 'cyan',
      'shipped': 'purple',
      'delivered': 'green',
      'cancelled': 'red',
      'refunded': 'gray'
    };
    return statusColors[status] || 'default';
  };

  // 支付状态标签颜色
  const getPaymentStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'pending': 'orange',
      'paid': 'green',
      'failed': 'red',
      'refunded': 'gray'
    };
    return statusColors[status] || 'default';
  };

  // 查看订单详情
  const viewOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  // 更新订单状态
  const updateOrderStatus = async () => {
    if (!updatingOrderId || !newStatus) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/orders?id=${updatingOrderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        message.success('订单状态更新成功');
        loadOrders(); // 重新加载订单列表
        setStatusModalVisible(false);
        setUpdatingOrderId(null);
        setNewStatus('');
      } else {
        message.error('更新订单状态失败');
      }
    } catch (error) {
      console.error('更新订单状态失败:', error);
      message.error('更新订单状态失败');
    }
  };

  const openStatusModal = (orderId: string, currentStatus: string) => {
    setUpdatingOrderId(orderId);
    setNewStatus(currentStatus);
    setStatusModalVisible(true);
  };

  // 表格列定义
  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <Text code copyable>
          {id.slice(0, 8)}...
        </Text>
      ),
    },
    {
      title: '客户信息',
      key: 'customer',
      render: (record: Order) => (
        <div>
          <div>
            <UserOutlined /> {record.user.first_name} {record.user.last_name}
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.user.email}
          </Text>
        </div>
      ),
    },
    {
      title: '订单金额',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price: number) => (
        <Statistic
          value={price}
          prefix={<DollarOutlined />}
          precision={2}
          valueStyle={{ fontSize: '14px' }}
        />
      ),
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '支付状态',
      key: 'payment_status',
      render: (record: Order) => (
        <Tag color={getPaymentStatusColor(record.payment?.status || 'pending')}>
          {(record.payment?.status || 'pending').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '商品数量',
      key: 'items_count',
      render: (record: Order) => (
        <Text>
          <ShoppingCartOutlined /> {record.order_items?.length || 0} 件
        </Text>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => (
        <div>
          <ClockCircleOutlined /> {new Date(date).toLocaleDateString()}
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {new Date(date).toLocaleTimeString()}
          </Text>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (record: Order) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => viewOrderDetail(record)}
          >
            详情
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openStatusModal(record.id, record.status)}
          >
            状态
          </Button>
        </Space>
      ),
    },
  ];

  // 计算统计数据
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;

  return (
    <div style={{ padding: '24px' }}>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总订单数"
              value={totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总收入"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待处理订单"
              value={pendingOrders}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已完成订单"
              value={completedOrders}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 订单列表 */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title level={4} style={{ margin: 0 }}>订单管理</Title>
          <Button type="primary" onClick={loadOrders} loading={loading}>
            刷新数据
          </Button>
        </div>
        
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* 订单详情模态框 */}
      <Modal
        title="订单详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            <Descriptions title="基本信息" bordered column={2}>
              <Descriptions.Item label="订单ID">{selectedOrder.id}</Descriptions.Item>
              <Descriptions.Item label="订单状态">
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="客户姓名">
                {selectedOrder.user.first_name} {selectedOrder.user.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="客户邮箱">{selectedOrder.user.email}</Descriptions.Item>
              <Descriptions.Item label="订单总金额">¥{selectedOrder.total_price}</Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {new Date(selectedOrder.created_at).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>支付信息</Title>
            {selectedOrder.payment ? (
              <Descriptions bordered column={2}>
                <Descriptions.Item label="支付方式">{selectedOrder.payment.payment_method}</Descriptions.Item>
                <Descriptions.Item label="支付状态">
                  <Tag color={getPaymentStatusColor(selectedOrder.payment.status)}>
                    {selectedOrder.payment.status.toUpperCase()}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="支付金额">¥{selectedOrder.payment.amount}</Descriptions.Item>
                <Descriptions.Item label="支付时间">
                  {selectedOrder.payment.paid_at ? 
                    new Date(selectedOrder.payment.paid_at).toLocaleString() : 
                    '未支付'
                  }
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Text>暂无支付信息</Text>
            )}

            <Divider />

            <Title level={5}>订单商品</Title>
            <Table
              dataSource={selectedOrder.order_items}
              pagination={false}
              size="small"
              columns={[
                {
                  title: '商品名称',
                  dataIndex: ['product', 'name'],
                  key: 'product_name',
                },
                {
                  title: '数量',
                  dataIndex: 'quantity',
                  key: 'quantity',
                },
                {
                  title: '单价',
                  dataIndex: 'price',
                  key: 'price',
                  render: (price: number) => `¥${price}`,
                },
                {
                  title: '小计',
                  key: 'subtotal',
                  render: (record: OrderItem) => `¥${(record.quantity * record.price).toFixed(2)}`,
                },
              ]}
            />
          </div>
        )}
      </Modal>

      {/* 更新状态模态框 */}
      <Modal
        title="更新订单状态"
        open={statusModalVisible}
        onOk={updateOrderStatus}
        onCancel={() => {
          setStatusModalVisible(false);
          setUpdatingOrderId(null);
          setNewStatus('');
        }}
      >
        <Select
          value={newStatus}
          onChange={setNewStatus}
          style={{ width: '100%' }}
          placeholder="选择新状态"
        >
          <Option value="pending">待处理</Option>
          <Option value="confirmed">已确认</Option>
          <Option value="processing">处理中</Option>
          <Option value="shipped">已发货</Option>
          <Option value="delivered">已送达</Option>
          <Option value="cancelled">已取消</Option>
          <Option value="refunded">已退款</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default OrdersContent;
