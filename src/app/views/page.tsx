'use client'

import { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Typography, 
  Row,
  Col,
  Statistic,
  Input,
  Select,
  DatePicker,
  Tag,
  Avatar,
  Space,
  Empty,
  Button,
  message
} from 'antd';
import { 
  EyeOutlined, 
  ShoppingOutlined,
  UserOutlined,
  ShopOutlined,
  RiseOutlined,
  BarChartOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { 
  useGetViewsQuery,
  useGetViewsByCustomerQuery,
  useGetViewsByProductQuery,
  useGetViewsByBoutiqueQuery,
  GetViewsQuery
} from '../../generated/graphql';
import { ProtectedRoute, AdminLayout, BoutiqueSelector } from '@components';
import { TokenManager } from '@lib/auth';
import { exportViews } from '@lib/utils';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

type View = NonNullable<GetViewsQuery['views'][0]>;

export default function ViewsPage() {
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'customer' | 'product' | 'boutique'>('all');
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string | undefined>(undefined);

  // 查询指定店铺的浏览记录
  const { data: viewsData, loading } = useGetViewsQuery({
    variables: selectedBoutiqueId ? { boutiqueId: selectedBoutiqueId } : undefined,
    skip: !selectedBoutiqueId
  });
  const views = viewsData?.views || [];

  // 过滤浏览记录
  const filteredViews = views.filter(view => {
    if (!view) return false;
    
    let matchesSearch = true;
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      matchesSearch = (
        view.customer?.nick_name?.toLowerCase().includes(searchLower) ||
        view.product?.name?.toLowerCase().includes(searchLower) ||
        view.boutique?.name?.toLowerCase().includes(searchLower) ||
        view.id.toLowerCase().includes(searchLower)
      );
    }

    let matchesDate = true;
    if (dateRange && view.date_created) {
      const viewDate = dayjs(view.date_created);
      matchesDate = viewDate.isAfter(dateRange[0].startOf('day')) && 
                   viewDate.isBefore(dateRange[1].endOf('day'));
    }

    return matchesSearch && matchesDate;
  });

  // 计算统计数据
  const totalViews = views.length;
  const uniqueCustomers = new Set(views.map(v => v.customer?.id).filter(Boolean)).size;
  const uniqueProducts = new Set(views.map(v => v.product?.id).filter(Boolean)).size;
  const uniqueBoutiques = new Set(views.map(v => v.boutique?.id).filter(Boolean)).size;
  
  const todayViews = views.filter(v => 
    v.date_created && dayjs(v.date_created).isAfter(dayjs().startOf('day'))
  ).length;

  // 处理导出功能
  const handleExport = () => {
    try {
      if (views.length === 0) {
        message.warning('暂无数据可导出');
        return;
      }
      exportViews(views);
      message.success('数据导出成功');
    } catch (error) {
      console.error('导出失败:', error);
      message.error('导出失败，请重试');
    }
  };

  // 热门商品统计
  const productViewCounts = views.reduce((acc, view) => {
    if (view.product?.id) {
      acc[view.product.id] = (acc[view.product.id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topProducts = views
    .filter(v => v.product)
    .reduce((acc, view) => {
      const productId = view.product!.id;
      if (!acc[productId]) {
        acc[productId] = {
          product: view.product!,
          count: 0
        };
      }
      acc[productId].count++;
      return acc;
    }, {} as Record<string, { product: any, count: number }>);

  const topProductsList = Object.values(topProducts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 活跃客户统计
  const customerViewCounts = views.reduce((acc, view) => {
    if (view.customer?.id) {
      acc[view.customer.id] = (acc[view.customer.id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topCustomers = views
    .filter(v => v.customer)
    .reduce((acc, view) => {
      const customerId = view.customer!.id;
      if (!acc[customerId]) {
        acc[customerId] = {
          customer: view.customer!,
          count: 0
        };
      }
      acc[customerId].count++;
      return acc;
    }, {} as Record<string, { customer: any, count: number }>);

  const topCustomersList = Object.values(topCustomers)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 表格列定义
  const columns = [
    {
      title: '浏览记录ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <Tag color="blue">{id.slice(0, 8)}...</Tag>
      ),
    },
    {
      title: '客户',
      key: 'customer',
      width: 200,
      render: (record: View) => {
        if (!record.customer) return <Tag>未知客户</Tag>;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {record.customer.avatar ? (
              <Avatar src={record.customer.avatar} size="small" />
            ) : (
              <Avatar icon={<UserOutlined />} size="small" />
            )}
            <div>
              <div>{record.customer.nick_name || '未设置昵称'}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                ID: {record.customer.id.slice(0, 8)}...
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: '商品',
      key: 'product',
      width: 250,
      render: (record: View) => {
        if (!record.product) return <Tag>未知商品</Tag>;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {record.product.main_image ? (
              <Avatar 
                src={record.product.main_image} 
                size="small" 
                shape="square"
              />
            ) : (
              <Avatar 
                icon={<ShoppingOutlined />} 
                size="small" 
                shape="square"
              />
            )}
            <div>
              <div style={{ fontWeight: 500 }}>{record.product.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                ¥{record.product.price} 
                {record.product.market_price && record.product.market_price !== record.product.price && (
                  <span style={{ textDecoration: 'line-through', marginLeft: 8 }}>
                    ¥{record.product.market_price}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: '店铺',
      key: 'boutique',
      width: 180,
      render: (record: View) => {
        if (!record.boutique) return <Tag>未知店铺</Tag>;
        return (
          <div>
            <div style={{ fontWeight: 500 }}>
              <ShopOutlined style={{ marginRight: 4 }} />
              {record.boutique.name}
            </div>
            {record.boutique.address && (
              <div style={{ fontSize: '12px', color: '#666' }}>
                {record.boutique.address}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: '浏览时间',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 180,
      render: (date: string) => date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-',
      sorter: (a: View, b: View) => {
        const dateA = a.date_created ? new Date(a.date_created).getTime() : 0;
        const dateB = b.date_created ? new Date(b.date_created).getTime() : 0;
        return dateB - dateA; // 降序排列，最新的在前面
      },
      defaultSortOrder: 'descend' as const,
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div style={{ height: '100%', padding: '24px', backgroundColor: '#F9FAFB' }}>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <Title level={4} style={{ margin: 0, color: '#111827', fontWeight: 600 }}>
                商品浏览分析
              </Title>
              <p style={{ color: '#6B7280', marginTop: 4, marginBottom: 0 }}>
                分析用户浏览行为，了解热门商品和活跃用户
              </p>
            </div>
            <Button 
              icon={<DownloadOutlined />}
              onClick={handleExport}
              disabled={views.length === 0}
            >
              导出数据
            </Button>
          </div>

          {/* 统计卡片 */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总浏览次数"
                  value={totalViews}
                  prefix={<EyeOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="活跃用户"
                  value={uniqueCustomers}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="被浏览商品"
                  value={uniqueProducts}
                  prefix={<ShoppingOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="今日浏览"
                  value={todayViews}
                  prefix={<RiseOutlined />}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
          </Row>

          {/* 热门商品和活跃用户 */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Card title="热门商品 TOP 5" extra={<BarChartOutlined />}>
                {topProductsList.length > 0 ? (
                  <div>
                    {topProductsList.map((item, index) => (
                      <div key={item.product.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: index < topProductsList.length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Tag color={index < 3 ? ['gold', 'silver', 'orange'][index] : 'blue'}>
                            {index + 1}
                          </Tag>
                          <div>
                            <div style={{ fontWeight: 500 }}>{item.product.name}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              ¥{item.product.price}
                            </div>
                          </div>
                        </div>
                        <Tag color="blue">{item.count} 次浏览</Tag>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty description="暂无数据" />
                )}
              </Card>
            </Col>
            <Col span={12}>
              <Card title="活跃用户 TOP 5" extra={<UserOutlined />}>
                {topCustomersList.length > 0 ? (
                  <div>
                    {topCustomersList.map((item, index) => (
                      <div key={item.customer.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: index < topCustomersList.length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Tag color={index < 3 ? ['gold', 'silver', 'orange'][index] : 'blue'}>
                            {index + 1}
                          </Tag>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {item.customer.avatar ? (
                              <Avatar src={item.customer.avatar} size="small" />
                            ) : (
                              <Avatar icon={<UserOutlined />} size="small" />
                            )}
                            <div>
                              <div style={{ fontWeight: 500 }}>
                                {item.customer.nick_name || '未设置昵称'}
                              </div>
                              <div style={{ fontSize: '12px', color: '#666' }}>
                                ID: {item.customer.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </div>
                        <Tag color="green">{item.count} 次浏览</Tag>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty description="暂无数据" />
                )}
              </Card>
            </Col>
          </Row>

          {/* 筛选器 */}
          <Card style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={4}>
                <BoutiqueSelector
                  value={selectedBoutiqueId}
                  onChange={setSelectedBoutiqueId}
                  placeholder="请选择店铺"
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={5}>
                <Input.Search
                  placeholder="搜索客户、商品、店铺..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                  disabled={!selectedBoutiqueId}
                />
              </Col>
              <Col span={5}>
                <RangePicker
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: '100%' }}
                  disabled={!selectedBoutiqueId}
                />
              </Col>
              <Col span={5}>
                <Select
                  value={filterType}
                  onChange={setFilterType}
                  style={{ width: '100%' }}
                  placeholder="筛选类型"
                  disabled={!selectedBoutiqueId}
                >
                  <Option value="all">全部</Option>
                  <Option value="customer">按客户</Option>
                  <Option value="product">按商品</Option>
                  <Option value="boutique">按店铺</Option>
                </Select>
              </Col>
            </Row>
          </Card>

          {/* 浏览记录表格 */}
          {!selectedBoutiqueId ? (
            <Card title="浏览记录详情">
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <EyeOutlined style={{ fontSize: 64, color: '#ccc', marginBottom: 16 }} />
                <div style={{ fontSize: 16, color: '#666' }}>请先选择一个店铺查看浏览数据</div>
              </div>
            </Card>
          ) : (
            <Card title="浏览记录详情">
              <Table
                columns={columns}
                dataSource={filteredViews}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: filteredViews.length,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  defaultPageSize: 20
                }}
              />
            </Card>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}