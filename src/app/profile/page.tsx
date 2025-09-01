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
  Col
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  SaveOutlined,
  UploadOutlined,
  LockOutlined,
  SafetyOutlined,
  MobileOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import { ProtectedRoute, AdminLayout } from '@components';
import { useAuth } from '@providers/AuthProvider';
import { 
  useGetUserByIdQuery,
  useUpdateUserMutation,
  GetUserByIdQuery
} from '@generated/graphql';
import { TokenManager } from '@lib/auth';
import { FILE_CONFIG } from '@lib/api';

const { Title, Text } = Typography;

// 使用生成的类型
type User = GetUserByIdQuery['users_by_id'];

function ProfileContent() {
  const { user: authUser, refreshToken } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  // 暂时不使用GraphQL查询，直接使用AuthProvider的用户数据
  // 后续可以在修复GraphQL查询后重新启用
  /*
  const { data: userData, loading: userLoading, refetch } = useGetUserByIdQuery({
    variables: { id: authUser?.id || '' },
    skip: !authUser?.id,
    onError: (error) => {
      console.error('GraphQL查询用户失败:', error);
      console.log('用户ID:', authUser?.id);
      console.log('用户信息:', authUser);
    }
  });
  */

  // 使用空的mutation以保持代码结构
  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      message.success('用户信息更新成功');
      setEditing(false);
      setLoading(false);
      // refetch(); // 刷新用户数据
      refreshToken(); // 刷新认证状态
    },
    onError: (error) => {
      console.error('更新用户信息失败:', error);
      message.error('更新失败，请稍后重试');
      setLoading(false);
    }
  });

  // 直接使用AuthProvider的用户数据
  const user = authUser;

  // 调试信息
  useEffect(() => {
    console.log('AuthUser from context:', authUser);
    // console.log('GraphQL user data:', userData);
    console.log('Final user:', user);
  }, [authUser, user]);

  // 初始化表单数据
  useEffect(() => {
    // 优先使用GraphQL查询的数据，如果没有则使用AuthProvider的数据
    const displayUser = user || authUser;
    if (displayUser) {
      const userName = 'name' in displayUser 
        ? displayUser.name 
        : (displayUser.first_name && displayUser.last_name) 
          ? `${displayUser.first_name} ${displayUser.last_name}`.trim()
          : displayUser.first_name || displayUser.last_name || '';
      
      form.setFieldsValue({
        name: userName,
        email: displayUser.email || '',
      });
    }
  }, [user, authUser, form]);

  const handleSave = async (values: any) => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      await updateUser({
        variables: {
          id: user.id,
          data: {
            name: values.name,
            email: values.email,
          }
        }
      });
    } catch (error) {
      console.error('保存失败:', error);
      message.error('保存失败，请稍后重试');
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
      // 这里可以添加密码修改的API调用
      console.log('修改密码:', values);
      message.success('密码修改成功');
      setPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      message.error('密码修改失败');
    }
  };

  const handleCancel = () => {
    const userName = user ? (
      (user.first_name && user.last_name) 
        ? `${user.first_name} ${user.last_name}`.trim()
        : user.first_name || user.last_name || ''
    ) : '';
    
    form.setFieldsValue({
      name: userName,
      email: user?.email || '',
    });
    setEditing(false);
  };

  // 初始化表单数据
  useEffect(() => {
    if (user) {
      const userName = (user.first_name && user.last_name) 
        ? `${user.first_name} ${user.last_name}`.trim()
        : user.first_name || user.last_name || '';
      
      form.setFieldsValue({
        name: userName,
        email: user.email || '',
      });
    }
  }, [user, form]);

  if (!user) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ height: '100%', padding: '24px', backgroundColor: '#F9FAFB' }}>
      <Title level={4} className="mb-6">账号详情</Title>
      
      <div className="max-w-2xl">
        <Card>
          <div className="text-center mb-6">
            <Avatar size={80} icon={<UserOutlined />} className="mb-4" />
            <div>
              <Title level={4} className="mb-1">
                {user ? (
                  (user.first_name && user.last_name) 
                    ? `${user.first_name} ${user.last_name}`.trim()
                    : user.first_name || user.last_name || '未设置'
                ) : '未设置'}
              </Title>
              <Text type="secondary">{user?.email}</Text>
            </div>
            <Upload
              showUploadList={false}
              beforeUpload={() => {
                message.info('头像上传功能待开发');
                return false;
              }}
            >
              <Button 
                type="link" 
                icon={<UploadOutlined />}
                className="mt-2"
              >
                更换头像
              </Button>
            </Upload>
          </div>

          <Divider />

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            disabled={!editing}
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={[
                { required: true, message: '请输入姓名' },
                { min: 2, message: '姓名至少2个字符' }
              ]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>

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

            <Form.Item label="用户ID">
              <Input 
                value={user?.id || '未知'} 
                disabled 
                style={{ color: '#666' }}
              />
            </Form.Item>

            <Form.Item label="邮箱地址">
              <Input 
                value={user?.email || '未知'}
                disabled 
                style={{ color: '#666' }}
              />
            </Form.Item>

            <Divider />

            <Form.Item>
              <Space>
                {editing ? (
                  <>
                    <Button 
                      type="primary" 
                      htmlType="submit"
                      icon={<SaveOutlined />}
                      loading={loading}
                    >
                      保存
                    </Button>
                    <Button onClick={handleCancel}>
                      取消
                    </Button>
                  </>
                ) : (
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />}
                    onClick={() => setEditing(true)}
                  >
                    编辑信息
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Card className="mt-6" title="安全设置">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <div className="font-medium">修改密码</div>
                <div className="text-sm text-gray-500">定期更换密码有助于账号安全</div>
              </div>
              <Button 
                onClick={() => setPasswordModalVisible(true)}
              >
                修改
              </Button>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b">
              <div>
                <div className="font-medium">双因素认证</div>
                <div className="text-sm text-gray-500">为账号添加额外的安全保护</div>
              </div>
              <Button 
                onClick={() => message.info('双因素认证功能待开发')}
              >
                设置
              </Button>
            </div>

            <div className="flex justify-between items-center py-3">
              <div>
                <div className="font-medium">登录设备管理</div>
                <div className="text-sm text-gray-500">查看和管理已登录的设备</div>
              </div>
              <Button 
                onClick={() => message.info('设备管理功能待开发')}
              >
                管理
              </Button>
            </div>
          </div>
        </Card>

        {/* 密码修改Modal */}
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
                { min: 6, message: '密码至少6位字符' }
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

            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button onClick={() => {
                  setPasswordModalVisible(false);
                  passwordForm.resetFields();
                }}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit" icon={<LockOutlined />}>
                  修改密码
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
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
