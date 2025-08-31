'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Row,
  Col,
  Typography,
  Card,
  message,
  Upload,
  Spin,
  Rate,
  Space
} from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  UploadOutlined,
  LoadingOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { ProtectedRoute } from '@components/auth';
import { AdminLayout } from '@components/layout';
import { 
  useGetBoutiquesQuery,
  useCreateBoutiqueMutation,
  useUpdateBoutiqueMutation,
  GetBoutiquesQuery
} from '@generated/graphql';
import { TokenManager } from '@lib/auth';
import { FILE_CONFIG } from '@lib/api';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// 使用生成的类型
type Boutique = GetBoutiquesQuery['boutiques'][0];

function BoutiqueEditContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [boutique, setBoutique] = useState<Boutique | null>(null);
  
  // 图片上传相关状态
  const [mainImageList, setMainImageList] = useState<any[]>([]);
  const [imageList, setImageList] = useState<any[]>([]);
  const [mainImageUploading, setMainImageUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(false);

  const isEditMode = params.id !== 'new';

  // 查询店铺列表
  const { data: boutiquesData, refetch } = useGetBoutiquesQuery();
  
  // 创建店铺
  const [createBoutique] = useCreateBoutiqueMutation({
    onCompleted: (data) => {
      message.success('店铺创建成功');
      refetch(); // 刷新店铺列表缓存
      const returnParams = searchParams.get('return');
      if (returnParams) {
        const decodedParams = decodeURIComponent(returnParams);
        router.push(`/boutiques?${decodedParams}`);
      } else {
        router.push('/boutiques');
      }
    },
    onError: (error) => {
      console.error('创建店铺失败:', error);
      message.error('创建店铺失败');
      setSaving(false);
    }
  });

  // 更新店铺
  const [updateBoutique] = useUpdateBoutiqueMutation({
    onCompleted: () => {
      message.success('店铺更新成功');
      refetch(); // 刷新店铺列表缓存
      const returnParams = searchParams.get('return');
      if (returnParams) {
        const decodedParams = decodeURIComponent(returnParams);
        router.push(`/boutiques?${decodedParams}`);
      } else {
        router.push('/boutiques');
      }
    },
    onError: (error) => {
      console.error('更新店铺失败:', error);
      message.error('更新店铺失败');
      setSaving(false);
    }
  });

  const boutiques = boutiquesData?.boutiques || [];

  // 生成带认证的图片URL - 使用统一配置
  const getImageUrl = useCallback((imageId: string): string => {
    return FILE_CONFIG.getAssetUrl(imageId);
  }, []);

  // 获取店铺数据
  const fetchBoutique = () => {
    if (!isEditMode || !boutiquesData) return;
    
    const foundBoutique = boutiques.find((b: Boutique) => b.id === params.id);
    if (foundBoutique) {
      setBoutique(foundBoutique);
      
      // 初始化表单数据
      form.setFieldsValue({
        name: foundBoutique.name,
        stars: foundBoutique.stars,
        status: foundBoutique.status,
        sort: foundBoutique.sort,
      });

      // 初始化图片数据
      if (foundBoutique.main_image) {
        setMainImageList([{
          uid: foundBoutique.main_image,
          name: '主图片',
          status: 'done',
          url: getImageUrl(foundBoutique.main_image),
          response: { data: { id: foundBoutique.main_image } }
        }]);
      }

      if (foundBoutique.images && Array.isArray(foundBoutique.images)) {
        const imageListData = foundBoutique.images.map((imageId: string, index: number) => ({
          uid: imageId,
          name: `图片${index + 1}`,
          status: 'done',
          url: getImageUrl(imageId),
          response: { data: { id: imageId } }
        }));
        setImageList(imageListData);
      }
    }
  };

  // 主图上传处理
  const handleMainImageUpload = useCallback(async (file: File) => {
    setMainImageUploading(true);
    try {
      // 使用TokenManager获取有效令牌
      const authToken = await TokenManager.getValidToken();

      if (!authToken) {
        throw new Error('未找到认证令牌，请重新登录');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const result = await response.json();
      const fileId = result.data.id;

      // 更新上传列表
      setMainImageList([{
        uid: fileId,
        name: file.name,
        status: 'done',
        url: getImageUrl(fileId),
        response: { data: { id: fileId } }
      }]);

      message.success('主图上传成功');
    } catch (error) {
      console.error('主图上传失败:', error);
      message.error('主图上传失败');
    } finally {
      setMainImageUploading(false);
    }
    return false;
  }, [getImageUrl]);

  // 图片列表上传处理
  const handleImagesUpload = useCallback(async (file: File) => {
    setImagesUploading(true);
    try {
      // 使用TokenManager获取有效令牌
      const authToken = await TokenManager.getValidToken();

      if (!authToken) {
        throw new Error('未找到认证令牌，请重新登录');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const result = await response.json();
      const fileId = result.data.id;

      // 更新图片列表
      const newImageList = [...imageList, {
        uid: fileId,
        name: file.name,
        status: 'done',
        url: getImageUrl(fileId),
        response: { data: { id: fileId } }
      }];
      setImageList(newImageList);

      message.success('图片上传成功');
    } catch (error) {
      console.error('图片上传失败:', error);
      message.error('图片上传失败');
    } finally {
      setImagesUploading(false);
    }
    return false;
  }, [getImageUrl, imageList]);

  // 删除图片处理
  const handleRemoveImage = useCallback((file: any, isMainImage: boolean) => {
    if (isMainImage) {
      setMainImageList([]);
    } else {
      const newImageList = imageList.filter(item => item.uid !== file.uid);
      setImageList(newImageList);
    }
  }, [imageList]);

  // 主图变化处理
  const handleMainImageChange = useCallback(({ fileList }: any) => {
    setMainImageList(fileList);
  }, []);

  // 图片列表变化处理
  const handleImagesChange = useCallback(({ fileList }: any) => {
    setImageList(fileList);
  }, []);

  // 提交表单
  const handleSubmit = async () => {
    try {
      setSaving(true);
      const values = await form.validateFields();
      
      // 处理主图片
      const mainImageId = mainImageList.length > 0 && mainImageList[0].response?.data?.id 
        ? mainImageList[0].response.data.id 
        : (mainImageList[0]?.uid || null);

      // 处理图片列表
      const images = imageList
        .map(file => file.response?.data?.id || file.uid)
        .filter(Boolean);

      const submitData = {
        name: values.name,
        stars: values.stars || 0,
        status: values.status || 'draft',
        sort: values.sort || 0,
        main_image: mainImageId,
        images: images.length > 0 ? images : null,
      };

      if (isEditMode) {
        await updateBoutique({
          variables: {
            id: params.id as string,
            data: submitData
          }
        });
      } else {
        await createBoutique({
          variables: {
            data: submitData
          }
        });
      }
    } catch (error) {
      console.error('保存店铺失败:', error);
      message.error('保存店铺失败');
    } finally {
      setSaving(false);
    }
  };

  // 返回列表
  const handleBack = () => {
    const returnParams = searchParams.get('return');
    if (returnParams) {
      // 解码返回参数并重建 URL
      const decodedParams = decodeURIComponent(returnParams);
      router.push(`/boutiques?${decodedParams}`);
    } else {
      router.push('/boutiques');
    }
  };

  useEffect(() => {
    fetchBoutique();
  }, [params.id, boutiquesData]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ height: '100%', padding: '24px', backgroundColor: '#F9FAFB' }}>
      {/* 顶部操作栏 */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            style={{ marginRight: '16px' }}
          >
            返回列表
          </Button>
          <Title level={4} style={{ margin: 0, color: '#111827', fontWeight: 600 }}>
            {isEditMode ? '编辑店铺' : '新增店铺'}
          </Title>
        </div>
        
        <Space>
          <Button 
            type="primary" 
            icon={saving ? <LoadingOutlined /> : <SaveOutlined />}
            loading={saving}
            onClick={handleSubmit}
            style={{ backgroundColor: '#C5A46D', borderColor: '#C5A46D', color: '#111827', fontWeight: 600 }}
          >
            {saving ? '保存中...' : '保存'}
          </Button>
        </Space>
      </div>

      <Row gutter={24}>
        <Col span={16}>
          <Card title="基本信息">
            <Form form={form} layout="vertical">
              <Form.Item
                label="店铺名称"
                name="name"
                rules={[{ required: true, message: '请输入店铺名称' }]}
              >
                <Input placeholder="请输入店铺名称" size="large" />
              </Form.Item>

              <Form.Item
                label="店铺评分"
                name="stars"
              >
                <Rate />
              </Form.Item>

              <Form.Item
                label="排序权重"
                name="sort"
              >
                <InputNumber 
                  placeholder="数值越大排序越靠前" 
                  style={{ width: '100%' }}
                  size="large"
                  min={0}
                />
              </Form.Item>

              <Form.Item
                label="主图片"
                name="main_image"
              >
                <Upload
                  listType="picture-card"
                  fileList={mainImageList}
                  onChange={handleMainImageChange}
                  beforeUpload={handleMainImageUpload}
                  onRemove={(file) => handleRemoveImage(file, true)}
                  maxCount={1}
                >
                  {mainImageList.length >= 1 ? null : (
                    <div>
                      {mainImageUploading ? <LoadingOutlined /> : <UploadOutlined />}
                      <div style={{ marginTop: 8 }}>上传主图片</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item
                label="图片列表"
                name="images"
              >
                <Upload
                  listType="picture-card"
                  fileList={imageList}
                  onChange={handleImagesChange}
                  beforeUpload={handleImagesUpload}
                  onRemove={(file) => handleRemoveImage(file, false)}
                  multiple
                >
                  <div>
                    {imagesUploading ? <LoadingOutlined /> : <UploadOutlined />}
                    <div style={{ marginTop: 8 }}>上传图片</div>
                  </div>
                </Upload>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="店铺设置">
            <Form form={form} layout="vertical">
              <Form.Item
                label="店铺状态"
                name="status"
                initialValue="draft"
                rules={[{ required: true, message: '请选择店铺状态' }]}
              >
                <Select placeholder="请选择店铺状态" size="large">
                  <Option value="draft">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <FileTextOutlined style={{ color: '#8B5CF6', marginRight: 8 }} />
                      草稿
                    </span>
                  </Option>
                  <Option value="published">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleOutlined style={{ color: '#10B981', marginRight: 8 }} />
                      已发布
                    </span>
                  </Option>
                  <Option value="archived">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <EyeInvisibleOutlined style={{ color: '#6B7280', marginRight: 8 }} />
                      已归档
                    </span>
                  </Option>
                </Select>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default function BoutiqueEditPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <BoutiqueEditContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
