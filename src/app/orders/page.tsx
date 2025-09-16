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
  Divider,
  Input
} from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { 
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  GetOrdersQuery
} from '../../generated/graphql';
import { ProtectedRoute, AdminLayout } from '@components';
import { TokenManager } from '@lib/auth';
import { exportOrders } from '@lib/utils';

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

  // 获取当前用户 ID
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
  }, []);

  // 查询订单列表
  const { data: ordersData, loading, error, refetch } = useGetOrdersQuery({
    variables: userId ? { userId } : undefined,
    skip: !userId // 如果没有用户 ID 就跳过查询
  });
  
  // 由于schema中没有order_items表，这里先注释掉相关的查询
  // const { data: orderItemsData } = useGetOrderItemsQuery({
  //   variables: { orderId: selectedOrder?.id as any },
  //   skip: !selectedOrder?.id
  // });

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
  // 暂时使用空数组，等实现order_items功能时再修复
  const orderItems: any[] = [];

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
      order.customer?.nick_name?.toLowerCase().includes(searchLower) ||
      order.customer?.id?.toString().includes(searchLower) ||
      order.status?.toLowerCase().includes(searchLower) ||
      order.boutique?.name?.toLowerCase().includes(searchLower) ||
      order.boutique?.address?.toLowerCase().includes(searchLower)
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

  // 处理导出功能
  const handleExport = () => {
    try {
      if (orders.length === 0) {
        message.warning('暂无数据可导出');
        return;
      }
      exportOrders(orders);
      message.success('数据导出成功');
    } catch (error) {
      console.error('导出失败:', error);
      message.error('导出失败，请重试');
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
      title: '客户',
      key: 'customer',
      width: 200,
      render: (record: Order) => (
        <div>
          <div><UserOutlined /> {record.customer?.nick_name || `用户ID: ${record.customer?.id || '未知'}`}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            客户
          </div>
        </div>
      ),
    },
    {
      title: '所属店铺',
      key: 'boutique',
      width: 180,
      render: (record: Order) => {
        if (record.boutique) {
          return (
            <div>
              <div style={{ fontWeight: 500 }}>{record.boutique.name}</div>
              {record.boutique.address && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                  {record.boutique.address}
                </div>
              )}
            </div>
          );
        }
        return <Tag>未分配店铺</Tag>;
      },
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
      dataIndex: 'date_created',
      key: 'date_created',
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
          <Button 
            icon={<DownloadOutlined />}
            onClick={handleExport}
            disabled={orders.length === 0}
          >
            导出数据
          </Button>
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
              <Descriptions.Item label="客户昵称">
                {selectedOrder.customer?.nick_name || '未设置昵称'}
              </Descriptions.Item>
              <Descriptions.Item label="客户ID">
                {selectedOrder.customer?.id || '未知用户'}
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
                {selectedOrder.date_created ? new Date(selectedOrder.date_created).toLocaleString() : ''}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {selectedOrder.date_updated ? new Date(selectedOrder.date_updated).toLocaleString() : ''}
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
