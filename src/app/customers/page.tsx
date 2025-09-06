'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Alert,
  Avatar,
  Tag
} from 'antd';
import { 
  EyeOutlined, 
  UserOutlined,
  WechatOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined
} from '@ant-design/icons';
import { 
  useGetWechatUsersQuery,
  GetWechatUsersQuery
} from '../../generated/graphql';
import { ProtectedRoute, AdminLayout } from '@components';

const { Title, Text } = Typography;
const { Search } = Input;

// 使用生成的类型
type WechatUser = GetWechatUsersQuery['wechat_users'][0];

function UsersContent() {
  // 使用 GraphQL hooks 获取微信用户数据
  const { data, loading, error, refetch } = useGetWechatUsersQuery();
  const [selectedUser, setSelectedUser] = useState<WechatUser | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<WechatUser[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  // 使用useMemo来避免不必要的重新计算
  const users = useMemo(() => data?.wechat_users || [], [data?.wechat_users]);

  // 过滤用户
  useEffect(() => {
    let filtered = users;
    if (searchText) {
      filtered = filtered.filter(user =>
        user.nickname?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.openid?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.city?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.province?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
  }, [users, searchText]);

  // 错误处理
  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Alert
          message="加载失败"
          description={`无法加载微信用户数据: ${error.message}`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  const showUserDetail = (user: WechatUser) => {
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

  // 获取状态颜色
  const getStatusColor = (isActive: boolean | null | undefined) => {
    return isActive ? 'green' : 'red';
  };

  // 获取状态文本
  const getStatusText = (isActive: boolean | null | undefined) => {
    return isActive ? '活跃' : '非活跃';
  };

  const columns = [
    {
      title: '用户信息',
      key: 'userInfo',
      render: (record: WechatUser) => (
        <Space>
          <Avatar 
            src={record.headimgurl} 
            icon={<UserOutlined />}
            size="large"
          />
          <div>
            <div>
              <Text strong>{record.nickname || '未设置昵称'}</Text>
              <Tag color={getSexText(record.sex) === '男' ? 'blue' : 'pink'} style={{ marginLeft: 8 }}>
                {getSexText(record.sex)}
              </Tag>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <WechatOutlined /> {record.openid?.substring(0, 16)}...
            </div>
          </div>
        </Space>
      )
    },
    {
      title: '地理位置',
      key: 'location',
      render: (record: WechatUser) => (
        <Space direction="vertical" size="small">
          <div>
            <EnvironmentOutlined /> {record.province || '未知'} {record.city || ''}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.country || '中国'}
          </div>
        </Space>
      )
    },
    {
      title: '状态',
      key: 'status',
      render: (record: WechatUser) => (
        <Tag color={getStatusColor(record.is_active)}>
          {getStatusText(record.is_active)}
        </Tag>
      )
    },
    {
      title: '注册时间',
      key: 'created_at',
      render: (record: WechatUser) => (
        <Space>
          <ClockCircleOutlined />
          <Text>{record.created_at ? new Date(record.created_at).toLocaleDateString() : '未知'}</Text>
        </Space>
      )
    },
    {
      title: '操作',
      key: 'actions',
      render: (record: WechatUser) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => showUserDetail(record)}
        >
          查看详情
        </Button>
      )
    }
  ];

  // 计算统计数据
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.is_active).length;
  const maleUsers = users.filter(user => user.sex === 1).length;
  const femaleUsers = users.filter(user => user.sex === 2).length;

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <WechatOutlined /> 客户管理
      </Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总客户数"
              value={totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃客户"
              value={activeUsers}
              prefix={<WechatOutlined />}
              valueStyle={{ color: '#3f8600' }}
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

      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="搜索客户（昵称、OpenID、城市）"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Button onClick={() => refetch()}>刷新</Button>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条客户记录`,
          }}
        />
      </Card>

      <Modal
        title="客户详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedUser && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <Avatar 
                src={selectedUser.headimgurl} 
                icon={<UserOutlined />}
                size={80}
              />
              <div style={{ marginTop: 8 }}>
                <Title level={4}>{selectedUser.nickname || '未设置昵称'}</Title>
                <Tag color={getStatusColor(selectedUser.is_active)}>
                  {getStatusText(selectedUser.is_active)}
                </Tag>
              </div>
            </div>
            
            <Descriptions bordered column={2}>
              <Descriptions.Item label="用户ID">{selectedUser.id}</Descriptions.Item>
              <Descriptions.Item label="昵称">{selectedUser.nickname || '未设置'}</Descriptions.Item>
              <Descriptions.Item label="OpenID" span={2}>
                <Text code copyable={{ text: selectedUser.openid || '' }}>
                  {selectedUser.openid || '未知'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="UnionID" span={2}>
                <Text code copyable={{ text: selectedUser.unionid || '' }}>
                  {selectedUser.unionid || '未设置'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="性别">{getSexText(selectedUser.sex)}</Descriptions.Item>
              <Descriptions.Item label="语言">{selectedUser.language || '未知'}</Descriptions.Item>
              <Descriptions.Item label="国家">{selectedUser.country || '未知'}</Descriptions.Item>
              <Descriptions.Item label="省份">{selectedUser.province || '未知'}</Descriptions.Item>
              <Descriptions.Item label="城市">{selectedUser.city || '未知'}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={getStatusColor(selectedUser.is_active)}>
                  {getStatusText(selectedUser.is_active)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="权限范围">{selectedUser.scope || '基础权限'}</Descriptions.Item>
              <Descriptions.Item label="特权信息">{selectedUser.privilege || '无特权'}</Descriptions.Item>
              <Descriptions.Item label="注册时间">{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : '未知'}</Descriptions.Item>
              <Descriptions.Item label="最后更新">{selectedUser.updated_at ? new Date(selectedUser.updated_at).toLocaleString() : '未知'}</Descriptions.Item>
              {selectedUser.boutique_id && (
                <>
                  <Descriptions.Item label="关联店铺ID">{selectedUser.boutique_id.id}</Descriptions.Item>
                  <Descriptions.Item label="关联店铺名称">{selectedUser.boutique_id.name}</Descriptions.Item>
                </>
              )}
            </Descriptions>
          </div>
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
