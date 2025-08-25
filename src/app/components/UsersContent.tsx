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

const { Title, Text } = Typography;
const { Search } = Input;

// 使用生成的类型
type User = GetUsersQuery['users'][0];

export default function UsersContent() {
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
    <div className="p-6">
      <Card>
        {/* 页面标题和统计 */}
        <div className="mb-6">
          <Title level={2} className="mb-4">用户管理</Title>
          
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Statistic
                title="总用户数"
                value={users.length}
                prefix={<UserOutlined />}
              />
            </Col>
          </Row>
        </div>

        {/* 搜索和筛选 */}
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} sm={12} md={8}>
            <Search
              placeholder="搜索用户名或邮箱"
              allowClear
              onSearch={(value) => setSearchText(value)}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
        </Row>

        {/* 用户列表表格 */}
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
          }}
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
      </Card>
    </div>
  );
}
