'use client';

import React, { useState, useCallback } from 'react';
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
  Switch,
  Upload,
  Image
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  LoadingOutlined
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
  
  // 图片上传状态
  const [mainImageUploading, setMainImageUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(false);
  const [mainImageList, setMainImageList] = useState<any[]>([]);
  const [imageList, setImageList] = useState<any[]>([]);

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
      // 初始化主图
      if (product.main_image) {
        setMainImageList([{
          uid: product.main_image,
          name: '主图',
          status: 'done',
          url: `/api/assets/${product.main_image}`
        }]);
      } else {
        setMainImageList([]);
      }

      // 初始化商品图片
      if (product.images && Array.isArray(product.images)) {
        const imagesList = product.images.map((imageId: string, index: number) => ({
          uid: imageId,
          name: `图片${index + 1}`,
          status: 'done',
          url: `/api/assets/${imageId}`
        }));
        setImageList(imagesList);
      } else {
        setImageList([]);
      }

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
        main_image: product.main_image,
        images: product.images,
        video_url: product.video_url,
        is_on_sale: product.is_on_sale
      });
    } else {
      form.resetFields();
      setMainImageList([]);
      setImageList([]);
    }
  };

  // 关闭弹窗
  const closeModal = () => {
    setModalVisible(false);
    setEditingProduct(null);
    form.resetFields();
    setMainImageList([]);
    setImageList([]);
  };

  // 保存商品
  const saveProduct = async () => {
    try {
      const values = await form.validateFields();
      
      // 转换数据格式以符合 GraphQL schema
      const transformedValues = {
        ...values,
        category_id: values.category_id ? { id: values.category_id } : undefined,
        // 处理图片数据：确保是文件ID而不是对象
        main_image: typeof values.main_image === 'string' ? values.main_image : 
                   (values.main_image?.file?.uid || values.main_image?.uid || null),
        // 处理图片数组：确保是文件ID数组格式
        images: Array.isArray(values.images) ? 
                values.images.map((img: any) => 
                  typeof img === 'string' ? img : (img?.file?.uid || img?.uid || img)
                ).filter(Boolean) : [],
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
      console.log('Main image value:', values.main_image);
      console.log('Images value:', values.images);
      console.log('Transformed values:', transformedValues);
      console.log('Final main_image:', transformedValues.main_image);
      console.log('Final images:', transformedValues.images);
      
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

  // 主图上传处理
  const handleMainImageUpload = useCallback(async (file: any) => {
    setMainImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // 获取认证token
      const authToken = localStorage.getItem('directus_auth_token') || 
                       localStorage.getItem('authToken') ||
                       sessionStorage.getItem('directus_auth_token');
      
      // 使用fetch直接上传到Directus
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        // 假设返回的结果包含文件ID
        const fileId = result.data?.id;
        
        setMainImageList([{
          uid: fileId,
          name: file.name,
          status: 'done',
          url: `/api/assets/${fileId}`,
          response: result
        }]);
        
        // 更新表单值
        form.setFieldValue('main_image', fileId);
        message.success('主图上传成功');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Upload response:', errorData);
        throw new Error(errorData.error || '上传失败');
      }
    } catch (error) {
      console.error('主图上传失败:', error);
      message.error(`主图上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setMainImageUploading(false);
    }
    return false; // 阻止默认上传行为
  }, [form]);

  // 商品图片上传处理
  const handleImagesUpload = useCallback(async (file: any) => {
    setImagesUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // 获取认证token
      const authToken = localStorage.getItem('directus_auth_token') || 
                       localStorage.getItem('authToken') ||
                       sessionStorage.getItem('directus_auth_token');
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        const fileId = result.data?.id;
        
        const newImage = {
          uid: fileId,
          name: file.name,
          status: 'done',
          url: `/api/assets/${fileId}`,
          response: result
        };
        
        const newImageList = [...imageList, newImage];
        setImageList(newImageList);
        
        // 更新表单值 - 将所有图片ID组成数组
        const imageIds = newImageList.map(img => img.uid);
        form.setFieldValue('images', imageIds);
        message.success('图片上传成功');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Upload response:', errorData);
        throw new Error(errorData.error || '上传失败');
      }
    } catch (error) {
      console.error('图片上传失败:', error);
      message.error(`图片上传失败: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setImagesUploading(false);
    }
    return false;
  }, [form, imageList]);

  // 移除图片
  const handleRemoveImage = useCallback((file: any, isMainImage: boolean = false) => {
    if (isMainImage) {
      setMainImageList([]);
      form.setFieldValue('main_image', null);
    } else {
      const newImageList = imageList.filter(img => img.uid !== file.uid);
      setImageList(newImageList);
      const imageIds = newImageList.map(img => img.uid);
      form.setFieldValue('images', imageIds);
    }
  }, [form, imageList]);

  // 主图文件列表变化处理
  const handleMainImageChange = useCallback(({ fileList }: any) => {
    setMainImageList(fileList);
  }, []);

  // 商品图片文件列表变化处理
  const handleImagesChange = useCallback(({ fileList }: any) => {
    setImageList(fileList);
  }, []);

  // 过滤商品
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    (product.category_id?.name && product.category_id.name.toLowerCase().includes(searchText.toLowerCase()))
  );

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
            src={main_image.startsWith('http') ? main_image : `/api/assets/${main_image}`}
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
            label="主图"
            tooltip="商品的主要展示图片"
          >
            <Form.Item name="main_image" hidden>
              <Input />
            </Form.Item>
            <Upload
              listType="picture-card"
              fileList={mainImageList}
              beforeUpload={handleMainImageUpload}
              onRemove={(file) => handleRemoveImage(file, true)}
              onChange={handleMainImageChange}
              maxCount={1}
              accept="image/*"
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: false
              }}
            >
              {mainImageList.length < 1 && (
                <div>
                  {mainImageUploading ? <LoadingOutlined /> : <UploadOutlined />}
                  <div style={{ marginTop: 8 }}>上传主图</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="商品图片"
            tooltip="商品的详细图片，支持多张"
          >
            <Form.Item name="images" hidden>
              <Input />
            </Form.Item>
            <Upload
              listType="picture-card"
              fileList={imageList}
              beforeUpload={handleImagesUpload}
              onRemove={(file) => handleRemoveImage(file, false)}
              onChange={handleImagesChange}
              maxCount={10}
              accept="image/*"
              multiple
              showUploadList={{
                showPreviewIcon: true,
                showRemoveIcon: true,
                showDownloadIcon: false
              }}
            >
              {imageList.length < 10 && (
                <div>
                  {imagesUploading ? <LoadingOutlined /> : <UploadOutlined />}
                  <div style={{ marginTop: 8 }}>上传图片</div>
                </div>
              )}
            </Upload>
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
