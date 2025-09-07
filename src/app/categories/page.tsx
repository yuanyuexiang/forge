'use client';

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select,
  Space, 
  message, 
  Popconfirm 
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons';
import { ProtectedRoute, AdminLayout } from '@components';
import { 
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetBoutiquesQuery,
  GetCategoriesQuery
} from '../../generated/graphql';
import { TokenManager } from '@lib/auth';

const { Search } = Input;

// 使用生成的类型
type Category = GetCategoriesQuery['categories'][0];

function CategoriesContent() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchText, setSearchText] = useState('');
  const [form] = Form.useForm();

  // 获取当前用户 ID
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
  }, []);

  // 查询分类列表
  const { data, loading, error, refetch } = useGetCategoriesQuery({
    variables: userId ? { userId } : undefined,
    skip: !userId
  });
  
  // 查询店铺列表
  const { data: boutiquesData, loading: boutiquesLoading } = useGetBoutiquesQuery({
    variables: userId ? { userId } : undefined,
    skip: !userId
  });
  
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
  const boutiques = boutiquesData?.boutiques || [];

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
        description: category.description,
        boutique_id: category.boutique_id?.id || null
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
      console.log('表单值:', values);
      
      if (editingCategory) {
        // 更新分类 - 需要将 boutique_id 包装为对象
        const updateData = {
          ...values,
          boutique_id: values.boutique_id ? { id: values.boutique_id } : null
        };
        
        console.log('更新分类数据:', updateData);
        await updateCategory({
          variables: {
            id: editingCategory.id,
            data: updateData
          }
        });
      } else {
        // 创建分类 - 同样需要将 boutique_id 包装为对象
        const createData = {
          name: values.name,
          description: values.description || null,
          boutique_id: values.boutique_id ? { id: values.boutique_id } : null
        };
        
        console.log('创建分类数据:', createData);
        await createCategory({
          variables: {
            data: createData
          }
        });
      }
    } catch (error) {
      console.error('保存分类失败:', error);
      if (error instanceof Error && error.message) {
        message.error(`保存失败: ${error.message}`);
      } else {
        message.error('保存分类失败，请检查控制台获取详细信息');
      }
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
    (category.description && category.description.toLowerCase().includes(searchText.toLowerCase())) ||
    (category.boutique_id?.name && category.boutique_id.name.toLowerCase().includes(searchText.toLowerCase())) ||
    (category.boutique_id?.address && category.boutique_id.address.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: (a: Category, b: Category) => a.name.localeCompare(b.name),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (description: string) => description || '暂无描述',
    },
    {
      title: '所属店铺',
      dataIndex: ['boutique_id', 'name'],
      key: 'boutique_name',
      width: 200,
      render: (boutiqueName: string, record: Category) => {
        if (record.boutique_id) {
          return (
            <div>
              <div style={{ fontWeight: 500 }}>{boutiqueName}</div>
              {record.boutique_id.address && (
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {record.boutique_id.address}
                </div>
              )}
            </div>
          );
        }
        return '未分配店铺';
      },
      sorter: (a: Category, b: Category) => {
        const aName = a.boutique_id?.name || '';
        const bName = b.boutique_id?.name || '';
        return aName.localeCompare(bName);
      },
    },
    {
      title: '创建时间',
      dataIndex: 'date_created',
      key: 'date_created',
      render: (date: string) => {
        if (!date) return '暂无数据';
        try {
          return new Date(date).toLocaleDateString('zh-CN');
        } catch (error) {
          return '日期格式错误';
        }
      },
      sorter: (a: Category, b: Category) => new Date(a.date_created).getTime() - new Date(b.date_created).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
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
    <div style={{ height: '100%', padding: '24px', backgroundColor: 'white' }}>
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
          showTotal: (total) => `共 ${total} 条分类记录`,
          size: 'default',
          position: ['bottomCenter']
        }}
        scroll={{ y: 'calc(100vh - 180px)' }}
        size="middle"
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

          <Form.Item
            label="所属店铺"
            name="boutique_id"
          >
            <Select
              placeholder="请选择店铺"
              loading={boutiquesLoading}
              allowClear
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={boutiques.map(boutique => ({
                value: boutique.id,
                label: `${boutique.name} - ${boutique.address || '暂无地址'}`
              }))}
            />
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
