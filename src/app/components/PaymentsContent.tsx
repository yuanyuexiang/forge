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
  Input
} from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  DollarOutlined,
  CreditCardOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

interface Order {
  id: string;
  user_id: string;
  total_price: number;
  status: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

interface Payment {
  id: string;
  order_id: string;
  payment_method: string;
  amount: number;
  status: string;
  transaction_id?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
  order: Order;
}

const PaymentsContent: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [updatingPaymentId, setUpdatingPaymentId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // 加载支付数据
  const loadPayments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/payments', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
        setFilteredPayments(data);
        console.log('支付数据加载成功:', data);
      } else {
        message.error('加载支付数据失败');
      }
    } catch (error) {
      console.error('加载支付数据失败:', error);
      message.error('加载支付数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  // 筛选支付记录
  useEffect(() => {
    let filtered = payments;

    // 按状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // 按搜索文本筛选
    if (searchText) {
      filtered = filtered.filter(payment => 
        payment.id.toLowerCase().includes(searchText.toLowerCase()) ||
        payment.order_id.toLowerCase().includes(searchText.toLowerCase()) ||
        payment.transaction_id?.toLowerCase().includes(searchText.toLowerCase()) ||
        payment.order.user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredPayments(filtered);
  }, [payments, statusFilter, searchText]);

  // 支付状态标签颜色
  const getPaymentStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'pending': 'orange',
      'paid': 'green',
      'failed': 'red',
      'refunded': 'gray',
      'processing': 'blue'
    };
    return statusColors[status] || 'default';
  };

  // 支付方式图标
  const getPaymentMethodIcon = (method: string) => {
    const methodIcons: { [key: string]: React.ReactNode } = {
      'credit_card': <CreditCardOutlined />,
      'debit_card': <CreditCardOutlined />,
      'paypal': <DollarOutlined />,
      'wechat': <DollarOutlined />,
      'alipay': <DollarOutlined />,
    };
    return methodIcons[method] || <DollarOutlined />;
  };

  // 查看支付详情
  const viewPaymentDetail = (payment: Payment) => {
    setSelectedPayment(payment);
    setDetailModalVisible(true);
  };

  // 更新支付状态
  const updatePaymentStatus = async () => {
    if (!updatingPaymentId || !newStatus) return;

    try {
      const token = localStorage.getItem('admin_token');
      const updateData: any = { status: newStatus };
      
      // 如果状态改为已支付，设置支付时间
      if (newStatus === 'paid') {
        updateData.paid_at = new Date().toISOString();
      }

      const response = await fetch(`/api/payments?id=${updatingPaymentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        message.success('支付状态更新成功');
        loadPayments();
        setStatusModalVisible(false);
        setUpdatingPaymentId(null);
        setNewStatus('');
      } else {
        message.error('更新支付状态失败');
      }
    } catch (error) {
      console.error('更新支付状态失败:', error);
      message.error('更新支付状态失败');
    }
  };

  const openStatusModal = (paymentId: string, currentStatus: string) => {
    setUpdatingPaymentId(paymentId);
    setNewStatus(currentStatus);
    setStatusModalVisible(true);
  };

  // 表格列定义
  const columns = [
    {
      title: '支付ID',
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
      title: '订单ID',
      dataIndex: 'order_id',
      key: 'order_id',
      width: 120,
      render: (orderId: string) => (
        <Text code copyable>
          {orderId.slice(0, 8)}...
        </Text>
      ),
    },
    {
      title: '客户信息',
      key: 'customer',
      render: (record: Payment) => (
        <div>
          <div>
            {record.order.user.first_name} {record.order.user.last_name}
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.order.user.email}
          </Text>
        </div>
      ),
    },
    {
      title: '支付方式',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render: (method: string) => (
        <div>
          {getPaymentMethodIcon(method)} {method.replace('_', ' ').toUpperCase()}
        </div>
      ),
    },
    {
      title: '支付金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <Statistic
          value={amount}
          prefix={<DollarOutlined />}
          precision={2}
          valueStyle={{ fontSize: '14px' }}
        />
      ),
    },
    {
      title: '支付状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag 
          color={getPaymentStatusColor(status)} 
          icon={
            status === 'paid' ? <CheckCircleOutlined /> :
            status === 'failed' ? <CloseCircleOutlined /> :
            <ClockCircleOutlined />
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '交易ID',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      render: (transactionId?: string) => (
        transactionId ? (
          <Text code copyable>
            {transactionId.slice(0, 12)}...
          </Text>
        ) : (
          <Text type="secondary">-</Text>
        )
      ),
    },
    {
      title: '支付时间',
      dataIndex: 'paid_at',
      key: 'paid_at',
      render: (date?: string) => (
        date ? (
          <div>
            <ClockCircleOutlined /> {new Date(date).toLocaleDateString()}
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {new Date(date).toLocaleTimeString()}
            </Text>
          </div>
        ) : (
          <Text type="secondary">未支付</Text>
        )
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (record: Payment) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => viewPaymentDetail(record)}
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
  const totalPayments = payments.length;
  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidPayments = payments.filter(payment => payment.status === 'paid').length;
  const pendingPayments = payments.filter(payment => payment.status === 'pending').length;

  return (
    <div style={{ padding: '24px' }}>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总支付记录"
              value={totalPayments}
              prefix={<CreditCardOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总支付金额"
              value={totalAmount}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="已支付"
              value={paidPayments}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待支付"
              value={pendingPayments}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 支付记录列表 */}
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={4} style={{ margin: 0 }}>支付管理</Title>
            </Col>
            <Col>
              <Space>
                <Search
                  placeholder="搜索支付ID、订单ID、交易ID或邮箱"
                  allowClear
                  style={{ width: 300 }}
                  onSearch={setSearchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Select
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{ width: 120 }}
                >
                  <Option value="all">全部状态</Option>
                  <Option value="pending">待支付</Option>
                  <Option value="paid">已支付</Option>
                  <Option value="failed">支付失败</Option>
                  <Option value="refunded">已退款</Option>
                  <Option value="processing">处理中</Option>
                </Select>
                <Button onClick={loadPayments} loading={loading}>
                  刷新数据
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
        
        <Table
          dataSource={filteredPayments}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
          scroll={{ x: 1400 }}
        />
      </Card>

      {/* 支付详情模态框 */}
      <Modal
        title="支付详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedPayment && (
          <div>
            <Descriptions title="支付信息" bordered column={2}>
              <Descriptions.Item label="支付ID">{selectedPayment.id}</Descriptions.Item>
              <Descriptions.Item label="支付状态">
                <Tag color={getPaymentStatusColor(selectedPayment.status)}>
                  {selectedPayment.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="支付方式">
                {getPaymentMethodIcon(selectedPayment.payment_method)} 
                {selectedPayment.payment_method.replace('_', ' ').toUpperCase()}
              </Descriptions.Item>
              <Descriptions.Item label="支付金额">¥{selectedPayment.amount}</Descriptions.Item>
              <Descriptions.Item label="交易ID">
                {selectedPayment.transaction_id || '暂无'}
              </Descriptions.Item>
              <Descriptions.Item label="支付时间">
                {selectedPayment.paid_at ? 
                  new Date(selectedPayment.paid_at).toLocaleString() : 
                  '未支付'
                }
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {new Date(selectedPayment.created_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {new Date(selectedPayment.updated_at).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions title="订单信息" bordered column={2} style={{ marginTop: 16 }}>
              <Descriptions.Item label="订单ID">{selectedPayment.order_id}</Descriptions.Item>
              <Descriptions.Item label="订单状态">{selectedPayment.order.status}</Descriptions.Item>
              <Descriptions.Item label="订单金额">¥{selectedPayment.order.total_price}</Descriptions.Item>
              <Descriptions.Item label="客户姓名">
                {selectedPayment.order.user.first_name} {selectedPayment.order.user.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="客户邮箱" span={2}>
                {selectedPayment.order.user.email}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* 更新状态模态框 */}
      <Modal
        title="更新支付状态"
        open={statusModalVisible}
        onOk={updatePaymentStatus}
        onCancel={() => {
          setStatusModalVisible(false);
          setUpdatingPaymentId(null);
          setNewStatus('');
        }}
      >
        <Select
          value={newStatus}
          onChange={setNewStatus}
          style={{ width: '100%' }}
          placeholder="选择新状态"
        >
          <Option value="pending">待支付</Option>
          <Option value="processing">处理中</Option>
          <Option value="paid">已支付</Option>
          <Option value="failed">支付失败</Option>
          <Option value="refunded">已退款</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default PaymentsContent;
