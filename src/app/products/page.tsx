'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Upload, 
  Space, 
  message, 
  Popconfirm,
  Tag,
  Image
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UploadOutlined,
  SearchOutlined 
} from '@ant-design/icons';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';

const { Search } = Input;
const { Option } = Select;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
  image?: string;
  created_at: string;
  updated_at: string;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // 获取商品列表
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        message.error('获取商品列表失败');
      }
    } catch (error) {
      console.error('获取商品列表失败:', error);
      message.error('获取商品列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 打开新增/编辑弹窗
  const openModal = (product?: Product) => {
    setEditingProduct(product || null);
    setModalVisible(true);
    if (product) {
      form.setFieldsValue(product);
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
      const token = localStorage.getItem('authToken');
      
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });
      
      if (response.ok) {
        message.success(editingProduct ? '商品更新成功' : '商品创建成功');
        closeModal();
        fetchProducts();
      } else {
        const errorData = await response.json();
        message.error(errorData.error || '保存商品失败');
      }
    } catch (error) {
      console.error('保存商品失败:', error);
      message.error('保存商品失败');
    }
  };

  // 删除商品
  const deleteProduct = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        message.success('商品删除成功');
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        const errorData = await response.json();
        message.error(errorData.error || '删除商品失败');
      }
    } catch (error) {
      console.error('删除商品失败:', error);
      message.error('删除商品失败');
    }
  };

  // 过滤商品
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image: string) => (
        image ? (
          <Image
            width={50}
            height={50}
            src={image}
            fallback="data:image/png;base64,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"
            style={{ objectFit: 'cover', borderRadius: 4 }}
          />
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-400 text-xs">暂无图片</span>
          </div>
        )
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: '手机', value: '手机' },
        { text: '电脑', value: '电脑' },
        { text: '配件', value: '配件' },
      ],
      onFilter: (value: any, record: Product) => record.category === value,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => `¥${price.toLocaleString()}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: Product, b: Product) => a.stock - b.stock,
      render: (stock: number) => (
        <span className={stock < 10 ? 'text-red-500' : 'text-green-600'}>
          {stock}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '上架', value: 'active' },
        { text: '下架', value: 'inactive' },
      ],
      onFilter: (value: any, record: Product) => record.status === value,
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '上架' : '下架'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Product) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个商品吗？"
            onConfirm={() => deleteProduct(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">商品管理</h1>
        
        <div className="flex justify-between items-center">
          <Search
            placeholder="搜索商品名称或分类"
            allowClear
            style={{ width: 300 }}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
          />
          
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => openModal()}
          >
            新增商品
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="id"
        loading={loading}
        pagination={{
          total: filteredProducts.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => 
            `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
        }}
      />

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
          initialValues={{
            status: 'active'
          }}
        >
          <Form.Item
            name="name"
            label="商品名称"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>

          <Form.Item
            name="description"
            label="商品描述"
            rules={[{ required: true, message: '请输入商品描述' }]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="请输入商品描述" 
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="price"
              label="价格 (元)"
              rules={[{ required: true, message: '请输入商品价格' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                style={{ width: '100%' }}
                placeholder="请输入价格"
              />
            </Form.Item>

            <Form.Item
              name="stock"
              label="库存数量"
              rules={[{ required: true, message: '请输入库存数量' }]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="请输入库存数量"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="category"
              label="商品分类"
              rules={[{ required: true, message: '请选择商品分类' }]}
            >
              <Select placeholder="请选择分类">
                <Option value="手机">手机</Option>
                <Option value="电脑">电脑</Option>
                <Option value="配件">配件</Option>
                <Option value="其他">其他</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="商品状态"
              rules={[{ required: true, message: '请选择商品状态' }]}
            >
              <Select>
                <Option value="active">上架</Option>
                <Option value="inactive">下架</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="image"
            label="商品图片"
          >
            <Upload
              listType="picture-card"
              showUploadList={false}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>上传图片</div>
              </div>
            </Upload>
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
