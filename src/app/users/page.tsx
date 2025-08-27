'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
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
  Alert
} from 'antd';
import { 
  EyeOutlined, 
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { 
  useGetUsersQuery,
  useUpdateUserMutation,
  GetUsersQuery
} from '../../generated/graphql';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';

const { Title, Text } = Typography;
const { Search } = Input;

// 使用生成的类型
type User = GetUsersQuery['users'][0];

function UsersContent() {
  // 使用 GraphQL hooks 获取用户数据
  const { data, loading, error, refetch } = useGetUsersQuery();
  const [, /* updateUser */] = useUpdateUserMutation({
    onCompleted: () => {
      message.success('用户更新成功');
      refetch();
    },
    onError: (error) => {
      console.error('更新用户失败:', error);
      message.error('更新用户失败');
    }
  });

  const users = data?.users || [];
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  // 筛选用户
  useEffect(() => {
    let filtered = users;

    // 按搜索文本筛选
    if (searchText) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchText]);

  if (error) {
    return (
      <div className="p-6">
        <Alert 
          message="数据加载失败" 
          description="无法获取用户数据，请稍后重试。" 
          type="error" 
          showIcon 
        />
      </div>
    );
  }

  // 查看用户详情
  const showUserDetail = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  // 关闭详情模态框
  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  // 表格列定义
  const columns = [
    {
      title: '用户信息',
      key: 'user_info',
      render: (record: User) => (
        <Space direction="vertical" size={0}>
          <Space>
            <UserOutlined /> <strong>{record.name}</strong>
          </Space>
          <Space>
            <MailOutlined /> <Text type="secondary">{record.email}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => (
        <Space>
          <ClockCircleOutlined />
          <Text>{new Date(date).toLocaleDateString('zh-CN')}</Text>
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: User) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => showUserDetail(record)}
          >
            查看详情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', padding: '24px', backgroundColor: 'white' }}>
      {/* 统计卡片 */}
      {/* <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={users.length}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row> */}

      {/* 搜索和筛选栏 */}
      <div className="mb-6 flex justify-between items-center">
        <Title level={2} className="mb-0">用户管理</Title>
        <Space>
          <Search
            placeholder="搜索用户名或邮箱"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
        </Space>
      </div>

      {/* 用户表格 */}
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条用户记录`,
          size: 'default',
          position: ['bottomCenter']
        }}
        scroll={{ y: 'calc(100vh - 280px)' }}
        size="middle"
      />

      {/* 用户详情模态框 */}
      <Modal
        title="用户详情"
        open={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            关闭
          </Button>,
        ]}
        width={600}
      >
        {selectedUser && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="用户ID">
              {selectedUser.id}
            </Descriptions.Item>
            <Descriptions.Item label="用户名">
              {selectedUser.name}
            </Descriptions.Item>
            <Descriptions.Item label="邮箱">
              {selectedUser.email}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {new Date(selectedUser.created_at).toLocaleString('zh-CN')}
            </Descriptions.Item>
            <Descriptions.Item label="更新时间">
              {new Date(selectedUser.updated_at).toLocaleString('zh-CN')}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <UsersContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
