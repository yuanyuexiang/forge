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
  Input,
  Alert
} from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  SyncOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { 
  useUpdateOrderStatusMutation,
  GetOrdersQuery
} from '../../generated/graphql';
import { ProtectedRoute, AdminLayout, BoutiqueSelector, RealtimeIndicator } from '@components';
import { useRealtimeOrders } from '../../hooks/useRealtimeOrders';
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
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string | undefined>(undefined);

  // 使用实时订单 Hook
  const { 
    orders, 
    loading, 
    error, 
    statistics, 
    refetch,
    connected 
  } = useRealtimeOrders(selectedBoutiqueId, true);

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

  // 处理错误
  if (error) {
    console.error('获取订单列表失败:', error);
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
      title: '店铺',
      key: 'boutique',
      width: 180,
      render: (record: Order) => (
        <div>
          <div>{record.boutique?.name || '未知店铺'}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.boutique?.address}
          </div>
        </div>
      ),
    },
    {
      title: '订单金额',
      dataIndex: 'total_price',
      key: 'total_price',
      width: 120,
      render: (price: number) => (
        <Text strong style={{ color: '#ff4d4f' }}>
          ¥{price?.toFixed(2) || '0.00'}
        </Text>
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
      width: 180,
      render: (date: string) => (
        <div>
          <div>{new Date(date).toLocaleDateString('zh-CN')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {new Date(date).toLocaleTimeString('zh-CN')}
          </div>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 200,
      fixed: 'right' as const,
      render: (record: Order) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small"
            icon={<EyeOutlined />}
            onClick={() => viewOrderDetails(record)}
          >
            详情
          </Button>
          <Button 
            type="link" 
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleUpdateStatus(record.id)}
          >
            更新状态
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      {/* 实时统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="总订单数" 
              value={statistics.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="总金额" 
              value={statistics.totalAmount}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="待处理" 
              value={statistics.pendingOrders}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic 
              title="今日订单" 
              value={statistics.todayOrders}
              prefix={<ThunderboltOutlined />}
              suffix={`/ ¥${statistics.todayAmount.toFixed(2)}`}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 实时连接状态提示 */}
      {connected && (
        <Alert
          message={
            <Space>
              <ThunderboltOutlined style={{ color: '#52c41a' }} />
              <span>实时监控已启用 - 新订单将自动显示并播放提示音</span>
            </Space>
          }
          type="success"
          showIcon={false}
          closable
          style={{ marginBottom: 16 }}
        />
      )}

      {/* 主内容卡片 */}
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Space size="middle">
                <BoutiqueSelector
                  value={selectedBoutiqueId}
                  onChange={setSelectedBoutiqueId}
                  placeholder="选择店铺（留空查看全部）"
                  style={{ width: 250 }}
                />
                <Search
                  placeholder="搜索订单ID、客户、店铺..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 300 }}
                  allowClear
                />
                <Button 
                  icon={<SyncOutlined />}
                  onClick={() => refetch()}
                  loading={loading}
                >
                  刷新
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>
                <RealtimeIndicator connected={connected} />
                <Button 
                  type="primary" 
                  icon={<DownloadOutlined />}
                  onClick={handleExport}
                  disabled={orders.length === 0}
                >
                  导出数据
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          loading={loading}
          scroll={{ x: 1200 }}
          pagination={{
            total: filteredOrders.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 订单详情模态框 */}
      <Modal
        title="订单详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {selectedOrder && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="订单ID" span={2}>
              <Text code copyable>{selectedOrder.id}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="客户昵称">
              {selectedOrder.customer?.nick_name || '未知'}
            </Descriptions.Item>
            <Descriptions.Item label="客户OpenID">
              <Text code>{selectedOrder.customer?.open_id || '未知'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="店铺名称">
              {selectedOrder.boutique?.name || '未知'}
            </Descriptions.Item>
            <Descriptions.Item label="店铺地址">
              {selectedOrder.boutique?.address || '未知'}
            </Descriptions.Item>
            <Descriptions.Item label="订单金额" span={2}>
              <Text strong style={{ color: '#ff4d4f', fontSize: '18px' }}>
                ¥{selectedOrder.total_price?.toFixed(2) || '0.00'}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="订单状态">
              <Tag color={getStatusColor(selectedOrder.status || '')}>
                {getStatusText(selectedOrder.status || '')}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {new Date(selectedOrder.date_created).toLocaleString('zh-CN')}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间" span={2}>
              {new Date(selectedOrder.date_updated).toLocaleString('zh-CN')}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* 更新状态模态框 */}
      <Modal
        title="更新订单状态"
        open={statusModalVisible}
        onOk={confirmUpdateStatus}
        onCancel={() => setStatusModalVisible(false)}
        okText="确认更新"
        cancelText="取消"
      >
        <div style={{ marginBottom: 16 }}>
          <Text>选择新状态：</Text>
        </div>
        <Select
          value={newStatus}
          onChange={setNewStatus}
          style={{ width: '100%' }}
        >
          <Option value="pending">待处理</Option>
          <Option value="processing">处理中</Option>
          <Option value="completed">已完成</Option>
          <Option value="cancelled">已取消</Option>
        </Select>
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
