'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Typography, 
  Divider,
  message,
  Space,
  Upload,
  Spin,
  Modal,
  Row,
  Col,
  Tag,
  Select,
  Switch,
  Badge,
  Descriptions,
  Tabs
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  SaveOutlined,
  UploadOutlined,
  LockOutlined,
  SafetyOutlined,
  MobileOutlined,
  LoadingOutlined,
  SettingOutlined,
  GlobalOutlined,
  BellOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  BookOutlined
} from '@ant-design/icons';
import { ProtectedRoute, AdminLayout } from '@components';
import { useAuth } from '@providers/AuthProvider';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

// 根据Directus users_me接口重新定义用户类型
interface DirectusUser {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  role?: any;
  status?: string;
  language?: string;
  theme_light?: string;
  theme_dark?: string;
  appearance?: string;
  email_notifications?: boolean;
  last_access?: string;
  last_page?: string;
  location?: string;
  title?: string;
  description?: string;
  tags?: any;
  text_direction?: string;
}

function ProfileContent() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [preferencesForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const user = authUser as DirectusUser;

  // 调试信息
  useEffect(() => {
    console.log('=== Profile Page Debug Info ===');
    console.log('AuthUser from context:', authUser);
    console.log('Final user:', user);
    console.log('Auth loading state:', authLoading);
    
    // 详细检查用户字段
    if (user) {
      console.log('用户字段详情:');
      console.log('- id:', user.id);
      console.log('- email:', user.email);
      console.log('- first_name:', user.first_name, '(类型:', typeof user.first_name, ')');
      console.log('- last_name:', user.last_name, '(类型:', typeof user.last_name, ')');
      console.log('- status:', user.status, '(类型:', typeof user.status, ')');
      console.log('- last_access:', user.last_access, '(类型:', typeof user.last_access, ')');
      console.log('- title:', user.title);
      console.log('- location:', user.location);
      console.log('- language:', user.language);
      console.log('- role:', user.role);
    }
    console.log('================================');
  }, [authUser, user, authLoading]);

  // 初始化表单数据
  useEffect(() => {
    if (user) {
      console.log('初始化表单数据...');
      
      // 基本信息表单
      const formData = {
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        location: user.location || '',
        title: user.title || '',
        description: user.description || '',
      };
      console.log('基本信息表单数据:', formData);
      form.setFieldsValue(formData);

      // 偏好设置表单
      const preferencesData = {
        language: user.language || 'zh-CN',
        appearance: user.appearance || 'auto',
        theme_light: user.theme_light || 'default',
        theme_dark: user.theme_dark || 'default',
        email_notifications: user.email_notifications ?? true,
        text_direction: user.text_direction || 'ltr',
      };
      console.log('偏好设置表单数据:', preferencesData);
      preferencesForm.setFieldsValue(preferencesData);
    }
  }, [user, form, preferencesForm]);

  const handleSave = async (values: any) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      // 这里可以调用GraphQL mutation更新用户信息
      console.log('更新用户信息:', values);
      message.success('用户信息更新成功');
      setEditing(false);
    } catch (error) {
      console.error('保存失败:', error);
      message.error('保存失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesSave = async (values: any) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      console.log('更新用户偏好:', values);
      message.success('偏好设置更新成功');
    } catch (error) {
      console.error('保存偏好失败:', error);
      message.error('保存失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 处理密码修改
  const handlePasswordChange = async (values: any) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }
    
    try {
      console.log('修改密码:', values);
      message.success('密码修改成功');
      setPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error('密码修改失败');
    }
  };

  // 获取用户状态显示
  const getUserStatusTag = (status?: string) => {
    const statusMap = {
      'active': { color: 'green', text: '活跃' },
      'inactive': { color: 'red', text: '停用' },
      'invited': { color: 'blue', text: '已邀请' },
      'draft': { color: 'orange', text: '草稿' },
      'archived': { color: 'grey', text: '已归档' }
    };
    
    if (!status) {
      return <Tag color="default">状态未设置</Tag>;
    }
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    if (statusInfo) {
      return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
    } else {
      return <Tag color="default">{status}</Tag>;
    }
  };

  // 格式化最后访问时间
  const formatLastAccess = (lastAccess?: string) => {
    if (!lastAccess) {
      return '尚未记录访问时间';
    }
    
    try {
      const date = new Date(lastAccess);
      // 检查日期是否有效
      if (isNaN(date.getTime())) {
        return '访问时间格式无效';
      }
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (error) {
      return '访问时间解析失败';
    }
  };

  if (authLoading || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <Spin size="large" />
      </div>
    );
  }

  // 获取用户全名
  const getUserFullName = () => {
    const firstName = user.first_name?.trim();
    const lastName = user.last_name?.trim();
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else if (user.email) {
      return user.email.split('@')[0]; // 使用邮箱用户名部分
    } else {
      return '未设置姓名';
    }
  };

  // 获取用户头像URL
  const getAvatarUrl = () => {
    if (user.avatar) {
      return `https://forge.matrix-net.tech/assets/${user.avatar}`;
    }
    return null;
  };

  // Tabs配置
  const tabItems = [
    {
      key: 'profile',
      label: (
        <span>
          <UserOutlined />
          基本信息
        </span>
      ),
      children: (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={4}>个人信息</Title>
            <Button 
              type={editing ? 'default' : 'primary'}
              icon={editing ? <SaveOutlined /> : <EditOutlined />}
              onClick={() => {
                if (editing) {
                  form.submit();
                } else {
                  setEditing(true);
                }
              }}
              loading={loading}
            >
              {editing ? '保存' : '编辑'}
            </Button>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            disabled={!editing}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="名"
                  name="first_name"
                  rules={[{ required: true, message: '请输入名' }]}
                >
                  <Input placeholder="请输入名" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="姓"
                  name="last_name"
                  rules={[{ required: true, message: '请输入姓' }]}
                >
                  <Input placeholder="请输入姓" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item
              label="职位"
              name="title"
            >
              <Input placeholder="请输入职位" />
            </Form.Item>

            <Form.Item
              label="位置"
              name="location"
            >
              <Input placeholder="请输入位置" />
            </Form.Item>

            <Form.Item
              label="个人描述"
              name="description"
            >
              <TextArea 
                rows={4} 
                placeholder="介绍一下自己..." 
                maxLength={500}
                showCount
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: 'preferences',
      label: (
        <span>
          <SettingOutlined />
          偏好设置
        </span>
      ),
      children: (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={4}>系统偏好</Title>
            <Button 
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => preferencesForm.submit()}
              loading={loading}
            >
              保存设置
            </Button>
          </div>

          <Form
            form={preferencesForm}
            layout="vertical"
            onFinish={handlePreferencesSave}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="界面语言"
                  name="language"
                >
                  <Select>
                    <Select.Option value="zh-CN">简体中文</Select.Option>
                    <Select.Option value="en-US">English</Select.Option>
                    <Select.Option value="ja-JP">日本語</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="主题模式"
                  name="appearance"
                >
                  <Select>
                    <Select.Option value="auto">自动</Select.Option>
                    <Select.Option value="light">浅色</Select.Option>
                    <Select.Option value="dark">深色</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="浅色主题"
                  name="theme_light"
                >
                  <Select>
                    <Select.Option value="default">默认</Select.Option>
                    <Select.Option value="blue">蓝色</Select.Option>
                    <Select.Option value="green">绿色</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="深色主题"
                  name="theme_dark"
                >
                  <Select>
                    <Select.Option value="default">默认</Select.Option>
                    <Select.Option value="blue">蓝色</Select.Option>
                    <Select.Option value="green">绿色</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="文本方向"
              name="text_direction"
            >
              <Select>
                <Select.Option value="ltr">从左到右 (LTR)</Select.Option>
                <Select.Option value="rtl">从右到左 (RTL)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="邮件通知"
              name="email_notifications"
              valuePropName="checked"
            >
              <Switch 
                checkedChildren="开启" 
                unCheckedChildren="关闭"
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      key: 'security',
      label: (
        <span>
          <SafetyOutlined />
          安全设置
        </span>
      ),
      children: (
        <div>
          <Title level={4}>安全设置</Title>
          
          <Card size="small" style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={5} style={{ marginBottom: '4px' }}>
                  <LockOutlined /> 修改密码
                </Title>
                <Text type="secondary">定期更换密码以保护账户安全</Text>
              </div>
              <Button 
                type="primary"
                onClick={() => setPasswordModalVisible(true)}
              >
                修改密码
              </Button>
            </div>
          </Card>

          <Card size="small" style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Title level={5} style={{ marginBottom: '4px' }}>
                  <MobileOutlined /> 两步验证
                </Title>
                <Text type="secondary">使用手机应用生成验证码</Text>
              </div>
              <Button disabled>即将开放</Button>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Row gutter={[24, 24]}>
        {/* 用户头像和基本信息卡片 */}
        <Col xs={24} lg={8}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Badge 
                dot 
                status={user.status === 'active' ? 'success' : 'default'}
                offset={[-10, 10]}
              >
                <Avatar 
                  size={120} 
                  src={getAvatarUrl()}
                  icon={<UserOutlined />}
                  style={{ marginBottom: '16px' }}
                />
              </Badge>
              
              <Title level={3} style={{ marginBottom: '8px' }}>
                {getUserFullName()}
              </Title>
              
              <div style={{ marginBottom: '16px' }}>
                {getUserStatusTag(user.status)}
              </div>
              
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                {user.email && (
                  <Text type="secondary">
                    <MailOutlined /> {user.email}
                  </Text>
                )}
                {user.title && (
                  <Text type="secondary">
                    <BookOutlined /> {user.title}
                  </Text>
                )}
                {user.location && (
                  <Text type="secondary">
                    <EnvironmentOutlined /> {user.location}
                  </Text>
                )}
              </Space>
            </div>

            <Divider />
            
            <Descriptions column={1} size="small">
              <Descriptions.Item label="用户ID">
                <Text code copyable>{user.id}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="最后访问">
                <ClockCircleOutlined /> {formatLastAccess(user.last_access)}
              </Descriptions.Item>
              {user.language && (
                <Descriptions.Item label="语言">
                  <GlobalOutlined /> {user.language}
                </Descriptions.Item>
              )}
            </Descriptions>

            <div style={{ marginTop: '24px' }}>
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={(info) => {
                  console.log('上传头像:', info);
                  message.info('头像上传功能开发中...');
                }}
              >
                <Button icon={<UploadOutlined />} block>
                  更换头像
                </Button>
              </Upload>
            </div>
          </Card>
        </Col>

        {/* 详细信息和设置 */}
        <Col xs={24} lg={16}>
          <Card>
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              items={tabItems}
            />
          </Card>
        </Col>
      </Row>

      {/* 修改密码模态框 */}
      <Modal
        title="修改密码"
        open={passwordModalVisible}
        onCancel={() => {
          setPasswordModalVisible(false);
          passwordForm.resetFields();
        }}
        footer={null}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
        >
          <Form.Item
            label="当前密码"
            name="currentPassword"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password placeholder="请输入当前密码" />
          </Form.Item>

          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码长度至少6位' }
            ]}
          >
            <Input.Password placeholder="请输入新密码" />
          </Form.Item>

          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="请再次输入新密码" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button onClick={() => {
                setPasswordModalVisible(false);
                passwordForm.resetFields();
              }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确认修改
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ProfileContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
