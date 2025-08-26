'use client';

import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    
    try {
      const result = await login(values.email, values.password);
      
      if (result.success) {
        message.success('登录成功！');
        router.push('/dashboard');
      } else {
        message.error(result.error || '登录失败！');
      }
    } catch {
      message.error('登录失败，请重试！');
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
            className="text-5xl font-light text-white m-0"
            style={{
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              letterSpacing: '2px'
            }}
          >
            Forge CMS
          </h1>
          <p 
            className="text-lg font-light mt-2"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            服装店管理系统
          </p>
        </div>
        
        <div className="text-center max-w-sm">
          <p 
            className="text-base leading-relaxed"
            style={{ opacity: '0.9' }}
          >
            现代化的服装店管理平台，为您的业务提供全方位的管理解决方案
          </p>
        </div>
      </div>

      {/* 右侧登录表单区域 */}
      <div className="login-page-right">
        <div className="w-full max-w-sm">
          <h2 
            className="text-center mb-10 text-2xl font-medium"
            style={{ color: '#2c3e50' }}
          >
            登录系统
          </h2>
          
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label={
                <span style={{ color: '#5a6c7d', fontWeight: '500' }}>
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
                prefix={<UserOutlined style={{ color: '#74b9ff' }} />} 
                placeholder="请输入邮箱地址" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              label={
                <span style={{ color: '#5a6c7d', fontWeight: '500' }}>
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
                prefix={<LockOutlined style={{ color: '#74b9ff' }} />}
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
          
          <div 
            className="text-center text-sm mt-8"
            style={{ color: '#636e72' }}
          >
            <p>© 2025 Matrix Net Tech. 保留所有权利</p>
          </div>
        </div>
      </div>
    </div>
  );
}
