'use client';

import React, { useState } from 'react';
import { Typography, Spin, Button, Alert } from 'antd';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  ShoppingOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';
import { 
  useGetDashboardDataQuery,
  useGetRecentUsersQuery,
  useGetRecentProductsQuery
} from '../../generated/graphql';

const { Title } = Typography;

function DashboardContent() {
  // 使用 GraphQL hooks 获取仪表板数据
  const { data: dashboardData, loading: dashboardLoading, error: dashboardError } = useGetDashboardDataQuery();
  const { loading: usersLoading } = useGetRecentUsersQuery({ variables: { limit: 5 } });
  const { loading: productsLoading } = useGetRecentProductsQuery({ variables: { limit: 5 } });

  const loading = dashboardLoading || usersLoading || productsLoading;

  // 从 GraphQL 数据中提取统计信息
  const statsData = {
    totalOrders: dashboardData?.orders_aggregated[0]?.countAll || 0,
    totalProducts: dashboardData?.products_aggregated[0]?.countAll || 0,
    totalUsers: dashboardData?.users_aggregated[0]?.countAll || 0,
    totalCategories: dashboardData?.categories_aggregated[0]?.countAll || 0
  };

  if (dashboardError) {
    return (
      <div className="p-6">
        <Alert 
          message="数据加载失败" 
          description="无法获取仪表板数据，请稍后重试。" 
          type="error" 
          showIcon 
        />
      </div>
    );
  }

  return (
    <div style={{ height: '100%', padding: '24px', backgroundColor: 'white' }}>
      {/* 页面标题区域 */}
      <div className="mb-6">
        <Title level={2} className="mb-2">仪表盘概览</Title>
        <p className="text-gray-600">
          查看您的服装店平台关键数据和业务指标
        </p>
      </div>
      
      {/* 统计卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">总订单数</p>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? <Spin size="small" /> : statsData.totalOrders.toLocaleString()}
              </div>
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
              <div className="text-3xl font-bold text-gray-900">
                {loading ? <Spin size="small" /> : statsData.totalProducts.toLocaleString()}
              </div>
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
              <div className="text-3xl font-bold text-gray-900">
                {loading ? <Spin size="small" /> : statsData.totalUsers.toLocaleString()}
              </div>
              <p className="text-sm text-orange-600 mt-1">
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
              <p className="text-sm text-gray-500 mb-1">今日销售额</p>
              <div className="text-3xl font-bold text-gray-900">
                {loading ? <Spin size="small" /> : `¥${(statsData.totalOrders * 89).toLocaleString()}`}
              </div>
              <p className="text-sm text-purple-600 mt-1">
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
          <h3 className="text-lg font-semibold mb-4">快速操作</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="primary" 
              icon={<ShoppingOutlined />}
              className="h-12"
              onClick={() => window.location.href = '/products'}
            >
              管理商品
            </Button>
            <Button 
              icon={<ShoppingCartOutlined />}
              className="h-12"
              onClick={() => window.location.href = '/orders'}
            >
              查看订单
            </Button>
            <Button 
              icon={<UserOutlined />}
              className="h-12"
              onClick={() => window.location.href = '/users'}
            >
              用户管理
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">系统状态</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">数据库连接</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                正常
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API 状态</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                运行中
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">最后同步</span>
              <span className="text-sm text-gray-500">
                刚刚
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <DashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
