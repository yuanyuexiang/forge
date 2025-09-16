'use client';

import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@providers/AuthProvider';

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [form] = Form.useForm(); // 添加Form实例
  const router = useRouter();
  const { login } = useAuth();

  const testConnection = async () => {
    setTestLoading(true);
    try {
      const response = await fetch('/api/graphql/system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'query { __typename }'
        })
      });
      
      const result = await response.json();
      console.log('连接测试结果:', result);
      
      if (response.ok) {
        message.success('代理连接正常！');
      } else {
        message.error('代理连接失败！');
      }
    } catch (error) {
      console.error('连接测试失败:', error);
      message.error('连接测试失败！');
    } finally {
      setTestLoading(false);
    }
  };

  const testValidCredentials = async () => {
    setTestLoading(true);
    try {
      console.log('填入测试凭据到表单...');
      
      // 使用Form实例设置值
      form.setFieldsValue({
        email: 'tom.nanjing@gmail.com',
        password: 'sual116y'
      });
      
      message.success('已填入测试凭据，请点击登录按钮');
    } catch (error) {
      console.error('填入凭据失败:', error);
      message.error('填入凭据失败！');
    } finally {
      setTestLoading(false);
    }
  };

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    
    try {
      console.log('尝试登录:', { email: values.email });
      const success = await login(values.email, values.password);
      
      if (success) {
        message.success('登录成功！');
        router.push('/dashboard');
      } else {
        message.error('登录失败，请检查邮箱和密码！检查浏览器控制台获取更多信息。');
      }
    } catch (error) {
      console.error('登录异常:', error);
      message.error('登录失败，请重试！检查浏览器控制台获取更多信息。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* 左侧品牌区域 */}
      <div className="login-page-left">
        <div className="flex flex-col items-center mb-10">
          <div className="login-logo-circle">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path
                d="M30 12L48 21v18L30 48 12 39V21l18-9z"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M12 21l18 9 18-9M30 30v18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 
            className="text-5xl font-light m-0"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              letterSpacing: '2px',
              color: '#C5A46D'
            }}
          >
            Forge Luxury
          </h1>
          <p 
            className="text-lg font-light mt-2"
            style={{ color: 'rgba(249, 250, 251, 0.8)' }}
          >
            实体店产品展示系统
          </p>
        </div>
        
        <div className="text-center max-w-sm">
          <p 
            className="text-base leading-relaxed"
            style={{ opacity: '0.8', color: '#F9FAFB' }}
          >
            专业的精品服饰管理平台，为您的高端业务提供卓越的管理体验
          </p>
        </div>
      </div>

      {/* 右侧登录表单区域 */}
      <div className="login-page-right">
        <div className="w-full max-w-sm">
          <h2 
            className="text-center mb-10 text-2xl font-semibold"
            style={{ color: '#111827' }}
          >
            系统登录
          </h2>
          
          <Form
            name="login"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label={
                <span style={{ color: '#374151', fontWeight: '600' }}>
                  用户
                </span>
              }
              name="email"
              rules={[
                { required: true, message: '请输入用户邮箱！' },
                { type: 'email', message: '请输入有效的邮箱格式！' }
              ]}
            >
              <Input 
                className="login-input-field"
                prefix={<UserOutlined style={{ color: '#C5A46D' }} />} 
                placeholder="请输入邮箱地址" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: '#374151', fontWeight: '600' }}>
                  密码
                </span>
              }
              name="password"
              rules={[
                { required: true, message: '请输入密码！' },
                { min: 6, message: '密码至少6位！' }
              ]}
            >
              <Input.Password
                className="login-input-field"
                prefix={<LockOutlined style={{ color: '#C5A46D' }} />}
                placeholder="请输入密码"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="login-submit-button w-full mt-2"
                size="large"
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
          
          {/* 开发调试信息 */}
          {/* <div 
            className="mt-6 p-4 rounded-lg border"
            style={{ 
              backgroundColor: '#F9FAFB', 
              borderColor: '#E5E7EB',
              fontSize: '12px'
            }}
          >
            <p style={{ color: '#6B7280', marginBottom: '8px' }}>
              🔧 开发调试信息：
            </p>
            <p style={{ color: '#374151', marginBottom: '4px' }}>
              • 代理端点：/api/graphql/system
            </p>
            <p style={{ color: '#374151', marginBottom: '4px' }}>
              • 目标服务器：forge.matrix-net.tech
            </p>
            <p style={{ color: '#F59E0B', marginBottom: '8px' }}>
              • 请使用有效的Directus用户凭据登录
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button 
                size="small" 
                onClick={testConnection}
                loading={testLoading}
                style={{ fontSize: '11px', height: '24px' }}
              >
                测试代理连接
              </Button>
              <Button 
                size="small" 
                onClick={testValidCredentials}
                loading={testLoading}
                style={{ fontSize: '11px', height: '24px' }}
                type="primary"
              >
                测试有效凭据
              </Button>
            </div>
          </div> */}
          
          <div 
            className="text-center text-sm mt-8"
            style={{ color: '#6B7280' }}
          >
            <p>© 2025 Matrix Net Tech. 保留所有权利</p>
          </div>
        </div>
      </div>
    </div>
  );
}
