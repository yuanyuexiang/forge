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
  Progress,
  Button,
  message
} from 'antd';
import { 
  ShopOutlined, 
  UserOutlined,
  CalendarOutlined,
  RiseOutlined,
  FallOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import { 
  useGetVisitsQuery,
  useGetVisitsByCustomerQuery,
  useGetVisitsByBoutiqueQuery,
  useGetVisitStatsQuery,
  GetVisitsQuery
} from '../../generated/graphql';
import { ProtectedRoute, AdminLayout } from '@components';
import { TokenManager } from '@lib/auth';
import { exportVisits } from '@lib/utils';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

type Visit = NonNullable<GetVisitsQuery['visits'][0]>;

export default function VisitsPage() {
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [selectedBoutique, setSelectedBoutique] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | null>(null);

  // 获取用户ID
  useEffect(() => {
    const loadUserId = async () => {
      const user = await TokenManager.getCurrentUser();
      if (user?.id) {
        setUserId(user.id);
      }
    };
    loadUserId();
  }, []);

  // 查询访问记录
  const { data: visitsData, loading } = useGetVisitsQuery({
    variables: { userId },
    skip: !userId
  });
  const visits = visitsData?.visits || [];

  // 过滤访问记录
  const filteredVisits = visits.filter(visit => {
    if (!visit) return false;
    
    let matchesSearch = true;
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      matchesSearch = (
        visit.customer?.nick_name?.toLowerCase().includes(searchLower) ||
        visit.boutique?.name?.toLowerCase().includes(searchLower) ||
        visit.boutique?.address?.toLowerCase().includes(searchLower) ||
        visit.boutique?.city?.toLowerCase().includes(searchLower) ||
        visit.id.toLowerCase().includes(searchLower)
      );
    }

    let matchesDate = true;
    if (dateRange && visit.date_created) {
      const visitDate = dayjs(visit.date_created);
      matchesDate = visitDate.isAfter(dateRange[0].startOf('day')) && 
                   visitDate.isBefore(dateRange[1].endOf('day'));
    }

    let matchesBoutique = true;
    if (selectedBoutique && visit.boutique?.id !== selectedBoutique) {
      matchesBoutique = false;
    }

    return matchesSearch && matchesDate && matchesBoutique;
  });

  // 计算统计数据
  const totalVisits = visits.length;
  const uniqueCustomers = new Set(visits.map(v => v.customer?.id).filter(Boolean)).size;
  const uniqueBoutiques = new Set(visits.map(v => v.boutique?.id).filter(Boolean)).size;
  
  // 处理导出功能
  const handleExport = () => {
    try {
      if (visits.length === 0) {
        message.warning('暂无数据可导出');
        return;
      }
      exportVisits(visits);
      message.success('数据导出成功');
    } catch (error) {
      console.error('导出失败:', error);
      message.error('导出失败，请重试');
    }
  };
  
  const todayVisits = visits.filter(v => 
    v.date_created && dayjs(v.date_created).isAfter(dayjs().startOf('day'))
  ).length;

  const yesterdayVisits = visits.filter(v => 
    v.date_created && 
    dayjs(v.date_created).isAfter(dayjs().subtract(1, 'day').startOf('day')) &&
    dayjs(v.date_created).isBefore(dayjs().startOf('day'))
  ).length;

  // 热门店铺统计
  const boutiqueVisitCounts = visits.reduce((acc, visit) => {
    if (visit.boutique?.id) {
      acc[visit.boutique.id] = (acc[visit.boutique.id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topBoutiques = visits
    .filter(v => v.boutique)
    .reduce((acc, visit) => {
      const boutiqueId = visit.boutique!.id;
      if (!acc[boutiqueId]) {
        acc[boutiqueId] = {
          boutique: visit.boutique!,
          count: 0,
          uniqueCustomers: new Set<string>()
        };
      }
      acc[boutiqueId].count++;
      if (visit.customer?.id) {
        acc[boutiqueId].uniqueCustomers.add(visit.customer.id);
      }
      return acc;
    }, {} as Record<string, { boutique: any, count: number, uniqueCustomers: Set<string> }>);

  const topBoutiquesList = Object.values(topBoutiques)
    .map(item => ({
      ...item,
      uniqueCustomerCount: item.uniqueCustomers.size
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 活跃客户统计
  const customerVisitCounts = visits.reduce((acc, visit) => {
    if (visit.customer?.id) {
      acc[visit.customer.id] = (acc[visit.customer.id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topCustomers = visits
    .filter(v => v.customer)
    .reduce((acc, visit) => {
      const customerId = visit.customer!.id;
      if (!acc[customerId]) {
        acc[customerId] = {
          customer: visit.customer!,
          count: 0,
          boutiques: new Set<string>()
        };
      }
      acc[customerId].count++;
      if (visit.boutique?.id) {
        acc[customerId].boutiques.add(visit.boutique.id);
      }
      return acc;
    }, {} as Record<string, { customer: any, count: number, boutiques: Set<string> }>);

  const topCustomersList = Object.values(topCustomers)
    .map(item => ({
      ...item,
      visitedBoutiques: item.boutiques.size
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 获取所有店铺用于筛选
  const allBoutiques = visits
    .map(v => v.boutique)
    .filter((boutique, index, self) => 
      boutique && self.findIndex(b => b?.id === boutique.id) === index
    );

  // 表格列定义
  const columns = [
    {
      title: '访问记录ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <Tag color="green">{id.slice(0, 8)}...</Tag>
      ),
    },
    {
      title: '客户',
      key: 'customer',
      width: 200,
      render: (record: Visit) => {
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
      title: '访问店铺',
      key: 'boutique',
      width: 250,
      render: (record: Visit) => {
        if (!record.boutique) return <Tag>未知店铺</Tag>;
        return (
          <div>
            <div style={{ fontWeight: 500 }}>
              <ShopOutlined style={{ marginRight: 4 }} />
              {record.boutique.name}
            </div>
            {record.boutique.address && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: 2 }}>
                <EnvironmentOutlined style={{ marginRight: 4 }} />
                {record.boutique.address}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#666', marginTop: 2 }}>
              <Space size="small">
                {record.boutique.city && (
                  <Tag>{record.boutique.city}</Tag>
                )}
                {record.boutique.category && (
                  <Tag color="blue">{record.boutique.category}</Tag>
                )}
              </Space>
            </div>
          </div>
        );
      },
    },
    {
      title: '访问时间',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 180,
      render: (date: string) => date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-',
      sorter: (a: Visit, b: Visit) => {
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
                店铺访问统计
              </Title>
              <p style={{ color: '#6B7280', marginTop: 4, marginBottom: 0 }}>
                分析店铺访问情况，了解热门店铺和客户行为模式
              </p>
            </div>
            <Button 
              icon={<DownloadOutlined />}
              onClick={handleExport}
              disabled={visits.length === 0}
            >
              导出数据
            </Button>
          </div>

          {/* 统计卡片 */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总访问次数"
                  value={totalVisits}
                  prefix={<ShopOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="活跃客户"
                  value={uniqueCustomers}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="活跃店铺"
                  value={uniqueBoutiques}
                  prefix={<EnvironmentOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="今日访问"
                  value={todayVisits}
                  prefix={todayVisits > yesterdayVisits ? <RiseOutlined /> : <FallOutlined />}
                  valueStyle={{ 
                    color: todayVisits > yesterdayVisits ? '#52c41a' : '#ff4d4f' 
                  }}
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                  昨日: {yesterdayVisits} 次
                </div>
              </Card>
            </Col>
          </Row>

          {/* 热门店铺和活跃客户 */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Card title="热门店铺 TOP 5" extra={<ShopOutlined />}>
                {topBoutiquesList.length > 0 ? (
                  <div>
                    {topBoutiquesList.map((item, index) => (
                      <div key={item.boutique.id} style={{ 
                        padding: '12px 0',
                        borderBottom: index < topBoutiquesList.length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                            <Tag color={index < 3 ? ['gold', 'silver', 'orange'][index] : 'blue'}>
                              {index + 1}
                            </Tag>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 500 }}>{item.boutique.name}</div>
                              {item.boutique.address && (
                                <div style={{ fontSize: '12px', color: '#666', marginTop: 2 }}>
                                  {item.boutique.address}
                                </div>
                              )}
                              <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                                <Space size="small">
                                  <span>访问: {item.count} 次</span>
                                  <span>•</span>
                                  <span>独立客户: {item.uniqueCustomerCount} 人</span>
                                </Space>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Progress
                          percent={(item.count / totalVisits) * 100}
                          size="small"
                          showInfo={false}
                          style={{ marginTop: 8 }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty description="暂无数据" />
                )}
              </Card>
            </Col>
            <Col span={12}>
              <Card title="活跃客户 TOP 5" extra={<UserOutlined />}>
                {topCustomersList.length > 0 ? (
                  <div>
                    {topCustomersList.map((item, index) => (
                      <div key={item.customer.id} style={{ 
                        padding: '12px 0',
                        borderBottom: index < topCustomersList.length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                            <Tag color={index < 3 ? ['gold', 'silver', 'orange'][index] : 'blue'}>
                              {index + 1}
                            </Tag>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
                              {item.customer.avatar ? (
                                <Avatar src={item.customer.avatar} size="small" />
                              ) : (
                                <Avatar icon={<UserOutlined />} size="small" />
                              )}
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 500 }}>
                                  {item.customer.nick_name || '未设置昵称'}
                                </div>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: 2 }}>
                                  ID: {item.customer.id.slice(0, 8)}...
                                </div>
                                <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                                  <Space size="small">
                                    <span>访问: {item.count} 次</span>
                                    <span>•</span>
                                    <span>店铺: {item.visitedBoutiques} 家</span>
                                  </Space>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Progress
                          percent={(item.count / totalVisits) * 100}
                          size="small"
                          showInfo={false}
                          style={{ marginTop: 8 }}
                        />
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
              <Col span={6}>
                <Input.Search
                  placeholder="搜索客户、店铺、地址..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col span={6}>
                <RangePicker
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
                  placeholder={['开始日期', '结束日期']}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={6}>
                <Select
                  value={selectedBoutique}
                  onChange={setSelectedBoutique}
                  placeholder="筛选店铺"
                  style={{ width: '100%' }}
                  allowClear
                >
                  {allBoutiques.map(boutique => (
                    <Option key={boutique!.id} value={boutique!.id}>
                      {boutique!.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Card>

          {/* 访问记录表格 */}
          <Card title="访问记录详情">
            <Table
              columns={columns}
              dataSource={filteredVisits}
              rowKey="id"
              loading={loading}
              pagination={{
                total: filteredVisits.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
                pageSizeOptions: ['10', '20', '50', '100'],
                defaultPageSize: 20
              }}
            />
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}