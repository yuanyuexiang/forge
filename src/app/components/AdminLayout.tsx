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
    if (pathname === '/profile') return 'profile';
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
      key: 'profile',
      icon: <UserOutlined />,
      label: '账号详情',
      onClick: () => router.push('/profile'),
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
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="h-16 flex items-center justify-center bg-blue-600">
          <Title level={4} className="text-white m-0">
            {collapsed ? 'EC' : '服装店后台'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
        />
      </Sider>
      
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
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
            <div className="flex items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
              <Avatar 
                icon={<UserOutlined />} 
                className="mr-2"
                style={{ backgroundColor: '#1890ff' }}
              />
              <div className="flex flex-col">
                {/* <span className="text-sm font-medium text-gray-800">
                  {user.name || user.email.split('@')[0]}
                </span> */}
                <span className="text-gray-500">
                  {user.email}
                </span>
              </div>
            </div>
          </Dropdown>
        </Header>
        
        <Content style={{ height: 'calc(100vh - 64px)', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
