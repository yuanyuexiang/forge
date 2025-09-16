'use client';

import React, { useState, useEffect } from 'react';
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
  DatabaseOutlined,
  ShopOutlined,
  DesktopOutlined,
  EyeOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@providers/AuthProvider';

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

  // 初始化时从 localStorage 读取侧边栏状态
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    if (savedCollapsed !== null) {
      setCollapsed(JSON.parse(savedCollapsed));
    }
  }, []);

  // 切换侧边栏状态并保存到 localStorage
  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newCollapsed));
  };

  // 根据当前路径确定选中的菜单项
  const getSelectedKey = () => {
    if (pathname === '/dashboard') return 'dashboard';
    if (pathname.startsWith('/products')) return 'products';
    if (pathname.startsWith('/boutiques')) return 'boutiques';
    if (pathname.startsWith('/orders')) return 'orders';
    if (pathname.startsWith('/customers')) return 'customers';
    if (pathname.startsWith('/categories')) return 'categories';
    if (pathname.startsWith('/terminals')) return 'terminals';
    if (pathname.startsWith('/views')) return 'views';
    if (pathname.startsWith('/visits')) return 'visits';
    if (pathname.startsWith('/profile')) return 'profile';
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
      key: 'boutiques',
      icon: <ShopOutlined />,
      label: '店铺管理',
      onClick: () => router.push('/boutiques'),
    },
    {
      key: 'categories',
      icon: <TagOutlined />,
      label: '分类管理',
      onClick: () => router.push('/categories'),
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: '商品管理',
      onClick: () => router.push('/products'),
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: '订单管理',
      onClick: () => router.push('/orders'),
    },
    {
      key: 'customers',
      icon: <UserOutlined />,
      label: '客户管理',
      onClick: () => router.push('/customers'),
    },
    {
      key: 'terminals',
      icon: <DesktopOutlined />,
      label: '终端管理',
      onClick: () => router.push('/terminals'),
    },
    {
      key: 'views',
      icon: <EyeOutlined />,
      label: '浏览分析',
      onClick: () => router.push('/views'),
    },
    {
      key: 'visits',
      icon: <BarChartOutlined />,
      label: '访问统计',
      onClick: () => router.push('/visits'),
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
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{ backgroundColor: '#111827' }}
      >
        <div 
          className="h-16 flex items-center justify-center"
          style={{ backgroundColor: '#111827', borderBottom: '1px solid #374151' }}
        >
          <Title level={4} style={{ color: '#C5A46D', margin: 0, fontWeight: 600 }}>
            {collapsed ? 'LX' : '精品服饰后台'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{ 
            backgroundColor: '#111827',
            borderRight: 'none'
          }}
          className="luxury-menu"
        />
      </Sider>
      
      <Layout style={{ height: '100%', overflow: 'hidden' }}>
        <Header 
          className="px-4 flex items-center justify-between shadow-sm"
          style={{ 
            backgroundColor: '#1F2937', 
            borderBottom: '1px solid #374151',
            color: '#FFFFFF',
            padding: '0 20px'
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            className="text-lg"
            style={{ 
              color: '#FFFFFF'
            }}
          />
          

          <div className="flex flex-row">
            <span style={{ fontSize: '12px', color: '#D1D5DB' ,marginLeft: '8px'}}>
              {user.email}
            </span>
          
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <div 
                className="flex items-center cursor-pointer px-2 py-1 rounded"
                style={{ 
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Avatar 
                  icon={<UserOutlined />} 
                  className="mr-2"
                  style={{ backgroundColor: '#C5A46D' }}
                />
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content style={{ 
          height: 'calc(100vh - 64px)', 
          overflowY: 'auto', 
          backgroundColor: '#F9FAFB' 
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
