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
    <div 
      className="min-h-screen flex"
      style={{
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #74b9ff 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          color: white;
        }
        
        .right-panel {
          width: 480px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }
        
        .logo-circle {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.2);
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
        }
        
        .logo-text {
          font-size: 48px;
          font-weight: 300;
          color: white;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          letter-spacing: 2px;
        }
        
        .subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 18px;
          margin-top: 10px;
          font-weight: 300;
        }
        
        .login-form {
          width: 100%;
          max-width: 360px;
        }
        
        .form-title {
          text-align: center;
          margin-bottom: 40px;
          color: #2c3e50;
          font-size: 24px;
          font-weight: 500;
        }
        
        .login-input {
          height: 50px;
          border-radius: 8px;
          border: 1px solid #e0e6ed;
          background: #fff;
          transition: all 0.3s ease;
        }
        
        .login-input:hover {
          border-color: #74b9ff;
        }
        
        .login-input:focus {
          border-color: #74b9ff;
          box-shadow: 0 0 0 2px rgba(116, 185, 255, 0.2);
        }
        
        .login-button {
          height: 50px;
          border-radius: 8px;
          background: linear-gradient(45deg, #fd79a8, #e84393);
          border: none;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        
        .login-button:hover {
          background: linear-gradient(45deg, #e84393, #fd79a8);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(253, 121, 168, 0.4);
        }
        
        .login-button:active {
          transform: translateY(0);
        }
        
        .form-label {
          color: #5a6c7d;
          font-weight: 500;
          margin-bottom: 8px;
        }
        
        @media (max-width: 768px) {
          .left-panel {
            display: none;
          }
          .right-panel {
            width: 100%;
          }
        }
      `}</style>

      {/* 左侧品牌区域 */}
      <div className="left-panel">
        <div className="logo-container">
          <div className="logo-circle">
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
          <h1 className="logo-text">Forge CMS</h1>
          <p className="subtitle">服装店管理系统</p>
        </div>
        
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <p style={{ fontSize: '16px', lineHeight: '1.6', opacity: '0.9' }}>
            现代化的服装店管理平台，为您的业务提供全方位的管理解决方案
          </p>
        </div>
      </div>

      {/* 右侧登录表单区域 */}
      <div className="right-panel">
        <div className="login-form">
          <h2 className="form-title">登录系统</h2>
          
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label={<span className="form-label">用户</span>}
              name="email"
              rules={[
                { required: true, message: '请输入用户邮箱！' },
                { type: 'email', message: '请输入有效的邮箱格式！' }
              ]}
            >
              <Input 
                className="login-input"
                prefix={<UserOutlined style={{ color: '#74b9ff' }} />} 
                placeholder="请输入邮箱地址" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              label={<span className="form-label">密码</span>}
              name="password"
              rules={[
                { required: true, message: '请输入密码！' },
                { min: 6, message: '密码至少6位！' }
              ]}
            >
              <Input.Password
                className="login-input"
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
                className="login-button w-full"
                size="large"
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
          
          <div className="text-center text-sm" style={{ color: '#636e72', marginTop: '30px' }}>
            <p>© 2025 Matrix Net Tech. 保留所有权利</p>
          </div>
        </div>
      </div>
    </div>
  );
}
