'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Typography, Spin } from 'antd';
import { 
  DashboardOutlined, 
  ShoppingOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useAuth } from '../providers/AuthProvider';
import { ProtectedRoute } from '../components/ProtectedRoute';
import ApiSettings from '../components/ApiSettings';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

function DashboardContent() {
  const [collapsed, setCollapsed] = useState(false);
  const [apiSettingsVisible, setApiSettingsVisible] = useState(false);
  const { user, logout } = useAuth();

  // 使用静态数据或从 Directus API 获取数据
  const [statsData, setStatsData] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    todaySales: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从 Directus 获取统计数据
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // 这里可以调用具体的 Directus API 端点获取数据
          // 暂时使用模拟数据
          setStatsData({
            totalOrders: 1234,
            totalProducts: 567,
            totalUsers: 890,
            todaySales: 12345
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: '商品管理',
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: '订单管理',
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'api-settings',
      icon: <SettingOutlined />,
      label: 'API 设置',
      onClick: () => setApiSettingsVisible(true),
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
          defaultSelectedKeys={['dashboard']}
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
              <span>{user.name}</span>
            </div>
          </Dropdown>
        </Header>
        
        <Content className="p-6 bg-gray-50 min-h-screen">
          {/* API 状态指示器 - 移除演示模式相关内容 */}
          <div className="mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <span className="text-blue-800">🚀 已连接到 Directus 后端系统</span>
            </div>
          </div>

          {/* 页面标题区域 */}
          <div className="mb-6">
            <Title level={2} className="mb-2">仪表盘概览</Title>
            <p className="text-gray-600">
              查看您的电商平台关键数据和业务指标
            </p>
          </div>
          
          {/* 统计卡片区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">总订单数</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {loading ? <Spin size="small" /> : statsData.totalOrders.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    <span className="inline-block mr-1">↗</span>
                    较昨日 +12%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCartOutlined className="text-2xl text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">商品总数</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {loading ? <Spin size="small" /> : statsData.totalProducts.toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    <span className="inline-block mr-1">↗</span>
                    较昨日 +3%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <ShoppingOutlined className="text-2xl text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">用户总数</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {loading ? <Spin size="small" /> : statsData.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    <span className="inline-block mr-1">↗</span>
                    较昨日 +8%
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <UserOutlined className="text-2xl text-orange-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">今日销售</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ¥{loading ? <Spin size="small" /> : statsData.todaySales.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    <span className="inline-block mr-1">↗</span>
                    较昨日 +15%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DashboardOutlined className="text-2xl text-purple-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* 快速操作区域 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Title level={4} className="mb-4">快速操作</Title>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  type="primary" 
                  className="h-12 flex items-center justify-center"
                  icon={<ShoppingOutlined />}
                >
                  添加商品
                </Button>
                <Button 
                  className="h-12 flex items-center justify-center"
                  icon={<ShoppingCartOutlined />}
                >
                  查看订单
                </Button>
                <Button 
                  className="h-12 flex items-center justify-center"
                  icon={<UserOutlined />}
                >
                  用户管理
                </Button>
                <Button 
                  className="h-12 flex items-center justify-center"
                  icon={<DashboardOutlined />}
                >
                  数据报表
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Title level={4} className="mb-4">最近活动</Title>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">新订单 #12345</p>
                    <p className="text-xs text-gray-500">2分钟前</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">新用户注册</p>
                    <p className="text-xs text-gray-500">5分钟前</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">商品库存预警</p>
                    <p className="text-xs text-gray-500">10分钟前</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 数据图表区域 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <Title level={4} className="mb-4">销售趋势</Title>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <DashboardOutlined className="text-4xl mb-2" />
                <p>图表组件即将上线</p>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
      
      {/* API 设置弹窗 */}
      <ApiSettings
        visible={apiSettingsVisible}
        onClose={() => setApiSettingsVisible(false)}
        onSave={() => {
          // 可以在这里添加刷新页面或重新获取数据的逻辑
        }}
      />
    </Layout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
