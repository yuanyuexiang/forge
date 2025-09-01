'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Table, 
  Button, 
  Space, 
  message, 
  Popconfirm,
  Typography,
  Image,
  Input,
  Rate,
  Tag
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  ShopOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { ProtectedRoute, AdminLayout } from '@components';
import { 
  useGetBoutiquesQuery,
  useDeleteBoutiqueMutation,
  GetBoutiquesQuery
} from '@generated/graphql';
import { FILE_CONFIG } from '@lib/api';

const { Search } = Input;
const { Title } = Typography;

// 使用生成的类型
type Boutique = GetBoutiquesQuery['boutiques'][0];

// 店铺状态映射
const getBoutiqueStatusInfo = (status: string) => {
  const statusMap = {
    'open': {
      text: '已开放',
      color: '#10B981',
      bgColor: '#ECFDF5',
      icon: <CheckCircleOutlined />
    },
    'closed': {
      text: '已关闭',
      color: '#6B7280',
      bgColor: '#F9FAFB',
      icon: <EyeInvisibleOutlined />
    },
  };
  return statusMap[status as keyof typeof statusMap] || statusMap['open'];
};

function BoutiquesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  // 查询店铺列表
  const { data: boutiquesData, loading, error, refetch } = useGetBoutiquesQuery();
  
  // 从 URL 参数恢复状态
  useEffect(() => {
    const page = searchParams.get('page');
    const size = searchParams.get('pageSize');
    const search = searchParams.get('search');
    const scrollPos = searchParams.get('scrollPos');

    if (page) setCurrentPage(parseInt(page));
    if (size) setPageSize(parseInt(size));
    if (search) setSearchText(search);

    // 恢复滚动位置
    if (scrollPos && containerRef.current) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(scrollPos));
      }, 100);
    }
  }, [searchParams]);

  // 删除店铺
  const [deleteBoutique] = useDeleteBoutiqueMutation({
    onCompleted: () => {
      message.success('店铺删除成功');
      refetch();
    },
    onError: (error) => {
      console.error('删除店铺失败:', error);
      message.error('删除店铺失败');
    }
  });

  const boutiques = boutiquesData?.boutiques || [];

  // 调试: 检查店铺数据结构 (可在生产环境中移除)
  if (process.env.NODE_ENV === 'development') {
    console.log('Boutiques data:', boutiques);
    if (boutiques.length > 0) {
      console.log('First boutique images:', boutiques[0].images);
      console.log('First boutique main_image:', boutiques[0].main_image);
    }
  }

  // 处理错误
  if (error) {
    message.error('获取店铺列表失败');
  }

  // 删除店铺
  const handleDeleteBoutique = async (id: string) => {
    try {
      await deleteBoutique({
        variables: { id }
      });
    } catch (error) {
      console.error('删除店铺失败:', error);
    }
  };

  // 编辑店铺
  const handleEditBoutique = (id: string) => {
    // 保存当前状态到 URL 参数
    const currentScrollPos = window.scrollY;
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('pageSize', pageSize.toString());
    params.set('search', searchText);
    params.set('scrollPos', currentScrollPos.toString());
    
    router.push(`/boutiques/${id}?return=${encodeURIComponent(params.toString())}`);
  };

  // 新增店铺
  const handleAddBoutique = () => {
    // 保存当前状态到 URL 参数，用于新增完成后返回
    const currentScrollPos = window.scrollY;
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('pageSize', pageSize.toString());
    params.set('search', searchText);
    params.set('scrollPos', currentScrollPos.toString());
    
    router.push(`/boutiques/new?return=${encodeURIComponent(params.toString())}`);
  };

  // 过滤店铺
  const filteredBoutiques = boutiques.filter((boutique: Boutique) =>
    boutique.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    boutique.address?.toLowerCase().includes(searchText.toLowerCase())
  );

  // 生成带认证的图片URL
  const getImageUrl = useCallback((imageId: string): string => {
    return FILE_CONFIG.getAssetUrl(imageId);
  }, []);

  // 解析图片字段，处理 JSON 字符串或数组
  const parseImages = useCallback((images: any): string[] => {
    if (!images) return [];
    
    try {
      // 如果是字符串，尝试解析为JSON
      if (typeof images === 'string') {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [];
      }
      // 如果已经是数组，直接返回
      if (Array.isArray(images)) {
        return images;
      }
      return [];
    } catch (error) {
      console.warn('解析图片数据失败:', error, images);
      return [];
    }
  }, []);

  // 表格列定义
  const columns = [
    {
      title: '店铺图片',
      dataIndex: 'main_image',
      key: 'main_image',
      width: 80,
      render: (main_image: string, record: Boutique) => {
        // 开发环境调试日志
        if (process.env.NODE_ENV === 'development') {
          console.log('店铺主图数据:', { 
            main_image, 
            images: record.images,
            record: record.name,
            main_image_type: typeof main_image,
            images_type: typeof record.images,
            generated_url: main_image ? getImageUrl(main_image) : 'no image'
          });
        }
        
        return main_image ? (
          <div>
            <Image
              src={getImageUrl(main_image)}
              alt="店铺图片"
              width={60}
              height={60}
              style={{ objectFit: 'cover', borderRadius: '4px' }}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dy"
              onError={(e) => {
                if (process.env.NODE_ENV === 'development') {
                  console.error('图片加载失败:', main_image, getImageUrl(main_image), e);
                }
              }}
            />
            {process.env.NODE_ENV === 'development' && (
              <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                {main_image.startsWith('rc-upload-') ? '临时文件' : 'ID: ' + main_image.substring(0, 8)}
              </div>
            )}
          </div>
        ) : (
          <div 
            style={{ 
              width: 60, 
              height: 60, 
              backgroundColor: '#f5f5f5', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '4px',
              color: '#999'
            }}
          >
            <ShopOutlined />
          </div>
        );
      },
    },
    {
      title: '店铺名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Boutique, b: Boutique) => (a.name || '').localeCompare(b.name || ''),
      width: 200,
    },
    {
      title: '评分',
      dataIndex: 'stars',
      key: 'stars',
      width: 150,
      render: (stars: number) => (
        <Rate disabled value={stars || 0} />
      ),
      sorter: (a: Boutique, b: Boutique) => (a.stars || 0) - (b.stars || 0),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      render: (address: string) => (
        <div 
          style={{ 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            maxWidth: '180px'
          }}
          title={address}
        >
          {address || '-'}
        </div>
      ),
      sorter: (a: Boutique, b: Boutique) => (a.address || '').localeCompare(b.address || ''),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const statusInfo = getBoutiqueStatusInfo(status);
        return (
          <Tag 
            color={statusInfo.color}
            icon={statusInfo.icon}
          >
            {statusInfo.text}
          </Tag>
        );
      },
      filters: [
        { text: '草稿', value: 'draft' },
        { text: '已发布', value: 'published' },
        { text: '已归档', value: 'archived' }
      ],
      onFilter: (value: any, record: Boutique) => record.status === value,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 80,
      render: (sort: number) => sort || 0,
      sorter: (a: Boutique, b: Boutique) => (a.sort || 0) - (b.sort || 0),
    },
    {
      title: '创建时间',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 120,
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-',
      sorter: (a: Boutique, b: Boutique) => {
        const dateA = a.date_created ? new Date(a.date_created).getTime() : 0;
        const dateB = b.date_created ? new Date(b.date_created).getTime() : 0;
        return dateA - dateB;
      },
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Boutique) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditBoutique(record.id)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个店铺吗?"
            onConfirm={() => handleDeleteBoutique(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div ref={containerRef} style={{ height: '100%', padding: '24px', backgroundColor: '#F9FAFB' }}>
      <div className="mb-6 flex justify-between items-center">
        <Title level={4} style={{ margin: 0, color: '#111827', fontWeight: 600 }}>店铺管理</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAddBoutique}
          style={{ backgroundColor: '#C5A46D', borderColor: '#C5A46D', color: '#111827', fontWeight: 600 }}
        >
          新增店铺
        </Button>
      </div>

      <div className="mb-4">
        <Search
          placeholder="搜索店铺名称"
          allowClear
          style={{ width: 300 }}
          onSearch={setSearchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
        />
      </div>

      <div style={{ background: '#fff', minHeight: 'calc(100vh - 280px)' }}>
        <Table
          columns={columns}
          dataSource={filteredBoutiques}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条店铺记录`,
            size: 'default',
            position: ['bottomCenter'],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size || 10);
            }
          }}
          scroll={{ y: 'calc(100vh - 180px)' }}
          size="middle"
        />
      </div>
    </div>
  );
}

export default function BoutiquesPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <BoutiquesContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
