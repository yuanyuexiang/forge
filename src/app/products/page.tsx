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
  Input
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { ProtectedRoute, AdminLayout } from '@components';
import { 
  useGetProductsQuery,
  useDeleteProductMutation,
  GetProductsQuery
} from '@generated/graphql';
import { FILE_CONFIG } from '@lib/api';
import { TokenManager } from '@lib/auth';

const { Search } = Input;
const { Title } = Typography;

// 使用生成的类型
type Product = GetProductsQuery['products'][0];

// 商品状态映射
const getProductStatusInfo = (status: string) => {
  const statusMap = {
    'draft': {
      text: '草稿',
      color: '#8B5CF6',
      bgColor: '#F3F0FF',
      icon: <FileTextOutlined />
    },
    'pending_review': {
      text: '待审核',
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      icon: <ClockCircleOutlined />
    },
    'on_sale': {
      text: '在售',
      color: '#10B981',
      bgColor: '#ECFDF5',
      icon: <CheckCircleOutlined />
    },
    'off_sale': {
      text: '下架',
      color: '#EF4444',
      bgColor: '#FEF2F2',
      icon: <EyeInvisibleOutlined />
    }
  };
  
  return statusMap[status as keyof typeof statusMap] || {
    text: status,
    color: '#6B7280',
    bgColor: '#F9FAFB',
    icon: <EyeOutlined />
  };
};

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);

  // 获取当前用户 ID
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
  }, []);

  // 查询产品列表
  const { data: productsData, loading, error, refetch } = useGetProductsQuery({
    variables: userId ? { userId } : undefined,
    skip: !userId // 如果没有用户 ID 就跳过查询
  });
  
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

  // 删除产品
  const [deleteProduct] = useDeleteProductMutation({
    onCompleted: () => {
      message.success('商品删除成功');
      refetch();
    },
    onError: (error) => {
      console.error('删除商品失败:', error);
      message.error('删除商品失败');
    }
  });

  const products = productsData?.products || [];

  // 处理错误
  if (error) {
    message.error('获取商品列表失败');
  }

  // 删除商品
  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct({
        variables: { id }
      });
    } catch (error) {
      console.error('删除商品失败:', error);
    }
  };

  // 编辑商品
  const handleEditProduct = (id: string) => {
    // 保存当前状态到 URL 参数
    const currentScrollPos = window.scrollY;
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('pageSize', pageSize.toString());
    params.set('search', searchText);
    params.set('scrollPos', currentScrollPos.toString());
    
    router.push(`/products/${id}?return=${encodeURIComponent(params.toString())}`);
  };

  // 新增商品
  const handleAddProduct = () => {
    // 保存当前状态到 URL 参数，用于新增完成后返回
    const currentScrollPos = window.scrollY;
    const params = new URLSearchParams();
    params.set('page', currentPage.toString());
    params.set('pageSize', pageSize.toString());
    params.set('search', searchText);
    params.set('scrollPos', currentScrollPos.toString());
    
    router.push(`/products/new?return=${encodeURIComponent(params.toString())}`);
  };

  // 过滤商品
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    (product.category_id?.name && product.category_id.name.toLowerCase().includes(searchText.toLowerCase())) ||
    (product.boutique_id?.name && product.boutique_id.name.toLowerCase().includes(searchText.toLowerCase())) ||
    (product.boutique_id?.address && product.boutique_id.address.toLowerCase().includes(searchText.toLowerCase())) ||
    (product.brand && product.brand.toLowerCase().includes(searchText.toLowerCase())) ||
    (product.subtitle && product.subtitle.toLowerCase().includes(searchText.toLowerCase()))
  );

  // 生成带认证的图片URL - 使用统一配置
  // 生成带认证的图片URL - 使用统一配置，为列表页面优化尺寸
  const getImageUrl = useCallback((imageId: string): string => {
    return FILE_CONFIG.getAssetUrl(imageId, undefined, {
      width: 80,
      height: 80,
      quality: 80,
      fit: 'cover',
      format: 'webp'
    });
  }, []);

  const columns = [
    {
      title: '主图',
      dataIndex: 'main_image',
      key: 'main_image',
      width: 80,
      render: (main_image: string) => (
        main_image ? (
          <Image
            width={60}
            height={60}
            src={getImageUrl(main_image)}
            alt="商品主图"
            style={{ objectFit: 'cover', borderRadius: '4px' }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1xkE8A8b6IoNEFpjQSfvwCfeOXfgJvwR6FTPWlwu6JAySy0r4AxOgG7eokOCOhYpQSwLKQLJZ7sKM9p6ZfD/+d9/vQ=="
          />
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
            无图片
          </div>
        )
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
      width: 200,
    },
    {
      title: '副标题',
      dataIndex: 'subtitle',
      key: 'subtitle',
      width: 300,
      render: (subtitle: string) => subtitle || '-',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      width: 120,
      render: (brand: string) => brand || '-',
    },
    {
      title: '分类',
      dataIndex: ['category_id', 'name'],
      key: 'category',
      width: 120,
      render: (categoryName: string) => categoryName || '未分类',
    },
    {
      title: '所属店铺',
      dataIndex: ['boutique_id', 'name'],
      key: 'boutique_name',
      width: 150,
      render: (boutiqueName: string, record: Product) => {
        if (record.boutique_id) {
          return (
            <div>
              <div style={{ fontWeight: 500 }}>{boutiqueName}</div>
              {record.boutique_id.address && (
                <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
                  {record.boutique_id.address}
                </div>
              )}
            </div>
          );
        }
        return '未分配店铺';
      },
      sorter: (a: Product, b: Product) => {
        const aName = a.boutique_id?.name || '';
        const bName = b.boutique_id?.name || '';
        return aName.localeCompare(bName);
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `¥${price?.toFixed(2) || '0.00'}`,
      sorter: (a: Product, b: Product) => (a.price || 0) - (b.price || 0),
    },
    {
      title: '市场价',
      dataIndex: 'market_price',
      key: 'market_price',
      width: 100,
      render: (market_price: number) => market_price ? `¥${market_price.toFixed(2)}` : '-',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 80,
      sorter: (a: Product, b: Product) => (a.stock || 0) - (b.stock || 0),
    },
    {
      title: '摆放位置',
      dataIndex: 'location',
      key: 'location',
      width: 150,
      render: (location: string) => location || '-',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const statusInfo = getProductStatusInfo(status);
        return (
          <span 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 8px',
              borderRadius: '6px',
              backgroundColor: statusInfo.bgColor,
              color: statusInfo.color,
              fontWeight: 500,
              fontSize: '12px'
            }}
          >
            <span style={{ marginRight: '4px' }}>{statusInfo.icon}</span>
            {statusInfo.text}
          </span>
        );
      },
      filters: [
        { text: '草稿', value: 'draft' },
        { text: '待审核', value: 'pending_review' },
        { text: '在售', value: 'on_sale' },
        { text: '下架', value: 'off_sale' }
      ],
      onFilter: (value: any, record: Product) => record.status === value,
    },
    {
      title: '销量',
      dataIndex: 'total_sales_volume',
      key: 'total_sales_volume',
      width: 80,
      render: (volume: number) => volume || 0,
      sorter: (a: Product, b: Product) => (a.total_sales_volume || 0) - (b.total_sales_volume || 0),
    },
    {
      title: '评分',
      dataIndex: 'rating_avg',
      key: 'rating_avg',
      width: 80,
      render: (rating: number) => rating ? `${rating.toFixed(1)}★` : '-',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Product, b: Product) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Product) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditProduct(record.id)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个商品吗?"
            onConfirm={() => handleDeleteProduct(record.id)}
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
    <div style={{ height: '100%', padding: '24px', backgroundColor: '#F9FAFB' }}>
      <div className="mb-6 flex justify-between items-center">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Title level={4} style={{ margin: 0, color: '#111827', fontWeight: 600 }}>商品管理</Title>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAddProduct}
          style={{ backgroundColor: '#C5A46D', borderColor: '#C5A46D', color: '#111827', fontWeight: 600 }}
        >
          新增商品
        </Button>
      </div>

      <div className="mb-4">
        <Search
          placeholder="搜索商品名称"
          allowClear
          style={{ width: 300 }}
          onSearch={setSearchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
        />
      </div>

      <div style={{ background: '#fff', minHeight: 'calc(100vh - 280px)' }}>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条商品记录`,
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

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ProductsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
