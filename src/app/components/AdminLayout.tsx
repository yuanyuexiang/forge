'use client';

import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Typography } from 'antd';
import { 
  DashboardOutlined, 
  ShoppingOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TagOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // 根据当前路径确定选中的菜单项
  const getSelectedKey = () => {
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname === '/products') return 'products';
    if (pathname === '/orders') return 'orders';
    if (pathname === '/users') return 'users';
    if (pathname === '/categories') return 'categories';
    if (pathname === '/payments') return 'payments';
    return 'dashboard';
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
      onClick: () => router.push('/dashboard'),
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: '商品管理',
      onClick: () => router.push('/products'),
    },
    {
      key: 'categories',
      icon: <TagOutlined />,
      label: '分类管理',
      onClick: () => router.push('/categories'),
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: '订单管理',
      onClick: () => router.push('/orders'),
    },
    {
      key: 'payments',
      icon: <CreditCardOutlined />,
      label: '支付管理',
      onClick: () => router.push('/payments'),
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: '用户管理',
      onClick: () => router.push('/users'),
    },
  ];

  const userMenuItems = [
    {
      key: 'api-settings',
      icon: <SettingOutlined />,
      label: 'API 设置',
      onClick: () => {
        // 这里可以添加 API 设置逻辑
      },
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: logout,
    },
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-16 flex items-center justify-center bg-blue-600">
          <Title level={4} className="text-white m-0">
            {collapsed ? 'EC' : '电商后台'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
        />
      </Sider>
      
      <Layout>
        <Header className="bg-white px-4 flex items-center justify-between shadow-sm">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
          
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <div className="flex items-center cursor-pointer">
              <Avatar icon={<UserOutlined />} className="mr-2" />
              <span>{user.name || user.email}</span>
            </div>
          </Dropdown>
        </Header>
        
        <Content className="bg-gray-50 min-h-screen">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
