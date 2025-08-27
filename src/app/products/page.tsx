'use client';

import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Space, 
  message, 
  Popconfirm,
  Typography,
  Row,
  Col,
  Switch
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
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';
import { 
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  GetProductsQuery
} from '../../generated/graphql';

const { Search } = Input;
const { Option } = Select;
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
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // 查询产品列表
  const { data: productsData, loading, error, refetch } = useGetProductsQuery();
  
  // 查询分类列表（用于表单选择）
  const { data: categoriesData } = useGetCategoriesQuery();
  
  // 创建产品
  const [createProduct] = useCreateProductMutation({
    onCompleted: () => {
      message.success('商品创建成功');
      closeModal();
      refetch();
    },
    onError: (error) => {
      console.error('创建商品失败:', error);
      message.error('创建商品失败');
    }
  });

  // 更新产品
  const [updateProduct] = useUpdateProductMutation({
    onCompleted: () => {
      message.success('商品更新成功');
      closeModal();
      refetch();
    },
    onError: (error) => {
      console.error('更新商品失败:', error);
      message.error('更新商品失败');
    }
  });

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
  const categories = categoriesData?.categories || [];

  // 处理错误
  if (error) {
    message.error('获取商品列表失败');
  }

  // 打开新增/编辑弹窗
  const openModal = (product?: Product) => {
    setEditingProduct(product || null);
    setModalVisible(true);
    if (product) {
      form.setFieldsValue({
        name: product.name,
        subtitle: product.subtitle,
        description: product.description,
        brand: product.brand,
        price: product.price,
        market_price: product.market_price,
        stock: product.stock,
        barcode: product.barcode,
        category_id: product.category_id?.id,
        status: product.status,
        images: product.images ? product.images.join('\n') : '',
        video_url: product.video_url,
        is_on_sale: product.is_on_sale
      });
    } else {
      form.resetFields();
    }
  };

  // 关闭弹窗
  const closeModal = () => {
    setModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
  };

  // 保存商品
  const saveProduct = async () => {
    try {
      const values = await form.validateFields();
      
      // 转换数据格式以符合 GraphQL schema
      const transformedValues = {
        ...values,
        category_id: values.category_id ? { id: values.category_id } : undefined,
        // 处理图片数组：将换行分隔的文本转换为数组
        images: values.images ? 
          values.images.split('\n').filter((url: string) => url.trim()) : 
          [],
        // 确保数值字段的正确类型
        price: values.price ? Number(values.price) : undefined,
        market_price: values.market_price ? Number(values.market_price) : undefined,
        stock: values.stock ? Number(values.stock) : undefined,
        // 默认值设置
        status: values.status || 'draft',
        is_on_sale: values.is_on_sale || false,
        // 移除只读字段
        total_sales_volume: undefined,
        rating_avg: undefined,
        total_reviews: undefined
      };
      
      // 调试日志
      console.log('Original form values:', values);
      console.log('Transformed values:', transformedValues);
      
      if (editingProduct) {
        // 更新产品
        await updateProduct({
          variables: {
            id: editingProduct.id,
            data: transformedValues
          }
        });
      } else {
        // 创建产品
        await createProduct({
          variables: {
            data: transformedValues
          }
        });
      }
    } catch (error) {
      console.error('保存商品失败:', error);
    }
  };

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

  // 过滤商品
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    (product.category_id?.name && product.category_id.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
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
      width: 150,
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
            onClick={() => openModal(record)}
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
        <Title level={4} style={{ margin: 0, color: '#111827', fontWeight: 600 }}>商品管理</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => openModal()}
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
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div style={{ background: '#fff', minHeight: 'calc(100vh - 280px)' }}>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条商品记录`,
            size: 'default',
            position: ['bottomCenter']
          }}
          scroll={{ y: 'calc(100vh - 180px)' }}
          size="middle"
        />
      </div>

      <Modal
        title={editingProduct ? '编辑商品' : '新增商品'}
        open={modalVisible}
        onOk={saveProduct}
        onCancel={closeModal}
        width={600}
        okText="保存"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>

          <Form.Item
            label="副标题"
            name="subtitle"
          >
            <Input placeholder="请输入商品副标题" />
          </Form.Item>

          <Form.Item
            label="商品描述"
            name="description"
          >
            <Input.TextArea rows={3} placeholder="请输入商品描述" />
          </Form.Item>

          <Form.Item
            label="品牌"
            name="brand"
          >
            <Input placeholder="请输入品牌名称" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="价格"
                name="price"
                rules={[
                  { required: true, message: '请输入价格' },
                  { type: 'number', min: 0, message: '价格不能为负数' }
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入价格"
                  min={0}
                  step={0.01}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="市场价"
                name="market_price"
                rules={[
                  { type: 'number', min: 0, message: '市场价不能为负数' }
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入市场价"
                  min={0}
                  step={0.01}
                  precision={2}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="库存"
                name="stock"
                rules={[
                  { required: true, message: '请输入库存数量' },
                  { type: 'number', min: 0, message: '库存不能为负数' }
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入库存数量"
                  min={0}
                  step={1}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="商品条码"
                name="barcode"
              >
                <Input placeholder="请输入商品条码" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="分类"
            name="category_id"
          >
            <Select placeholder="请选择分类" allowClear>
              {categories.map((category: any) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="商品状态"
            name="status"
            initialValue="draft"
            rules={[{ required: true, message: '请选择商品状态' }]}
          >
            <Select placeholder="请选择商品状态">
              <Option value="draft">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <FileTextOutlined style={{ marginRight: '6px', color: '#8B5CF6' }} />
                  草稿
                </span>
              </Option>
              <Option value="pending_review">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <ClockCircleOutlined style={{ marginRight: '6px', color: '#F59E0B' }} />
                  待审核
                </span>
              </Option>
              <Option value="on_sale">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleOutlined style={{ marginRight: '6px', color: '#10B981' }} />
                  在售
                </span>
              </Option>
              <Option value="off_sale">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <EyeInvisibleOutlined style={{ marginRight: '6px', color: '#EF4444' }} />
                  下架
                </span>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="商品图片"
            name="images"
            tooltip="多个图片URL用换行分隔"
          >
            <Input.TextArea 
              rows={3} 
              placeholder="请输入图片URL，多个图片请换行分隔&#10;例如：&#10;https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
            />
          </Form.Item>

          <Form.Item
            label="商品视频"
            name="video_url"
          >
            <Input placeholder="请输入视频URL" />
          </Form.Item>

          <Form.Item
            label="是否特价"
            name="is_on_sale"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
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
