'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  message, 
  Modal, 
  Typography,
  Avatar,
  Tag,
  Input,
  Card,
  Row,
  Col,
  Statistic,
  Empty,
  Descriptions,
  Alert
} from 'antd';
import { 
  UserOutlined, 
  EyeOutlined, 
  WomanOutlined, 
  ManOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
  UserDeleteOutlined,
  SearchOutlined,
  ShopOutlined,
  WechatOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { ProtectedRoute, AdminLayout, BoutiqueSelector } from '@components';
import { 
  useGetCustomersQuery,
  GetCustomersQuery
} from '@generated/graphql';
import { TokenManager } from '@lib/auth';
import { exportCustomers } from '@lib/utils';

const { Title, Text } = Typography;
const { Search } = Input;

// 使用生成的类型
type Customer = GetCustomersQuery['customers'][0];

function CustomersContent() {
  const [selectedUser, setSelectedUser] = useState<Customer | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string | undefined>(undefined);

  // 使用店铺ID过滤的 GraphQL 查询
  const { data, loading, error, refetch } = useGetCustomersQuery({
    variables: selectedBoutiqueId ? { boutiqueId: selectedBoutiqueId } : undefined,
    skip: !selectedBoutiqueId
  });

  // 使用useMemo来避免不必要的重新计算
  const users = useMemo(() => data?.customers || [], [data?.customers]);

  // 过滤用户
  useEffect(() => {
    let filtered = [...users];
    
    if (searchText) {
      filtered = filtered.filter((user: Customer) =>
        user.nick_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.open_id?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredUsers(filtered);
  }, [users, searchText]);

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Title level={4}>加载中...</Title>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          message="加载失败"
          description={`无法加载客户数据: ${error.message}`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const showUserDetail = (user: Customer) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // 获取性别显示文本
  const getSexText = (sex: number | null | undefined) => {
    switch (sex) {
      case 1: return '男';
      case 2: return '女';
      default: return '未知';
    }
  };

  // 获取状态显示文本
  const getStatusText = (status: string | null | undefined) => {
    switch (status) {
      case 'active': return '活跃';
      case 'inactive': return '不活跃';
      case 'banned': return '已封禁';
      default: return '未知';
    }
  };

  // 处理导出功能
  const handleExport = () => {
    try {
      if (users.length === 0) {
        message.warning('暂无数据可导出');
        return;
      }
      exportCustomers(users);
      message.success('数据导出成功');
    } catch (error) {
      console.error('导出失败:', error);
      message.error('导出失败，请重试');
    }
  };

  const columns = [
    {
      title: '客户信息',
      key: 'userInfo',
      render: (record: Customer) => (
        <Space>
          <Avatar 
            src={record.avatar} 
            icon={<UserOutlined />}
            size="large"
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.nick_name || '未设置昵称'}</div>
            <div style={{ color: '#999', fontSize: '12px' }}>ID: {record.id}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'OpenID',
      dataIndex: 'open_id',
      key: 'open_id',
      render: (openId: string) => (
        <Text code style={{ fontSize: '12px' }}>
          {openId ? openId.substring(0, 20) + '...' : '未设置'}
        </Text>
      ),
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: (sex: number) => (
        <Tag color={sex === 1 ? 'blue' : sex === 2 ? 'pink' : 'default'}>
          {getSexText(sex)}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : status === 'banned' ? 'red' : 'default'}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'date_created',
      key: 'date_created',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (record: Customer) => (
        <Button 
          type="link" 
          icon={<EyeOutlined />}
          onClick={() => showUserDetail(record)}
        >
          查看详情
        </Button>
      ),
    },
  ];

  // 统计信息
  const totalUsers = users.length;
  const activeUsers = users.filter((user: Customer) => user.status === 'active').length;
  const maleUsers = users.filter((user: Customer) => user.sex === 1).length;
  const femaleUsers = users.filter((user: Customer) => user.sex === 2).length;

  return (
    <div style={{ padding: 24, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <WechatOutlined style={{ marginRight: 8, color: '#1890ff' }} />
          客户管理
        </Title>
      </div>

      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="总客户数" 
              value={totalUsers} 
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="活跃客户" 
              value={activeUsers} 
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="男性客户" 
              value={maleUsers} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="女性客户" 
              value={femaleUsers} 
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 筛选和搜索区域 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <BoutiqueSelector
              value={selectedBoutiqueId}
              onChange={setSelectedBoutiqueId}
              placeholder="请选择店铺"
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={6}>
            <Search
              placeholder="搜索客户昵称或OpenID"
              allowClear
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <Space>
              <Button onClick={() => refetch()}>刷新数据</Button>
              <Button 
                icon={<DownloadOutlined />}
                onClick={handleExport}
                disabled={users.length === 0}
              >
                导出数据
              </Button>
              <Text type="secondary">
                共找到 {filteredUsers.length} 个客户
              </Text>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 用户表格 */}
      <Card>
        {!selectedBoutiqueId ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="请先选择一个店铺查看客户数据"
            style={{ padding: '60px 0' }}
          />
        ) : (
          <Table
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            loading={loading}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`,
              size: 'small',
            }}
            size="middle"
          />
        )}
      </Card>

      {/* 用户详情模态框 */}
      <Modal
        title="客户详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {selectedUser && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar 
                src={selectedUser.avatar} 
                icon={<UserOutlined />}
                size={80}
                style={{ marginBottom: 16 }}
              />
              <Title level={4} style={{ margin: 0 }}>
                {selectedUser.nick_name || '未设置昵称'}
              </Title>
            </div>
            
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="客户ID">
                {selectedUser.id}
              </Descriptions.Item>
              <Descriptions.Item label="昵称">
                {selectedUser.nick_name || '未设置'}
              </Descriptions.Item>
              <Descriptions.Item label="OpenID">
                <Text code style={{ fontSize: '12px' }}>
                  {selectedUser.open_id || '未设置'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="性别">
                <Tag color={selectedUser.sex === 1 ? 'blue' : selectedUser.sex === 2 ? 'pink' : 'default'}>
                  {getSexText(selectedUser.sex)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={selectedUser.status === 'active' ? 'green' : selectedUser.status === 'banned' ? 'red' : 'default'}>
                  {getStatusText(selectedUser.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="类型">
                {selectedUser.type || '未设置'}
              </Descriptions.Item>
              <Descriptions.Item label="排序">
                {selectedUser.sort || 0}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {selectedUser.date_created ? new Date(selectedUser.date_created).toLocaleString() : '未知'}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {selectedUser.date_updated ? new Date(selectedUser.date_updated).toLocaleString() : '未知'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function CustomersPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CustomersContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
