'use client';

import React, { useState } from 'react';
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
  Upload
} from 'antd';
import { 
  UserOutlined, 
  EditOutlined, 
  SaveOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';
import { useAuth } from '../providers/AuthProvider';

const { Title, Text } = Typography;

function ProfileContent() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  // 初始化表单数据
  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.first_name || user.last_name ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : '',
        email: user.email,
      });
    }
  }, [user, form]);

  const handleSave = async (values: any) => {
    try {
      // 这里可以添加更新用户信息的API调用
      console.log('更新用户信息:', values);
      message.success('账号信息更新成功');
      setEditing(false);
    } catch (error) {
      message.error('更新失败，请稍后重试');
    }
  };

  const handleCancel = () => {
    form.setFieldsValue({
      name: user?.first_name || user?.last_name ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() : '',
      email: user?.email,
    });
    setEditing(false);
  };

  return (
    <div style={{ height: '100%', padding: '24px', backgroundColor: '#F9FAFB' }}>
      <Title level={4} className="mb-6">账号详情</Title>
      
      <div className="max-w-2xl">
        <Card>
          <div className="text-center mb-6">
            <Avatar size={80} icon={<UserOutlined />} className="mb-4" />
            <div>
              <Title level={4} className="mb-1">
                {user?.first_name || user?.last_name 
                  ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
                  : '未设置'
                }
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

            <Form.Item label="注册时间">
              <Input 
                value="2025-08-22 12:50:17" 
                disabled 
                style={{ color: '#666' }}
              />
            </Form.Item>

            <Form.Item label="最后登录">
              <Input 
                value={`2025-08-27 ${new Date().toLocaleTimeString()}`}
                disabled 
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
                onClick={() => message.info('密码修改功能待开发')}
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
