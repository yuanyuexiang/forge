'use client';

import React, { useState } from 'react';
import { Typography, Spin, Button, Alert } from 'antd';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCartOutlined, 
  UserOutlined, 
  ShoppingOutlined,
  DashboardOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { ProtectedRoute, AdminLayout } from '@components';
import { 
  useGetDashboardDataQuery,
  useGetRecentOrdersQuery
} from '../../generated/graphql';

const { Title } = Typography;

// 商品状态映射
const getProductStatusInfo = (status: string) => {
  const statusMap = {
    'draft': {
      text: '草稿',
      color: '#8B5CF6',
      icon: <FileTextOutlined />
    },
    'pending_review': {
      text: '待审核',
      color: '#F59E0B',
      icon: <ClockCircleOutlined />
    },
    'on_sale': {
      text: '在售',
      color: '#10B981',
      icon: <CheckCircleOutlined />
    },
    'off_sale': {
      text: '下架',
      color: '#EF4444',
      icon: <EyeInvisibleOutlined />
    }
  };
  
  return statusMap[status as keyof typeof statusMap] || {
    text: status,
    color: '#6B7280',
    icon: <ShoppingOutlined />
  };
};

function DashboardContent() {
  const router = useRouter();
  // 获取今日日期（格式：YYYY-MM-DD）
  const today = new Date().toISOString().split('T')[0];
  
  // 使用 GraphQL hooks 获取仪表板数据
  const { data: dashboardData, loading: dashboardLoading, error: dashboardError } = useGetDashboardDataQuery({
    variables: { today }
  });
  const { data: ordersData, loading: ordersLoading } = useGetRecentOrdersQuery({ variables: { limit: 3 } });

  const loading = dashboardLoading || ordersLoading;

  // 从 GraphQL 数据中提取统计信息，优先使用聚合数据，回退到数组长度
  const statsData = {
    totalOrders: dashboardData?.orders_aggregated?.[0]?.countAll || dashboardData?.orders?.length || 0,
    totalProducts: dashboardData?.products_aggregated?.[0]?.countAll || dashboardData?.products?.length || 0,
    totalUsers: dashboardData?.wechat_users_aggregated?.[0]?.countAll || dashboardData?.wechat_users?.length || 0,
    totalCategories: dashboardData?.categories_aggregated?.[0]?.countAll || dashboardData?.categories?.length || 0,
    totalBoutiques: dashboardData?.boutiques_aggregated?.[0]?.countAll || dashboardData?.boutiques?.length || 0,
    todayOrders: dashboardData?.today_orders?.length || 0
  };

  // 详细调试信息
  console.log('=== Dashboard Debug Info ===');
  console.log('Dashboard data:', dashboardData);
  console.log('Dashboard loading:', dashboardLoading);
  console.log('Dashboard error:', dashboardError);
  console.log('Orders data:', ordersData);
  console.log('WeChat users aggregated:', dashboardData?.wechat_users_aggregated);
  console.log('Products aggregated:', dashboardData?.products_aggregated);
  console.log('Orders aggregated:', dashboardData?.orders_aggregated);
  console.log('Categories aggregated:', dashboardData?.categories_aggregated);
  console.log('Boutiques aggregated:', dashboardData?.boutiques_aggregated);
  console.log('Today orders:', dashboardData?.today_orders);
  console.log('Final stats data:', statsData);
  console.log('=== End Debug Info ===');
  
  // 检查是否有认证错误
  const hasAuthError = dashboardError?.message?.includes('credentials') || 
                      dashboardError?.message?.includes('Unauthorized') ||
                      dashboardError?.message?.includes('token');
  
  // 如果所有数据都为0，显示警告信息
  const hasAnyData = statsData.totalUsers > 0 || statsData.totalProducts > 0 || statsData.totalOrders > 0;
  const isLoading = dashboardLoading || ordersLoading;

  if (dashboardError) {
    // 检查是否是认证错误
    if (hasAuthError) {
      return (
        <div className="p-6">
          <Alert 
            message="认证失效" 
            description={
              <div>
                <p>您的登录状态已过期，请重新登录以查看数据。</p>
                <Button 
                  type="primary" 
                  onClick={() => router.push('/login')}
                  style={{ marginTop: '12px' }}
                >
                  重新登录
                </Button>
              </div>
            } 
            type="warning" 
            showIcon 
          />
        </div>
      );
    }
    
    return (
      <div className="p-6">
        <Alert 
          message="数据加载失败" 
          description={`无法获取仪表板数据：${dashboardError.message}`} 
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
                <li><strong>认证token已过期，需要重新登录</strong></li>
              </ul>
              <p style={{ marginTop: '8px', marginBottom: '12px' }}>请检查浏览器控制台的详细错误信息。</p>
              <div>
                <Button 
                  type="primary" 
                  onClick={() => router.push('/login')}
                  style={{ marginRight: '8px' }}
                >
                  重新登录
                </Button>
                <Button onClick={() => window.location.reload()}>
                  刷新页面
                </Button>
              </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: 500 }}>总订单数</p>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>
                {isLoading ? <Spin size="small" /> : statsData.totalOrders.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#059669', marginTop: '8px', fontWeight: 500 }}>
                <span className="inline-block mr-1">↗</span>
                较昨日 +12%
              </p>
            </div>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', 
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(31, 41, 55, 0.3)'
            }}>
              <ShoppingCartOutlined style={{ fontSize: '24px', color: '#C5A46D' }} />
            </div>
          </div>
        </div>
        
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: 500 }}>商品总数</p>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>
                {isLoading ? <Spin size="small" /> : statsData.totalProducts.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#3B82F6', marginTop: '8px', fontWeight: 500 }}>
                <span className="inline-block mr-1">↗</span>
                较昨日 +3%
              </p>
            </div>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              background: 'linear-gradient(135deg, #C5A46D 0%, #B8935A 100%)', 
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(197, 164, 109, 0.3)'
            }}>
              <ShoppingOutlined style={{ fontSize: '24px', color: '#FFFFFF' }} />
            </div>
          </div>
        </div>
        
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: 500 }}>用户总数</p>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>
                {isLoading ? <Spin size="small" /> : statsData.totalUsers.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#DC2626', marginTop: '8px', fontWeight: 500 }}>
                <span className="inline-block mr-1">↗</span>
                较昨日 +8%
              </p>
            </div>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              background: 'linear-gradient(135deg, #7C2D12 0%, #92400E 100%)', 
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124, 45, 18, 0.3)'
            }}>
              <UserOutlined style={{ fontSize: '24px', color: '#FED7AA' }} />
            </div>
          </div>
        </div>
        
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: 500 }}>店铺总数</p>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>
                {isLoading ? <Spin size="small" /> : statsData.totalBoutiques.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#059669', marginTop: '8px', fontWeight: 500 }}>
                <span className="inline-block mr-1">🏪</span>
                入驻店铺
              </p>
            </div>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)', 
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(6, 95, 70, 0.3)'
            }}>
              <ShopOutlined style={{ fontSize: '24px', color: '#A7F3D0' }} />
            </div>
          </div>
        </div>
        
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: 500 }}>商品分类</p>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>
                {isLoading ? <Spin size="small" /> : statsData.totalCategories.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#7C3AED', marginTop: '8px', fontWeight: 500 }}>
                <span className="inline-block mr-1">🏷️</span>
                分类管理
              </p>
            </div>
            <div style={{ 
              width: '56px', 
              height: '56px', 
              background: 'linear-gradient(135deg, #581C87 0%, #6B21A8 100%)', 
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(88, 28, 135, 0.3)'
            }}>
              <FileTextOutlined style={{ fontSize: '24px', color: '#DDD6FE' }} />
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
              onClick={() => router.push('/products')}
            >
              管理商品
            </Button>
            <Button 
              icon={<ShoppingCartOutlined />}
              className="h-12"
              onClick={() => router.push('/orders')}
            >
              查看订单
            </Button>
            <Button 
              icon={<UserOutlined />}
              className="h-12"
              onClick={() => router.push('/users')}
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
            <Button type="link" onClick={() => router.push('/orders')}>
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
                    <div className="text-sm text-gray-500">{order.wechat_user_id?.name || '未知用户'}</div>
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
            <Button type="link" onClick={() => router.push('/products')}>
              查看全部
            </Button>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center py-4">
                <Spin />
              </div>
            ) : statsData.totalProducts > 0 ? (
              <div className="text-center py-4 text-gray-600">
                <div className="font-medium">总商品数: {statsData.totalProducts}</div>
                <div className="text-sm mt-2">详细商品信息请访问商品管理页面</div>
              </div>
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
