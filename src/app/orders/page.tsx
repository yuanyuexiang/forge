'use client';

import React, { useState } from 'react';
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
  Divider,
  Input
} from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined 
} from '@ant-design/icons';
import { 
  useGetOrdersQuery,
  useGetOrderItemsQuery,
  useUpdateOrderStatusMutation,
  GetOrdersQuery
} from '../../generated/graphql';
import { ProtectedRoute, AdminLayout } from '@components';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

// 使用生成的类型
type Order = GetOrdersQuery['orders'][0];

function OrdersContent() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [searchText, setSearchText] = useState('');

  // 查询订单列表
  const { data: ordersData, loading, error, refetch } = useGetOrdersQuery();
  
  // 查询订单项（当选择了订单时）
  const { data: orderItemsData } = useGetOrderItemsQuery({
    variables: { orderId: selectedOrder?.id as any },
    skip: !selectedOrder?.id
  });

  // 更新订单状态
  const [updateOrderStatus] = useUpdateOrderStatusMutation({
    onCompleted: () => {
      message.success('订单状态更新成功');
      setStatusModalVisible(false);
      setUpdatingOrderId(null);
      refetch();
    },
    onError: (error) => {
      console.error('更新订单状态失败:', error);
      message.error('更新订单状态失败');
    }
  });

  const orders = ordersData?.orders || [];
  const orderItems = orderItemsData?.order_items || [];

  // 处理错误
  if (error) {
    console.error('获取订单列表失败:', error);
    message.error('获取订单列表失败');
  }

  // 过滤订单
  const filteredOrders = orders.filter(order => {
    if (!searchText) return true;
    const searchLower = searchText.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.user_id?.name?.toLowerCase().includes(searchLower) ||
      order.user_id?.email?.toLowerCase().includes(searchLower) ||
      order.status?.toLowerCase().includes(searchLower)
    );
  });

  // 计算统计数据
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + (order.total_price || 0), 0);

  // 状态标签颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      default: return 'default';
    }
  };

  // 状态显示文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待处理';
      case 'processing': return '处理中';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  // 查看订单详情
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailModalVisible(true);
  };

  // 更新状态
  const handleUpdateStatus = (orderId: string) => {
    setUpdatingOrderId(orderId);
    const order = orders.find(o => o.id === orderId);
    setNewStatus(order?.status || '');
    setStatusModalVisible(true);
  };

  // 确认更新状态
  const confirmUpdateStatus = () => {
    if (updatingOrderId && newStatus) {
      updateOrderStatus({
        variables: {
          id: updatingOrderId,
          status: newStatus
        }
      });
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <Text code copyable={{ text: id }}>
          {id.substring(0, 8)}...
        </Text>
      ),
    },
    {
      title: '用户',
      key: 'user',
      width: 200,
      render: (record: Order) => (
        <div>
          <div><UserOutlined /> {record.user_id?.name || '未知用户'}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.user_id?.email}
          </div>
        </div>
      ),
    },
    {
      title: '总金额',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 120,
      render: (price: number) => (
        <Text strong>¥{price?.toFixed(2) || '0.00'}</Text>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (date: string) => (
        <div>
          <ClockCircleOutlined /> {new Date(date).toLocaleDateString()}
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
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => viewOrderDetails(record)}
          >
            详情
          </Button>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleUpdateStatus(record.id)}
          >
            状态
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', padding: '24px', backgroundColor: '#F9FAFB' }}>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
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
              title="待处理订单"
              value={pendingOrders}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已完成订单"
              value={completedOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#52c41a' }}
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
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和操作栏 */}
      <div className="mb-6 flex justify-between items-center">
        <Title level={4} className="mb-0">订单管理</Title>
        <Space>
          <Search
            placeholder="搜索订单ID、用户或状态"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button onClick={() => refetch()}>刷新</Button>
        </Space>
      </div>

      {/* 订单表格 */}
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条订单记录`,
          size: 'default',
          position: ['bottomCenter']
        }}
        scroll={{ y: 'calc(100vh - 280px)' }}
        size="middle"
      />      {/* 订单详情弹窗 */}
      <Modal
        title="订单详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={800}
      >
        {selectedOrder && (
          <div>
            <Descriptions bordered column={2} style={{ marginBottom: 16 }}>
              <Descriptions.Item label="订单ID" span={2}>
                <Text code copyable={{ text: selectedOrder.id }}>
                  {selectedOrder.id}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="用户姓名">
                {selectedOrder.user_id?.name || '未知用户'}
              </Descriptions.Item>
              <Descriptions.Item label="用户邮箱">
                {selectedOrder.user_id?.email}
              </Descriptions.Item>
              <Descriptions.Item label="总金额">
                <Text strong style={{ color: '#f50' }}>
                  ¥{selectedOrder.total_price?.toFixed(2) || '0.00'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="订单状态">
                <Tag color={getStatusColor(selectedOrder.status || '')}>
                  {getStatusText(selectedOrder.status || '')}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {selectedOrder.created_at ? new Date(selectedOrder.created_at).toLocaleString() : ''}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {selectedOrder.updated_at ? new Date(selectedOrder.updated_at).toLocaleString() : ''}
              </Descriptions.Item>
            </Descriptions>

            <Divider>订单商品</Divider>
            <Table
              columns={[
                {
                  title: '商品名称',
                  key: 'product_name',
                  render: (record: any) => record.product_id?.name || '未知商品',
                },
                {
                  title: '商品描述',
                  key: 'product_description',
                  render: (record: any) => record.product_id?.description || '-',
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
                  render: (price: number) => `¥${price?.toFixed(2) || '0.00'}`,
                },
                {
                  title: '小计',
                  key: 'subtotal',
                  render: (record: any) => {
                    const subtotal = (record.quantity || 0) * (record.price || 0);
                    return `¥${subtotal.toFixed(2)}`;
                  },
                },
              ]}
              dataSource={orderItems}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </div>
        )}
      </Modal>

      {/* 更新状态弹窗 */}
      <Modal
        title="更新订单状态"
        open={statusModalVisible}
        onOk={confirmUpdateStatus}
        onCancel={() => setStatusModalVisible(false)}
        okText="确认更新"
        cancelText="取消"
      >
        <div style={{ marginBottom: 16 }}>
          <label>新状态：</label>
          <Select
            value={newStatus}
            onChange={setNewStatus}
            style={{ width: '100%', marginTop: 8 }}
          >
            <Option value="pending">待处理</Option>
            <Option value="processing">处理中</Option>
            <Option value="completed">已完成</Option>
            <Option value="cancelled">已取消</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <OrdersContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
