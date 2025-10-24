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
  Alert,
  Form
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
  DownloadOutlined,
  EditOutlined
} from '@ant-design/icons';
import { ProtectedRoute, AdminLayout, BoutiqueSelector } from '@components';
import { 
  useGetCustomersQuery,
  GetCustomersQuery,
  useUpdateCustomerMutation
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
  
  // 编辑相关状态
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form] = Form.useForm();

  // 使用店铺ID过滤的 GraphQL 查询
  const { data, loading, error, refetch } = useGetCustomersQuery({
    variables: selectedBoutiqueId ? { boutiqueId: selectedBoutiqueId } : undefined,
    skip: !selectedBoutiqueId
  });
  
  // 更新客户mutation
  const [updateCustomer] = useUpdateCustomerMutation();

  // 使用useMemo来避免不必要的重新计算
  const users = useMemo(() => data?.customers || [], [data?.customers]);

  // 过滤用户
  useEffect(() => {
    let filtered = [...users];
    
    if (searchText) {
      filtered = filtered.filter((user: Customer) =>
        user.nick_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.contact?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.address?.toLowerCase().includes(searchText.toLowerCase()) ||
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
      case 'inactive': return '非活跃';
      case 'banned': return '已封禁';
      default: return '未知';
    }
  };

    // 编辑客户
  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue({
      full_name: customer.full_name || '',
      contact: customer.contact || '',
      address: customer.address || '',
    });
    setEditModalVisible(true);
  };

  // 保存编辑
  const handleSave = async (values: any) => {
    if (!editingCustomer) return;
    
    try {
      await updateCustomer({
        variables: {
          id: editingCustomer.id,
          data: {
            full_name: values.full_name,
            contact: values.contact,
            address: values.address || '',
          },
        },
      });
      
      message.success('客户信息更新成功');
      setEditModalVisible(false);
      setEditingCustomer(null);
      form.resetFields();
      refetch();
    } catch (error) {
      console.error('更新失败:', error);
      message.error('更新失败,请稍后重试');
    }
  };

  // 导出数据
  const handleExport = () => {
    if (filteredUsers.length === 0) {
      message.warning('没有数据可导出');
      return;
    }

    const csvData = filteredUsers.map(user => ({
      '微信昵称': user.nick_name || '',
      '真实姓名': user.full_name || '',
      '联系方式': user.contact || '',
      '邮寄地址': user.address || '',
      'OpenID': user.open_id || '',
      '性别': getSexText(user.sex),
      '状态': getStatusText(user.status),
      '注册时间': new Date(user.date_created).toLocaleString('zh-CN'),
      '店铺': user.boutique?.name || ''
    }));

    exportCustomers(csvData);
    message.success('数据导出成功');
  };

  // 表格列定义
  const columns = [
    {
      title: '用户信息',
      key: 'userInfo',
      width: 250,
      render: (record: Customer) => (
        <Space>
          <Avatar 
            src={record.avatar} 
            icon={<UserOutlined />}
            size="large"
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>
              {record.nick_name || '未设置昵称'}
            </div>
            <div style={{ color: '#999', fontSize: '12px' }}>
              ID: {record.id}
            </div>
            {record.full_name && (
              <div style={{ color: '#1890ff', fontSize: '12px' }}>
                真实姓名: {record.full_name}
              </div>
            )}
          </div>
        </Space>
      ),
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
      width: 150,
      render: (contact: string) => (
        contact ? (
          <Text>{contact}</Text>
        ) : (
          <Text type="secondary">未填写</Text>
        )
      ),
    },
    {
      title: '邮寄地址',
      dataIndex: 'address',
      key: 'address',
      width: 250,
      ellipsis: {
        showTitle: false,
      },
      render: (address: string) => (
        address ? (
          <Text ellipsis={{ tooltip: address }}>{address}</Text>
        ) : (
          <Text type="secondary">未填写</Text>
        )
      ),
    },
    {
      title: 'OpenID',
      dataIndex: 'open_id',
      key: 'open_id',
      width: 180,
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
      width: 80,
      align: 'center' as const,
      render: (sex: number) => (
        <div>
          {sex === 1 ? (
            <Tag icon={<ManOutlined />} color="blue">男</Tag>
          ) : sex === 2 ? (
            <Tag icon={<WomanOutlined />} color="pink">女</Tag>
          ) : (
            <Tag color="default">未知</Tag>
          )}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      align: 'center' as const,
      render: (status: string) => {
        const color = status === 'active' ? 'success' : 
                     status === 'inactive' ? 'warning' : 
                     status === 'banned' ? 'error' : 'default';
        return <Tag color={color}>{getStatusText(status)}</Tag>;
      },
    },
    {
      title: '注册时间',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString('zh-CN'),
    },
    {
      title: '店铺',
      key: 'boutique',
      width: 150,
      render: (record: Customer) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ShopOutlined />
          <span>{record.boutique?.name || '未关联店铺'}</span>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      fixed: 'right' as const,
      render: (record: Customer) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => showUserDetail(record)}
          >
            查看
          </Button>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  // 统计数据
  const totalUsers = filteredUsers.length;
  const maleUsers = filteredUsers.filter(u => u.sex === 1).length;
  const femaleUsers = filteredUsers.filter(u => u.sex === 2).length;
  const todayUsers = filteredUsers.filter(u => {
    const today = new Date();
    const userDate = new Date(u.date_created);
    return userDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="总客户数" 
              value={totalUsers}
              prefix={<UsergroupAddOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="男性客户" 
              value={maleUsers}
              prefix={<ManOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="女性客户" 
              value={femaleUsers}
              prefix={<WomanOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="今日新增" 
              value={todayUsers}
              prefix={<UserSwitchOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <BoutiqueSelector
              value={selectedBoutiqueId}
              onChange={setSelectedBoutiqueId}
              placeholder="请选择店铺"
              style={{ width: 200 }}
            />
            <Search
              placeholder="搜索昵称、姓名、联系方式、地址或OpenID"
              allowClear
              style={{ width: 350 }}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        {!selectedBoutiqueId && (
          <Empty 
            description="请先选择店铺查看客户信息"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}

        {selectedBoutiqueId && (
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
              showTotal: (total) => `共 ${total} 条记录`,
            }}
          />
        )}
      </Card>

      {/* 查看详情模态框 */}
      <Modal
        title="客户详细信息"
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
              {selectedUser.full_name && (
                <Text type="secondary">真实姓名: {selectedUser.full_name}</Text>
              )}
            </div>
            
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="客户ID">
                {selectedUser.id}
              </Descriptions.Item>
              <Descriptions.Item label="微信昵称">
                {selectedUser.nick_name || '未设置'}
              </Descriptions.Item>
              <Descriptions.Item label="真实姓名">
                {selectedUser.full_name || '未填写'}
              </Descriptions.Item>
              <Descriptions.Item label="联系方式">
                {selectedUser.contact || '未填写'}
              </Descriptions.Item>
              <Descriptions.Item label="邮寄地址" span={2}>
                {selectedUser.address || '未填写'}
              </Descriptions.Item>
              <Descriptions.Item label="OpenID">
                <Text code style={{ fontSize: '12px' }}>
                  {selectedUser.open_id || '未设置'}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="性别">
                {getSexText(selectedUser.sex)}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag color={selectedUser.status === 'active' ? 'success' : 'default'}>
                  {getStatusText(selectedUser.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="类型">
                {selectedUser.type || '未设置'}
              </Descriptions.Item>
              <Descriptions.Item label="注册时间">
                {new Date(selectedUser.date_created).toLocaleString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">
                {new Date(selectedUser.date_updated).toLocaleString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="关联店铺">
                {selectedUser.boutique?.name || '未关联'}
              </Descriptions.Item>
              <Descriptions.Item label="店铺地址">
                {selectedUser.boutique?.address || '未设置'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* 编辑客户模态框 */}
      <Modal
        title="编辑客户信息"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setEditingCustomer(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          {/* 只读的微信信息 */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="微信昵称">
                <Input 
                  value={editingCustomer?.nick_name || ''} 
                  disabled 
                  style={{ backgroundColor: '#f5f5f5' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="性别">
                <Input 
                  value={getSexText(editingCustomer?.sex)} 
                  disabled 
                  style={{ backgroundColor: '#f5f5f5' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="OpenID">
            <Input 
              value={editingCustomer?.open_id || ''} 
              disabled 
              style={{ backgroundColor: '#f5f5f5', fontFamily: 'monospace', fontSize: '12px' }}
            />
          </Form.Item>

          {/* 可编辑的补充信息 */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="真实姓名"
                name="full_name"
                extra="客户的真实姓名,便于管理"
              >
                <Input placeholder="请输入客户真实姓名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="联系方式"
                name="contact"
                extra="电话号码、邮箱等联系方式"
              >
                <Input placeholder="请输入联系方式" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="邮寄地址"
            name="address"
            extra="用于邮寄商品的详细地址"
          >
            <Input.TextArea 
              placeholder="请输入客户邮寄地址(如:XX省XX市XX区XX街道XX号)" 
              rows={3}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => {
                setEditModalVisible(false);
                setEditingCustomer(null);
                form.resetFields();
              }}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
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
