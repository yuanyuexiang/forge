'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Button, 
  Modal, 
  Form, 
  Input, 
  message,
  Space,
  Typography,
  Popconfirm
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  TagOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const CategoriesContent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  // 加载分类数据
  const loadCategories = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        console.log('分类数据加载成功:', data);
      } else {
        message.error('加载分类失败');
      }
    } catch (error) {
      console.error('加载分类失败:', error);
      message.error('加载分类失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // 打开新建分类模态框
  const openCreateModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 打开编辑分类模态框
  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    });
    setModalVisible(true);
  };

  // 保存分类
  const saveCategory = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem('admin_token');
      
      if (editingCategory) {
        // 更新分类 - 注意：需要实现 PATCH 方法
        message.info('编辑功能待实现');
      } else {
        // 创建新分类
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          message.success('分类创建成功');
          loadCategories();
          setModalVisible(false);
          form.resetFields();
        } else {
          message.error('创建分类失败');
        }
      }
    } catch (error) {
      console.error('保存分类失败:', error);
      message.error('保存分类失败');
    }
  };

  // 删除分类
  const deleteCategory = async (_id: string) => {
    try {
      message.info('删除功能待实现');
      // 注意：需要在后端实现 DELETE 方法
    } catch (error) {
      console.error('删除分类失败:', error);
      message.error('删除分类失败');
    }
  };

  // 表格列定义
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (id: string) => (
        <Text code copyable>
          {id.slice(0, 8)}...
        </Text>
      ),
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <div>
          <TagOutlined style={{ marginRight: 8 }} />
          <strong>{name}</strong>
        </div>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <Text ellipsis={{ tooltip: description }} style={{ maxWidth: 200 }}>
          {description || '-'}
        </Text>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => (
        <div>
          {new Date(date).toLocaleDateString()}
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {new Date(date).toLocaleTimeString()}
          </Text>
        </div>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (date: string) => (
        <div>
          {new Date(date).toLocaleDateString()}
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {new Date(date).toLocaleTimeString()}
          </Text>
        </div>
      ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      render: (record: Category) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个分类吗？"
            onConfirm={() => deleteCategory(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              danger
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title level={4} style={{ margin: 0 }}>分类管理</Title>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
              新建分类
            </Button>
            <Button onClick={loadCategories} loading={loading}>
              刷新数据
            </Button>
          </Space>
        </div>
        
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
          }}
        />
      </Card>

      {/* 新建/编辑分类模态框 */}
      <Modal
        title={editingCategory ? '编辑分类' : '新建分类'}
        open={modalVisible}
        onOk={saveCategory}
        onCancel={() => {
          setModalVisible(false);
          setEditingCategory(null);
          form.resetFields();
        }}
        okText="保存"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
          name="categoryForm"
        >
          <Form.Item
            name="name"
            label="分类名称"
            rules={[
              { required: true, message: '请输入分类名称' },
              { max: 50, message: '分类名称不能超过50个字符' }
            ]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="分类描述"
            rules={[
              { max: 200, message: '描述不能超过200个字符' }
            ]}
          >
            <TextArea 
              placeholder="请输入分类描述" 
              rows={4}
              showCount
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesContent;
