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
  Form
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
import { 
  useGetPaymentsQuery,
  useUpdatePaymentStatusMutation,
  GetPaymentsQuery
} from '../../generated/graphql';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

// 使用生成的类型
type Payment = GetPaymentsQuery['payments'][0];

function PaymentsContent() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [updatingPaymentId, setUpdatingPaymentId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 查询支付列表
  const { data: paymentsData, loading, error, refetch } = useGetPaymentsQuery();

  // 更新支付状态
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation({
    onCompleted: () => {
      message.success('支付状态更新成功');
      setStatusModalVisible(false);
      setUpdatingPaymentId(null);
      refetch();
    },
    onError: (error) => {
      console.error('更新支付状态失败:', error);
      message.error('更新支付状态失败');
    }
  });

  const payments = paymentsData?.payments || [];

  // 处理错误
  if (error) {
    console.error('获取支付数据失败:', error);
    message.error('获取支付数据失败');
  }

  // 过滤支付记录
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = !searchText || 
      payment.id.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.order_id?.id?.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.order_id?.user_id?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.order_id?.user_id?.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      payment.payment_method?.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 计算统计数据
  const totalPayments = payments.length;
  const pendingPayments = payments.filter(payment => payment.status === 'pending').length;
  const completedPayments = payments.filter(payment => payment.status === 'completed').length;
  const failedPayments = payments.filter(payment => payment.status === 'failed').length;
  const totalAmount = payments
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + (payment.amount || 0), 0);

  // 状态标签颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      case 'completed': return 'green';
      case 'failed': return 'red';
      case 'cancelled': return 'red';
      default: return 'default';
    }
  };

  // 状态显示文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待支付';
      case 'processing': return '处理中';
      case 'completed': return '支付成功';
      case 'failed': return '支付失败';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  // 支付方式图标
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card': return <CreditCardOutlined />;
      case 'alipay': return <DollarOutlined />;
      case 'wechat': return <DollarOutlined />;
      default: return <CreditCardOutlined />;
    }
  };

  // 支付方式显示文本
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit_card': return '信用卡';
      case 'alipay': return '支付宝';
      case 'wechat': return '微信支付';
      case 'bank_transfer': return '银行转账';
      default: return method;
    }
  };

  // 查看支付详情
  const viewPaymentDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setDetailModalVisible(true);
  };

  // 更新状态
  const handleUpdateStatus = (paymentId: string) => {
    setUpdatingPaymentId(paymentId);
    const payment = payments.find(p => p.id === paymentId);
    setNewStatus(payment?.status || '');
    setStatusModalVisible(true);
  };

  // 确认更新状态
  const confirmUpdateStatus = () => {
    if (updatingPaymentId && newStatus) {
      updatePaymentStatus({
        variables: {
          id: updatingPaymentId,
          status: newStatus
        }
      });
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '支付ID',
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
      title: '订单ID',
      key: 'order_id',
      width: 120,
      render: (record: Payment) => (
        <Text code copyable={{ text: record.order_id?.id || '' }}>
          {record.order_id?.id?.substring(0, 8) || ''}...
        </Text>
      ),
    },
    {
      title: '用户',
      key: 'user',
      width: 180,
      render: (record: Payment) => (
        <div>
          <div>{record.order_id?.user_id?.name || '未知用户'}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.order_id?.user_id?.email}
          </div>
        </div>
      ),
    },
    {
      title: '支付方式',
      dataIndex: 'payment_method',
      key: 'payment_method',
      width: 120,
      render: (method: string) => (
        <div>
          {getPaymentMethodIcon(method)} {getPaymentMethodText(method)}
        </div>
      ),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount: number) => (
        <Text strong style={{ color: '#f50' }}>
          ¥{amount?.toFixed(2) || '0.00'}
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
      title: '支付时间',
      dataIndex: 'paid_at',
      key: 'paid_at',
      width: 150,
      render: (date: string) => (
        <div>
          {date ? (
            <>
              <ClockCircleOutlined /> {new Date(date).toLocaleDateString()}
            </>
          ) : '-'}
        </div>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (record: Payment) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => viewPaymentDetails(record)}
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
    <div style={{ height: '100%', padding: '24px', backgroundColor: 'white' }}>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总支付数"
              value={totalPayments}
              prefix={<CreditCardOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="待支付"
              value={pendingPayments}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="支付成功"
              value={completedPayments}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总收款金额"
              value={totalAmount}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 搜索和筛选栏 */}
      <div className="mb-6 flex justify-between items-center">
        <Title level={2} className="mb-0">支付管理</Title>
        <Space>
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 120 }}
          >
            <Option value="all">全部状态</Option>
            <Option value="pending">待支付</Option>
            <Option value="processing">处理中</Option>
            <Option value="completed">支付成功</Option>
            <Option value="failed">支付失败</Option>
            <Option value="cancelled">已取消</Option>
          </Select>
          <Search
            placeholder="搜索支付ID、订单ID或用户"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button onClick={() => refetch()}>刷新</Button>
        </Space>
      </div>

      {/* 支付表格 */}
      <Table
        columns={columns}
        dataSource={filteredPayments}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条支付记录`,
          size: 'default',
          position: ['bottomCenter']
        }}
        scroll={{ y: 'calc(100vh - 280px)' }}
        size="middle"
      />

      {/* 支付详情弹窗 */}
      <Modal
        title="支付详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>,
        ]}
        width={700}
      >
        {selectedPayment && (
          <div>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="支付ID" span={2}>
                <Text code copyable={{ text: selectedPayment.id }}>
                  {selectedPayment.id}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="订单ID">
                <Text code copyable={{ text: selectedPayment.order_id?.id || '' }}>
                  {selectedPayment.order_id?.id}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="订单状态">
                <Tag color={getStatusColor(selectedPayment.order_id?.status || '')}>
                  {getStatusText(selectedPayment.order_id?.status || '')}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="用户姓名">
                {selectedPayment.order_id?.user_id?.name || '未知用户'}
              </Descriptions.Item>
              <Descriptions.Item label="用户邮箱">
                {selectedPayment.order_id?.user_id?.email}
              </Descriptions.Item>
              <Descriptions.Item label="支付方式">
                <div>
                  {getPaymentMethodIcon(selectedPayment.payment_method || '')} {getPaymentMethodText(selectedPayment.payment_method || '')}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="支付金额">
                <Text strong style={{ color: '#f50', fontSize: '16px' }}>
                  ¥{selectedPayment.amount?.toFixed(2) || '0.00'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="订单金额">
                <Text strong>
                  ¥{selectedPayment.order_id?.total_price?.toFixed(2) || '0.00'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="支付状态">
                <Tag color={getStatusColor(selectedPayment.status || '')} style={{ fontSize: '14px' }}>
                  {getStatusText(selectedPayment.status || '')}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="支付时间">
                {selectedPayment.paid_at ? new Date(selectedPayment.paid_at).toLocaleString() : '未支付'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* 更新状态弹窗 */}
      <Modal
        title="更新支付状态"
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
            <Option value="pending">待支付</Option>
            <Option value="processing">处理中</Option>
            <Option value="completed">支付成功</Option>
            <Option value="failed">支付失败</Option>
            <Option value="cancelled">已取消</Option>
          </Select>
        </div>
      </Modal>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PaymentsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
