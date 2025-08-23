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
  message,
  Space,
  Statistic,
  Row,
  Col,
  Input,
  Select
} from 'antd';
import { 
  EyeOutlined, 
  EditOutlined, 
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

interface Order {
  id: string;
  total_price: number;
  status: string;
  created_at: string;
  order_items: Array<{
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }>;
  payment: {
    payment_method: string;
    status: string;
  };
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  status: string;
  created_at: string;
  last_access?: string;
  orders: Order[];
}

const UsersContent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // 加载用户数据
  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        console.log('用户数据加载成功:', data);
      } else {
        message.error('加载用户数据失败');
      }
    } catch (error) {
      console.error('加载用户数据失败:', error);
      message.error('加载用户数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 筛选用户
  useEffect(() => {
    let filtered = users;

    // 按状态筛选
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // 按搜索文本筛选
    if (searchText) {
      filtered = filtered.filter(user => 
        user.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [users, statusFilter, searchText]);

  // 用户状态标签颜色
  const getUserStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'active': 'green',
      'inactive': 'orange',
      'suspended': 'red',
      'pending': 'blue'
    };
    return statusColors[status] || 'default';
  };

  // 查看用户详情
  const viewUserDetail = (user: User) => {
    setSelectedUser(user);
    setDetailModalVisible(true);
  };

  // 更新用户状态
  const updateUserStatus = async () => {
    if (!updatingUserId || !newStatus) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/users?id=${updatingUserId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        message.success('用户状态更新成功');
        loadUsers();
        setStatusModalVisible(false);
        setUpdatingUserId(null);
        setNewStatus('');
      } else {
        message.error('更新用户状态失败');
      }
    } catch (error) {
      console.error('更新用户状态失败:', error);
      message.error('更新用户状态失败');
    }
  };

  const openStatusModal = (userId: string, currentStatus: string) => {
    setUpdatingUserId(userId);
    setNewStatus(currentStatus);
    setStatusModalVisible(true);
  };

  // 表格列定义
  const columns = [
    {
      title: '用户ID',
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
      title: '用户信息',
      key: 'user_info',
      render: (record: User) => (
        <div>
          <div>
            <UserOutlined /> {record.first_name} {record.last_name}
          </div>
          <div style={{ marginTop: 4 }}>
            <MailOutlined /> <Text type="secondary">{record.email}</Text>
          </div>
          {record.phone && (
            <div style={{ marginTop: 4 }}>
              <PhoneOutlined /> <Text type="secondary">{record.phone}</Text>
            </div>
          )}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getUserStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: '订单统计',
      key: 'order_stats',
      render: (record: User) => {
        const totalOrders = record.orders?.length || 0;
        const totalSpent = record.orders?.reduce((sum, order) => sum + order.total_price, 0) || 0;
        return (
          <div>
            <div>
              <ShoppingCartOutlined /> {totalOrders} 个订单
            </div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              消费总额: ¥{totalSpent.toFixed(2)}
            </Text>
          </div>
        );
      },
    },
    {
      title: '注册时间',
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
      title: '最后登录',
      dataIndex: 'last_access',
      key: 'last_access',
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
          <Text type="secondary">从未登录</Text>
        )
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (record: User) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => viewUserDetail(record)}
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
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const totalOrders = users.reduce((sum, user) => sum + (user.orders?.length || 0), 0);
  const totalRevenue = users.reduce((sum, user) => 
    sum + (user.orders?.reduce((orderSum, order) => orderSum + order.total_price, 0) || 0), 0
  );

  return (
    <div style={{ padding: '24px' }}>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={activeUsers}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
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
              prefix="¥"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      {/* 用户列表 */}
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={4} style={{ margin: 0 }}>用户管理</Title>
            </Col>
            <Col>
              <Space>
                <Search
                  placeholder="搜索用户姓名、邮箱或电话"
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
                  <Option value="active">活跃</Option>
                  <Option value="inactive">不活跃</Option>
                  <Option value="suspended">已暂停</Option>
                  <Option value="pending">待验证</Option>
                </Select>
                <Button onClick={loadUsers} loading={loading}>
                  刷新数据
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
        
        <Table
          dataSource={filteredUsers}
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

      {/* 用户详情模态框 */}
      <Modal
        title="用户详情"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedUser && (
          <div>
            <Descriptions title="基本信息" bordered column={2}>
              <Descriptions.Item label="用户ID">{selectedUser.id}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={getUserStatusColor(selectedUser.status)}>
                  {selectedUser.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="姓名">
                {selectedUser.first_name} {selectedUser.last_name}
              </Descriptions.Item>
              <Descriptions.Item label="邮箱">{selectedUser.email}</Descriptions.Item>
              <Descriptions.Item label="电话">
                {selectedUser.phone || '未填写'}
              </Descriptions.Item>
              <Descriptions.Item label="注册时间">
                {new Date(selectedUser.created_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="最后登录">
                {selectedUser.last_access ? 
                  new Date(selectedUser.last_access).toLocaleString() : 
                  '从未登录'
                }
              </Descriptions.Item>
            </Descriptions>

            {selectedUser.orders && selectedUser.orders.length > 0 && (
              <>
                <Title level={5} style={{ marginTop: 24 }}>订单历史</Title>
                <Table
                  dataSource={selectedUser.orders}
                  pagination={false}
                  size="small"
                  columns={[
                    {
                      title: '订单ID',
                      dataIndex: 'id',
                      key: 'order_id',
                      render: (id: string) => id.slice(0, 8) + '...',
                    },
                    {
                      title: '金额',
                      dataIndex: 'total_price',
                      key: 'total_price',
                      render: (price: number) => `¥${price}`,
                    },
                    {
                      title: '状态',
                      dataIndex: 'status',
                      key: 'order_status',
                      render: (status: string) => (
                        <Tag>{status.toUpperCase()}</Tag>
                      ),
                    },
                    {
                      title: '创建时间',
                      dataIndex: 'created_at',
                      key: 'order_created_at',
                      render: (date: string) => new Date(date).toLocaleDateString(),
                    },
                  ]}
                />
              </>
            )}
          </div>
        )}
      </Modal>

      {/* 更新状态模态框 */}
      <Modal
        title="更新用户状态"
        open={statusModalVisible}
        onOk={updateUserStatus}
        onCancel={() => {
          setStatusModalVisible(false);
          setUpdatingUserId(null);
          setNewStatus('');
        }}
      >
        <Select
          value={newStatus}
          onChange={setNewStatus}
          style={{ width: '100%' }}
          placeholder="选择新状态"
        >
          <Option value="active">活跃</Option>
          <Option value="inactive">不活跃</Option>
          <Option value="suspended">已暂停</Option>
          <Option value="pending">待验证</Option>
        </Select>
      </Modal>
    </div>
  );
};

export default UsersContent;
