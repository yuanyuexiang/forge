'use client';

import React, { useState, useMemo } from 'react';
import { 
  Table, Card, Tag, Button, Modal, Descriptions, Typography, Select, 
  message, Space, Statistic, Row, Col, Input, Alert, Skeleton, Empty
} from 'antd';
import { 
  EyeOutlined, EditOutlined, ShoppingCartOutlined, DollarOutlined,
  ClockCircleOutlined, DownloadOutlined, SyncOutlined, ThunderboltOutlined,
  FilterOutlined, ShopOutlined
} from '@ant-design/icons';
import { useUpdateOrderStatusMutation, GetUserOrdersQuery } from '../../generated/graphql';
import { ProtectedRoute, AdminLayout, BoutiqueSelector, RealtimeIndicator } from '@components';
import { useRealtimeOrders } from '../../hooks/useRealtimeOrders';
import { exportOrders } from '@lib/utils';

const { Text } = Typography;
const { Option } = Select;
const { Search } = Input;

type Order = GetUserOrdersQuery['orders'][0];

function OrdersContent() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [processingOrderId, setProcessingOrderId] = useState<string | null>(null);

  const { orders, loading, error, statistics, refetch, connected } = useRealtimeOrders(true);

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

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (selectedBoutiqueId && order.boutique?.id !== selectedBoutiqueId) return false;
      if (selectedStatus && order.status !== selectedStatus) return false;
      if (searchText) {
        const s = searchText.toLowerCase();
        return (
          order.id.toLowerCase().includes(s) ||
          order.customer?.nick_name?.toLowerCase().includes(s) ||
          order.boutique?.name?.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [orders, selectedBoutiqueId, selectedStatus, searchText]);

  const filteredStatistics = useMemo(() => {
    const total = filteredOrders.length;
    const amount = filteredOrders.reduce((sum, o) => sum + (o.total_price || 0), 0);
    const pending = filteredOrders.filter(o => o.status === 'pending' || o.status === 'processing').length;
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = filteredOrders.filter(o => 
      new Date(o.date_created).toISOString().split('T')[0] === today
    );
    return {
      totalOrders: total,
      totalAmount: amount,
      pendingOrders: pending,
      todayOrders: todayOrders.length,
      todayAmount: todayOrders.reduce((sum, o) => sum + (o.total_price || 0), 0)
    };
  }, [filteredOrders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      case 'completed': return 'green';
      case 'cancelled': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待处理';
      case 'processing': return '处理中';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  // 快速处理订单（将状态改为已完成）
  const handleProcessOrder = async (orderId: string) => {
    try {
      setProcessingOrderId(orderId);
      
      await updateOrderStatus({
        variables: {
          id: orderId,
          status: 'completed'
        }
      });
      
      message.success('订单已处理完成');
      refetch();
    } catch (error) {
      console.error('处理订单失败:', error);
      message.error('处理订单失败');
    } finally {
      setProcessingOrderId(null);
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          {[1, 2, 3, 4].map(i => (
            <Col xs={24} sm={12} md={6} key={i}>
              <Card><Skeleton active paragraph={{ rows: 1 }} /></Card>
            </Col>
          ))}
        </Row>
        <Card><Skeleton active paragraph={{ rows: 10 }} /></Card>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Alert message="加载失败" description="无法加载订单数据，请检查网络连接或稍后重试。" type="error" showIcon
          action={<Button size="small" danger onClick={() => refetch()}>重试</Button>}
        />
      </div>
    );
  }

  const columns = [
    {
      title: '订单ID', dataIndex: 'id', key: 'id', width: 120,
      render: (id: string) => <Text code copyable={{ text: id }}>{id.substring(0, 8)}...</Text>
    },
    {
      title: '店铺', key: 'boutique', width: 180,
      render: (record: Order) => (
        <div>
          <div><ShopOutlined /> {record.boutique?.name || '未知'}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.boutique?.address || '-'}</div>
        </div>
      )
    },
    {
      title: '客户', key: 'customer', width: 150,
      render: (record: Order) => (
        <div>
          <div>{record.customer?.nick_name || `用户${record.customer?.id || '未知'}`}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>ID: {record.customer?.id || '-'}</div>
        </div>
      )
    },
    {
      title: '订单金额', dataIndex: 'total_price', key: 'total_price', width: 120,
      sorter: (a: Order, b: Order) => (a.total_price || 0) - (b.total_price || 0),
      render: (price: number) => <Text strong style={{ color: '#ff4d4f' }}>¥{price?.toFixed(2) || '0.00'}</Text>
    },
    {
      title: '状态', dataIndex: 'status', key: 'status', width: 100,
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
    },
    {
      title: '创建时间', dataIndex: 'date_created', key: 'date_created', width: 180,
      sorter: (a: Order, b: Order) => new Date(a.date_created).getTime() - new Date(b.date_created).getTime(),
      render: (date: string) => (
        <div>
          <div>{new Date(date).toLocaleDateString('zh-CN')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{new Date(date).toLocaleTimeString('zh-CN')}</div>
        </div>
      )
    },
    {
      title: '操作', key: 'actions', width: 240, fixed: 'right' as const,
      render: (record: Order) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EyeOutlined />}
            onClick={() => { setSelectedOrder(record); setDetailModalVisible(true); }}>详情</Button>
          <Button type="link" size="small" icon={<EditOutlined />}
            onClick={() => { 
              setUpdatingOrderId(record.id); 
              setNewStatus(record.status || ''); 
              setStatusModalVisible(true); 
            }}>更新状态</Button>
          
          {/* 处理按钮 */}
          {record.status !== 'completed' ? (
            <Button 
              type="primary" 
              size="small"
              onClick={() => handleProcessOrder(record.id)}
              loading={processingOrderId === record.id}
            >
              处理
            </Button>
          ) : (
            <Tag color="green">已处理</Tag>
          )}
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      {/* 加载骨架屏 */}
      {loading ? (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            {[1, 2, 3, 4].map(i => (
              <Col xs={24} sm={12} md={6} key={i}>
                <Card><Skeleton active paragraph={{ rows: 1 }} /></Card>
              </Col>
            ))}
          </Row>
          <Card>
            <Skeleton active paragraph={{ rows: 10 }} />
          </Card>
        </>
      ) : error ? (
        <Alert message="加载失败" 
          description={error.message || '获取订单数据失败，请稍后重试'}
          type="error" showIcon 
          action={<Button size="small" onClick={() => refetch()}>重试</Button>}
        />
      ) : (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title={selectedBoutiqueId || selectedStatus ? "筛选结果" : "总订单数"} 
                  value={filteredStatistics.totalOrders}
                  prefix={<ShoppingCartOutlined />}
                  suffix={selectedBoutiqueId || selectedStatus ? `/ ${statistics.totalOrders}` : ''}
                  valueStyle={{ color: '#3f8600' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="总金额" value={filteredStatistics.totalAmount} precision={2}
                  prefix={<DollarOutlined />} suffix="元" valueStyle={{ color: '#cf1322' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="待处理" value={filteredStatistics.pendingOrders}
                  prefix={<ClockCircleOutlined />} valueStyle={{ color: '#faad14' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic title="今日订单" value={filteredStatistics.todayOrders}
                  prefix={<ThunderboltOutlined />} suffix={`/ ¥${filteredStatistics.todayAmount.toFixed(2)}`}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
              </Row>

          {connected && (
            <Alert
              message={<Space><ThunderboltOutlined style={{ color: '#52c41a' }} /><span>实时监控已启用 - 所有授权店铺的新订单将自动显示并播放提示音</span></Space>}
              type="success" showIcon={false} closable style={{ marginBottom: 16 }}
            />
          )}

          <Card>
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16} align="middle">
                <Col flex="auto">
                  <Space size="middle" wrap>
                    <BoutiqueSelector value={selectedBoutiqueId} onChange={setSelectedBoutiqueId} placeholder="全部店铺" style={{ width: 200 }} />
                    <Select value={selectedStatus} onChange={setSelectedStatus} placeholder="全部状态" style={{ width: 150 }} allowClear>
                      <Option value="pending">待处理</Option>
                      <Option value="processing">处理中</Option>
                      <Option value="completed">已完成</Option>
                      <Option value="cancelled">已取消</Option>
                    </Select>
                    <Search placeholder="搜索订单ID、客户、店铺..." value={searchText} 
                      onChange={(e) => setSearchText(e.target.value)} style={{ width: 300 }} allowClear />
                    {(selectedBoutiqueId || selectedStatus || searchText) && (
                      <Button icon={<FilterOutlined />} onClick={() => { 
                        setSelectedBoutiqueId(undefined); 
                        setSelectedStatus(undefined); 
                        setSearchText(''); 
                      }}>清除筛选</Button>
                    )}
                  </Space>
                </Col>
                <Col>
                  <Space>
                    <RealtimeIndicator connected={connected} />
                    <Button icon={<SyncOutlined />} onClick={() => refetch()} loading={loading}>刷新</Button>
                    <Button type="primary" icon={<DownloadOutlined />} disabled={filteredOrders.length === 0}
                      onClick={() => { 
                        if (filteredOrders.length === 0) { message.warning('暂无数据可导出'); return; }
                        exportOrders(filteredOrders); 
                        message.success('数据导出成功'); 
                      }}>导出</Button>
                  </Space>
                </Col>
              </Row>
            </div>

            {filteredOrders.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>{orders.length === 0 ? "暂无订单数据" : "没有符合筛选条件的订单"}</span>}>
                {orders.length === 0 && <Button type="primary" onClick={() => refetch()}>刷新数据</Button>}
              </Empty>
            ) : (
              <Table columns={columns} dataSource={filteredOrders} rowKey="id" loading={false} scroll={{ x: 1300 }}
                pagination={{ total: filteredOrders.length, pageSize: 10, showSizeChanger: true, 
                  showQuickJumper: true, showTotal: (total) => `共 ${total} 条记录` }}
              />
            )}
          </Card>
        </>
      )}

      <Modal title="订单详情" open={detailModalVisible} onCancel={() => setDetailModalVisible(false)}
        footer={[<Button key="close" onClick={() => setDetailModalVisible(false)}>关闭</Button>]} width={800}>
        {selectedOrder && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="订单ID" span={2}><Text code copyable>{selectedOrder.id}</Text></Descriptions.Item>
            <Descriptions.Item label="店铺名称">{selectedOrder.boutique?.name || '未知'}</Descriptions.Item>
            <Descriptions.Item label="店铺地址">{selectedOrder.boutique?.address || '未知'}</Descriptions.Item>
            <Descriptions.Item label="客户昵称">{selectedOrder.customer?.nick_name || '未知'}</Descriptions.Item>
            <Descriptions.Item label="客户OpenID"><Text code>{selectedOrder.customer?.open_id || '未知'}</Text></Descriptions.Item>
            <Descriptions.Item label="订单金额" span={2}>
              <Text strong style={{ color: '#ff4d4f', fontSize: '18px' }}>¥{selectedOrder.total_price?.toFixed(2) || '0.00'}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="订单状态">
              <Tag color={getStatusColor(selectedOrder.status || '')}>{getStatusText(selectedOrder.status || '')}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">{new Date(selectedOrder.date_created).toLocaleString('zh-CN')}</Descriptions.Item>
            <Descriptions.Item label="更新时间" span={2}>{new Date(selectedOrder.date_updated).toLocaleString('zh-CN')}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal title="更新订单状态" open={statusModalVisible} 
        onOk={() => {
          if (updatingOrderId && newStatus) {
            updateOrderStatus({ variables: { id: updatingOrderId, status: newStatus } });
          }
        }}
        onCancel={() => setStatusModalVisible(false)} okText="确认更新" cancelText="取消">
        <div style={{ marginBottom: 16 }}><Text>选择新状态：</Text></div>
        <Select value={newStatus} onChange={setNewStatus} style={{ width: '100%' }}>
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
