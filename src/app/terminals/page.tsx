'use client'

import { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Space, 
  Input, 
  Typography, 
  message,
  Tag, 
  Row,
  Col,
  Statistic,
  Select
} from 'antd';
import { 
  DesktopOutlined,
  ClockCircleOutlined,
  UserOutlined,
  AndroidOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { 
  useGetTerminalsQuery,
  GetTerminalsQuery
} from '../../generated/graphql';
import { ProtectedRoute, AdminLayout, BoutiqueSelector } from '@components';
import { TokenManager } from '@lib/auth';
import { exportTerminals } from '@lib/utils';
import dayjs from 'dayjs';

const { Title } = Typography;

type Terminal = NonNullable<GetTerminalsQuery['terminals'][0]>;

export default function TerminalsPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string | undefined>(undefined);

  // 查询指定店铺的终端设备
  const { data: terminalsData, loading, refetch } = useGetTerminalsQuery({
    variables: selectedBoutiqueId ? { boutiqueId: selectedBoutiqueId } : undefined,
    skip: !selectedBoutiqueId
  });
  const terminals = terminalsData?.terminals || [];

  // 过滤终端设备
  const filteredTerminals = terminals.filter(terminal => {
    if (!searchText) return true;
    const searchLower = searchText.toLowerCase();
    return (
      terminal.id.toLowerCase().includes(searchLower) ||
      terminal.device_name?.toLowerCase().includes(searchLower) ||
      terminal.android_id?.toLowerCase().includes(searchLower) ||
      terminal.brand?.toLowerCase().includes(searchLower) ||
      terminal.model_name?.toLowerCase().includes(searchLower) ||
      terminal.manufacturer?.toLowerCase().includes(searchLower) ||
      terminal.purposes?.toLowerCase().includes(searchLower) ||
      terminal.authorized_boutique?.name?.toLowerCase().includes(searchLower)
    );
  });

  // 处理导出功能
  const handleExport = () => {
    try {
      if (terminals.length === 0) {
        message.warning('暂无数据可导出');
        return;
      }
      exportTerminals(terminals);
      message.success('数据导出成功');
    } catch (error) {
      console.error('导出失败:', error);
      message.error('导出失败，请重试');
    }
  };

  // 计算统计数据
  const totalTerminals = terminals.length;
  const authorizedTerminals = terminals.filter(t => t.authorized_boutique).length;
  const todayTerminals = terminals.filter(t => 
    t.date_created && dayjs(t.date_created).isAfter(dayjs().startOf('day'))
  ).length;
  const androidTerminals = terminals.filter(t => 
    t.os_name?.toLowerCase().includes('android')
  ).length;

  // 表格列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string) => (
        <Tag color="blue">{id.slice(0, 8)}...</Tag>
      ),
    },
    {
      title: '设备名称',
      dataIndex: 'device_name',
      key: 'device_name',
      width: 150,
      render: (name: string) => name || '-',
    },
    {
      title: '设备信息',
      key: 'device_info',
      width: 250,
      render: (record: Terminal) => (
        <div>
          <div><strong>品牌:</strong> {record.brand || '-'}</div>
          <div><strong>型号:</strong> {record.model_name || '-'}</div>
          <div><strong>制造商:</strong> {record.manufacturer || '-'}</div>
        </div>
      ),
    },
    {
      title: '系统信息',
      key: 'os_info',
      width: 200,
      render: (record: Terminal) => (
        <div>
          <div><strong>系统:</strong> {record.os_name || '-'}</div>
          <div><strong>版本:</strong> {record.os_version || '-'}</div>
          <div><strong>类型:</strong> {record.device_type || '-'}</div>
        </div>
      ),
    },
    {
      title: '授权店铺',
      key: 'authorized_boutique',
      width: 200,
      render: (record: Terminal) => (
        <div>
          {record.authorized_boutique ? (
            <>
              <div><strong>{record.authorized_boutique.name}</strong></div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {record.authorized_boutique.address}
              </div>
            </>
          ) : (
            <Tag color="red">未授权</Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Android ID',
      dataIndex: 'android_id',
      key: 'android_id',
      width: 150,
      render: (id: string) => id ? (
        <Tag color="green">{id.slice(0, 12)}...</Tag>
      ) : '-',
    },
    {
      title: '用途',
      dataIndex: 'purposes',
      key: 'purposes',
      width: 120,
      render: (purposes: string) => purposes || '-',
    },
    {
      title: '创建时间',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 180,
      render: (date: string) => date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-',
      sorter: (a: Terminal, b: Terminal) => {
        const dateA = a.date_created ? new Date(a.date_created).getTime() : 0;
        const dateB = b.date_created ? new Date(b.date_created).getTime() : 0;
        return dateA - dateB;
      },
    },
  ];

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div style={{ height: '100%', padding: '24px', backgroundColor: '#F9FAFB' }}>
          <div className="mb-6 flex justify-between items-center">
            <Title level={4} style={{ margin: 0, color: '#111827', fontWeight: 600 }}>
              终端设备管理
            </Title>
            <Space>
              <Button 
                onClick={handleExport}
                disabled={terminals.length === 0}
              >
                导出数据
              </Button>
            </Space>
          </div>

          {/* 统计卡片 */}
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总终端数"
                  value={totalTerminals}
                  prefix={<DesktopOutlined />}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已授权终端"
                  value={authorizedTerminals}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="今日新增"
                  value={todayTerminals}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#fa8c16' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Android设备率"
                  value={totalTerminals > 0 ? ((androidTerminals / totalTerminals) * 100) : 0}
                  suffix="%"
                  precision={1}
                  valueStyle={{ color: '#722ed1' }}
                />
              </Card>
            </Col>
          </Row>

          {/* 搜索和筛选栏 */}
          <Card style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={6}>
                <BoutiqueSelector
                  value={selectedBoutiqueId}
                  onChange={setSelectedBoutiqueId}
                  placeholder="请选择店铺"
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={8}>
                <Input.Search
                  placeholder="搜索设备名称、Android ID、用途..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                  disabled={!selectedBoutiqueId}
                />
              </Col>
            </Row>
          </Card>

          {/* 主要内容 */}
          {!selectedBoutiqueId ? (
            <Card>
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <DesktopOutlined style={{ fontSize: 64, color: '#ccc', marginBottom: 16 }} />
                <div style={{ fontSize: 16, color: '#666' }}>请先选择一个店铺查看终端设备数据</div>
              </div>
            </Card>
          ) : (
            <Card>
              <Table
                columns={columns}
                dataSource={filteredTerminals}
                rowKey="id"
                loading={loading}
                pagination={{
                  total: filteredTerminals.length,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
                  pageSizeOptions: ['10', '20', '50', '100'],
                }}
              />
            </Card>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}