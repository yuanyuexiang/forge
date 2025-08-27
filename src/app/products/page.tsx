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
  Typography
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined
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
        description: product.description,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id?.id
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
      
      // 转换 category_id 格式以符合 GraphQL schema
      const transformedValues = {
        ...values,
        category_id: values.category_id ? { id: values.category_id } : undefined
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
    },
    {
      title: '分类',
      dataIndex: ['category_id', 'name'],
      key: 'category',
      render: (categoryName: string) => categoryName || '未分类',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price?.toFixed(2) || '0.00'}`,
      sorter: (a: Product, b: Product) => (a.price || 0) - (b.price || 0),
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: Product, b: Product) => (a.stock || 0) - (b.stock || 0),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
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
            label="商品描述"
            name="description"
          >
            <Input.TextArea rows={3} placeholder="请输入商品描述" />
          </Form.Item>

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
