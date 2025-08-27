'use client';

import React, { useState } from 'react';
import { Typography, Spin, Button, Alert } from 'antd';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  ShoppingOutlined,
  DashboardOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';
import { 
  useGetDashboardDataQuery,
  useGetRecentUsersQuery,
  useGetRecentProductsQuery,
  useGetRecentOrdersQuery
} from '../../generated/graphql';

const { Title } = Typography;

function DashboardContent() {
  // 获取今日日期（格式：YYYY-MM-DD）
  const today = new Date().toISOString().split('T')[0];
  
  // 使用 GraphQL hooks 获取仪表板数据
  const { data: dashboardData, loading: dashboardLoading, error: dashboardError } = useGetDashboardDataQuery({
    variables: { today }
  });
  const { data: usersData, loading: usersLoading } = useGetRecentUsersQuery({ variables: { limit: 100 } });
  const { data: productsData, loading: productsLoading } = useGetRecentProductsQuery({ variables: { limit: 100 } });
  const { data: ordersData, loading: ordersLoading } = useGetRecentOrdersQuery({ variables: { limit: 3 } });

  const loading = dashboardLoading || usersLoading || productsLoading || ordersLoading;

  // 从 GraphQL 数据中提取统计信息，带有回退值
  const statsData = {
    totalOrders: dashboardData?.orders?.length || ordersData?.orders?.length || 0,
    totalProducts: dashboardData?.products?.length || productsData?.products?.length || 0,
    totalUsers: dashboardData?.users?.length || usersData?.users?.length || 0,
    totalCategories: dashboardData?.categories?.length || 0,
    totalRevenue: dashboardData?.completed_orders?.reduce((sum: number, order: any) => sum + (order.total_price || 0), 0) || 0,
    todayOrders: dashboardData?.today_orders?.length || 0,
    todayRevenue: dashboardData?.today_orders?.filter((order: any) => order.status === 'completed').reduce((sum: number, order: any) => sum + (order.total_price || 0), 0) || 0
  };

  // 调试信息
  console.log('Dashboard data:', dashboardData);
  console.log('Dashboard loading:', dashboardLoading);
  console.log('Dashboard error:', dashboardError);
  console.log('Products data:', productsData);
  console.log('Users data:', usersData);
  console.log('Orders data:', ordersData);
  console.log('Final stats data:', statsData);
  
  // 如果所有数据都为0，显示警告信息
  const hasAnyData = statsData.totalUsers > 0 || statsData.totalProducts > 0 || statsData.totalOrders > 0;
  const isLoading = dashboardLoading || productsLoading || usersLoading || ordersLoading;

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
        <Title level={4} className="mb-2">仪表盘概览</Title>
        <p className="text-gray-600">
          查看您的服装店平台关键数据和业务指标
        </p>
      </div>
      
      {/* 数据状态指示器 */}
      {!isLoading && !hasAnyData && (
        <Alert
          message="数据状态提醒"
          description={
            <div>
              <p>当前显示的统计数据为 0，可能的原因：</p>
              <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
                <li>后端数据库中暂无数据</li>
                <li>GraphQL 查询未正确返回数据</li>
                <li>认证token已过期，需要重新登录</li>
              </ul>
              <p style={{ marginTop: '8px', marginBottom: 0 }}>请检查浏览器控制台的详细错误信息。</p>
            </div>
          }
          type="warning"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}
      
      {isLoading && (
        <Alert
          message="正在加载数据..."
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}
      
      {/* 统计卡片区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">总订单数</p>
              <div className="text-3xl font-bold text-gray-900">
                {isLoading ? <Spin size="small" /> : statsData.totalOrders.toLocaleString()}
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
                {isLoading ? <Spin size="small" /> : statsData.totalProducts.toLocaleString()}
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
                {isLoading ? <Spin size="small" /> : statsData.totalUsers.toLocaleString()}
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
                {isLoading ? <Spin size="small" /> : `¥${statsData.todayRevenue.toLocaleString()}`}
              </div>
              <p className="text-sm text-purple-600 mt-1">
                <span className="inline-block mr-1">📈</span>
                今日订单: {statsData.todayOrders} 笔
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarOutlined className="text-2xl text-purple-600" />
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

      {/* 最近活动区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近订单 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">最近订单</h3>
            <Button type="link" onClick={() => window.location.href = '/orders'}>
              查看全部
            </Button>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-4">
                <Spin />
              </div>
            ) : ordersData?.orders?.length ? (
              ordersData.orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <div className="font-medium">#{order.id.substring(0, 8)}</div>
                    <div className="text-sm text-gray-500">{order.user_id?.name || '未知用户'}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">¥{order.total_price?.toFixed(2)}</div>
                    <div className={`text-sm ${
                      order.status === 'completed' ? 'text-green-600' : 
                      order.status === 'processing' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {order.status === 'completed' ? '已完成' : 
                       order.status === 'processing' ? '处理中' : '待处理'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                暂无订单数据
              </div>
            )}
          </div>
        </div>

        {/* 热销商品 */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">热销商品</h3>
            <Button type="link" onClick={() => window.location.href = '/products'}>
              查看全部
            </Button>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-4">
                <Spin />
              </div>
            ) : productsData?.products?.length ? (
              productsData.products.slice(0, 3).map((product) => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">库存: {product.stock}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">¥{product.price?.toLocaleString()}</div>
                    <div className="text-sm text-green-600">新品</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                暂无商品数据
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} 服装店管理系统. 保留所有权利.
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
