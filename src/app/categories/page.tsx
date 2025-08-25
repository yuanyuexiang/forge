'use client';

import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Space, 
  message, 
  Popconfirm 
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import { ProtectedRoute } from '../components/ProtectedRoute';
import AdminLayout from '../components/AdminLayout';
import { 
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  GetCategoriesQuery
} from '../../generated/graphql';

const { Search } = Input;

// 使用生成的类型
type Category = GetCategoriesQuery['categories'][0];

function CategoriesContent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // 查询分类列表
  const { data, loading, error, refetch } = useGetCategoriesQuery();
  
  // 创建分类
  const [createCategory] = useCreateCategoryMutation({
    onCompleted: () => {
      message.success('分类创建成功');
      closeModal();
      refetch();
    },
    onError: (error) => {
      console.error('创建分类失败:', error);
      message.error('创建分类失败');
    }
  });

  // 更新分类
  const [updateCategory] = useUpdateCategoryMutation({
    onCompleted: () => {
      message.success('分类更新成功');
      closeModal();
      refetch();
    },
    onError: (error) => {
      console.error('更新分类失败:', error);
      message.error('更新分类失败');
    }
  });

  // 删除分类
  const [deleteCategory] = useDeleteCategoryMutation({
    onCompleted: () => {
      message.success('分类删除成功');
      refetch();
    },
    onError: (error) => {
      console.error('删除分类失败:', error);
      message.error('删除分类失败');
    }
  });

  const categories = data?.categories || [];

  // 处理错误
  if (error) {
    message.error('获取分类列表失败');
  }

  // 打开新增/编辑弹窗
  const openModal = (category?: Category) => {
    setEditingCategory(category || null);
    setModalVisible(true);
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description
      });
    } else {
      form.resetFields();
    }
  };

  // 关闭弹窗
  const closeModal = () => {
    setModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

  // 保存分类
  const saveCategory = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingCategory) {
        // 更新分类
        await updateCategory({
          variables: {
            id: editingCategory.id,
            data: values
          }
        });
      } else {
        // 创建分类
        await createCategory({
          variables: {
            data: values
          }
        });
      }
    } catch (error) {
      console.error('保存分类失败:', error);
    }
  };

  // 删除分类
  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory({
        variables: { id }
      });
    } catch (error) {
      console.error('删除分类失败:', error);
    }
  };

  // 过滤分类
  const filteredCategories = categories.filter((category: Category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => description || '暂无描述',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Category, b: Category) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: any, record: Category) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个分类吗?"
            onConfirm={() => handleDeleteCategory(record.id)}
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
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">分类管理</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          新增分类
        </Button>
      </div>

      <div className="mb-4">
        <Search
          placeholder="搜索分类名称或描述"
          allowClear
          style={{ width: 300 }}
          onSearch={setSearchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredCategories}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />

      <Modal
        title={editingCategory ? '编辑分类' : '新增分类'}
        open={modalVisible}
        onOk={saveCategory}
        onCancel={closeModal}
        width={500}
        okText="保存"
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>

          <Form.Item
            label="分类描述"
            name="description"
          >
            <Input.TextArea rows={3} placeholder="请输入分类描述" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CategoriesContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
