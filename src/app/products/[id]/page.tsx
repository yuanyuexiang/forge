'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Row,
  Col,
  Typography,
  Card,
  message,
  Upload,
  Spin,
  Divider,
  Space
} from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  UploadOutlined,
  LoadingOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { ProtectedRoute } from '@components/auth';
import { AdminLayout } from '@components/layout';
import { 
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetBoutiquesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  GetProductsQuery
} from '@generated/graphql';
import { TokenManager } from '@lib/auth';
import { FILE_CONFIG } from '@lib/api';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// 使用生成的类型
type Product = GetProductsQuery['products'][0];

function ProductEditContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  
  // 图片上传相关状态
  const [mainImageList, setMainImageList] = useState<any[]>([]);
  const [imageList, setImageList] = useState<any[]>([]);
  const [mainImageUploading, setMainImageUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(false);

  // 视频上传相关状态
  const [videoList, setVideoList] = useState<any[]>([]);
  const [videoUploading, setVideoUploading] = useState(false);

  const isEditMode = params.id !== 'new';

  // 获取当前用户 ID
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
  }, []);

  // 查询商品列表
  const { data: productsData, refetch } = useGetProductsQuery({
    variables: userId ? { userId } : undefined,
    skip: !userId
  });
  
  // 查询分类列表
  const { data: categoriesData } = useGetCategoriesQuery({
    variables: userId ? { userId } : undefined,
    skip: !userId
  });
  
  // 查询店铺列表
  const { data: boutiquesData } = useGetBoutiquesQuery({
    variables: userId ? { userId } : undefined,
    skip: !userId
  });
  
  // 创建商品
  const [createProduct] = useCreateProductMutation({
    onCompleted: () => {
      message.success('商品创建成功');
      refetch(); // 刷新商品列表缓存
      const returnParams = searchParams.get('return');
      if (returnParams) {
        const decodedParams = decodeURIComponent(returnParams);
        router.push(`/products?${decodedParams}`);
      } else {
        router.push('/products');
      }
    },
    onError: (error) => {
      console.error('创建商品失败:', error);
      message.error('创建商品失败');
      setSaving(false);
    }
  });

  // 更新商品
  const [updateProduct] = useUpdateProductMutation({
    onCompleted: () => {
      message.success('商品更新成功');
      refetch(); // 刷新商品列表缓存
      const returnParams = searchParams.get('return');
      if (returnParams) {
        const decodedParams = decodeURIComponent(returnParams);
        router.push(`/products?${decodedParams}`);
      } else {
        router.push('/products');
      }
    },
    onError: (error) => {
      console.error('更新商品失败:', error);
      message.error('更新商品失败');
      setSaving(false);
    }
  });

  const products = productsData?.products || [];
  const categories = categoriesData?.categories || [];
  const boutiques = boutiquesData?.boutiques || [];

  // 生成带认证的图片URL - 使用统一配置，为编辑页面优化尺寸
  const getImageUrl = useCallback((imageId: string): string => {
    return FILE_CONFIG.getAssetUrl(imageId, undefined, {
      width: 200,
      height: 200,
      quality: 85,
      fit: 'cover',
      format: 'webp'
    });
  }, []);

  // 生成原图URL用于预览
  const getOriginalImageUrl = useCallback((imageId: string): string => {
    return FILE_CONFIG.getAssetUrl(imageId);
  }, []);

  // 获取视频 URL
  const getVideoUrl = useCallback((fileId: string) => {
    if (!fileId) return '';
    return FILE_CONFIG.getFileUrl(fileId);
  }, []);

  // 提取视频第一帧作为缩略图
  const extractVideoThumbnail = useCallback((videoUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.src = videoUrl;
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        // 跳到第1秒（避免第0秒可能是黑屏）
        video.currentTime = Math.min(1, video.duration);
      };
      
      video.onseeked = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // 转为 base64 图片（JPEG 格式，质量 0.8）
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.8);
            resolve(thumbnailUrl);
          } else {
            reject(new Error('无法创建 Canvas 上下文'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      video.onerror = () => {
        reject(new Error('视频加载失败'));
      };
    });
  }, []);

  // 获取商品数据
  const fetchProduct = () => {
    if (!isEditMode || !productsData) return;
    
    const foundProduct = products.find((p: Product) => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // 初始化表单数据
      form.setFieldsValue({
        name: foundProduct.name,
        subtitle: foundProduct.subtitle,
        description: foundProduct.description,
        brand: foundProduct.brand,
        price: foundProduct.price,
        market_price: foundProduct.market_price,
        stock: foundProduct.stock,
        barcode: foundProduct.barcode,
        location: foundProduct.location,
        category_id: foundProduct.category_id?.id,
        boutique_id: foundProduct.boutique_id?.id,
        status: foundProduct.status,
        main_image: foundProduct.main_image,
        images: foundProduct.images,
        video_url: foundProduct.video_url,
        is_on_sale: foundProduct.is_on_sale,
        carousel: foundProduct.carousel || 'out'
      });

      // 初始化主图
      if (foundProduct.main_image) {
        setMainImageList([{
          uid: foundProduct.main_image,
          name: '主图',
          status: 'done',
          url: getImageUrl(foundProduct.main_image),
          thumbUrl: getImageUrl(foundProduct.main_image),
          preview: {
            src: getOriginalImageUrl(foundProduct.main_image)
          }
        }]);
      }

      // 初始化商品图片
      if (foundProduct.images && Array.isArray(foundProduct.images) && foundProduct.images.length > 0) {
        const imagesList = foundProduct.images.map((imageId: string, index: number) => ({
          uid: `${imageId}-${index}`,
          name: `图片${index + 1}`,
          status: 'done',
          url: getImageUrl(imageId),
          thumbUrl: getImageUrl(imageId),
          preview: {
            src: getOriginalImageUrl(imageId)
          }
        }));
        setImageList(imagesList);
      }

      // 初始化商品视频
      if (foundProduct.video_url) {
        const videoUrl = getVideoUrl(foundProduct.video_url);
        
        // 先设置基本信息
        setVideoList([{
          uid: foundProduct.video_url,
          name: '商品视频',
          status: 'done',
          url: videoUrl,
        }]);
        
        // 异步提取缩略图
        extractVideoThumbnail(videoUrl)
          .then(thumbnailUrl => {
            setVideoList([{
              uid: foundProduct.video_url,
              name: '商品视频',
              status: 'done',
              url: videoUrl,
              thumbUrl: thumbnailUrl, // 添加缩略图
            }]);
          })
          .catch(error => {
            console.warn('提取视频缩略图失败:', error);
            // 保持原有视频列表不变
          });
      }
    } else if (isEditMode) {
      message.error('商品不存在');
      router.push('/products');
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

      // 更新表单值
      form.setFieldValue('main_image', fileId);

      // 更新上传列表
      setMainImageList([{
        uid: fileId,
        name: file.name,
        status: 'done',
        url: getImageUrl(fileId),
        thumbUrl: getImageUrl(fileId),
        preview: {
          src: getOriginalImageUrl(fileId)
        }
      }]);

      message.success('主图上传成功');
    } catch (error) {
      console.error('主图上传失败:', error);
      message.error('主图上传失败');
    } finally {
      setMainImageUploading(false);
    }
    return false;
  }, [form, getImageUrl, getOriginalImageUrl]);

  // 商品图片上传处理
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
        uid: `${fileId}-${imageList.length}`,
        name: file.name,
        status: 'done',
        url: getImageUrl(fileId),
        thumbUrl: getImageUrl(fileId),
        preview: {
          src: getOriginalImageUrl(fileId)
        }
      }];
      setImageList(newImageList);

      // 更新表单值 - 从uid中提取真实的imageId
      const imageIds = newImageList.map(img => {
        const uid = img.uid;
        // 如果uid包含'-'，则提取imageId部分，否则直接使用uid
        return uid.includes('-') ? uid.split('-')[0] : uid;
      });
      
      // 去重并清洗数据
      const cleanedImageIds = [...new Set(imageIds.filter(id => id && id.trim()))];
      form.setFieldValue('images', cleanedImageIds);

      message.success('图片上传成功');
    } catch (error) {
      console.error('图片上传失败:', error);
      message.error('图片上传失败');
    } finally {
      setImagesUploading(false);
    }
    return false;
  }, [form, getImageUrl, getOriginalImageUrl, imageList]);

  // 删除图片处理
  const handleRemoveImage = useCallback((file: any, isMainImage: boolean) => {
    if (isMainImage) {
      setMainImageList([]);
      form.setFieldValue('main_image', '');
    } else {
      const newImageList = imageList.filter(item => item.uid !== file.uid);
      setImageList(newImageList);
      // 从uid中提取真实的imageId (格式: imageId-index)
      const imageIds = newImageList.map(img => {
        const uid = img.uid;
        // 如果uid包含'-'，则提取imageId部分，否则直接使用uid
        return uid.includes('-') ? uid.split('-')[0] : uid;
      });
      
      // 去重并清洗数据
      const cleanedImageIds = [...new Set(imageIds.filter(id => id && id.trim()))];
      form.setFieldValue('images', cleanedImageIds);
    }
  }, [form, imageList]);

  // 主图变化处理
  const handleMainImageChange = useCallback(({ fileList }: any) => {
    setMainImageList(fileList);
  }, []);

  // 商品图片变化处理
  const handleImagesChange = useCallback(({ fileList }: any) => {
    setImageList(fileList);
    
    // 同步更新表单字段
    const imageIds = fileList.map((img: any) => {
      const uid = img.uid;
      // 如果uid包含'-'，则提取imageId部分，否则直接使用uid
      return uid.includes('-') ? uid.split('-')[0] : uid;
    });
    
    // 去重并清洗数据
    const cleanedImageIds = [...new Set(imageIds.filter((id: string) => id && id.trim()))];
    form.setFieldValue('images', cleanedImageIds);
  }, [form]);

  // 视频上传处理
  const handleVideoUpload = useCallback(async (file: File) => {
    // 验证文件类型
    if (!file.type.startsWith('video/')) {
      message.error('请上传视频文件');
      return false;
    }

    // 验证文件大小（100MB）
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      message.error('视频文件不能超过 100MB');
      return false;
    }

    setVideoUploading(true);
    try {
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

      // 更新表单值
      form.setFieldValue('video_url', fileId);

      const videoUrl = getVideoUrl(fileId);

      // 提取视频第一帧作为缩略图
      try {
        const thumbnailUrl = await extractVideoThumbnail(videoUrl);
        
        // 更新上传列表（带缩略图）
        setVideoList([{
          uid: fileId,
          name: file.name,
          status: 'done',
          url: videoUrl,
          thumbUrl: thumbnailUrl, // 使用提取的缩略图
        }]);
      } catch (thumbnailError) {
        console.warn('提取视频缩略图失败，使用默认显示:', thumbnailError);
        
        // 如果提取失败，仍然添加视频但没有缩略图
        setVideoList([{
          uid: fileId,
          name: file.name,
          status: 'done',
          url: videoUrl,
        }]);
      }

      message.success('视频上传成功');
    } catch (error) {
      console.error('视频上传失败:', error);
      message.error('视频上传失败');
    } finally {
      setVideoUploading(false);
    }
    return false;
  }, [form, getVideoUrl, extractVideoThumbnail]);

  // 视频移除处理
  const handleRemoveVideo = useCallback(() => {
    setVideoList([]);
    form.setFieldValue('video_url', '');
    message.success('视频已移除');
    return true;
  }, [form]);

  // 视频列表变化处理
  const handleVideoChange = useCallback((info: any) => {
    let newFileList = [...info.fileList];
    // 只保留最新的一个文件
    newFileList = newFileList.slice(-1);
    setVideoList(newFileList);
  }, []);

  // 视频预览处理 - 在新窗口播放视频
  const handleVideoPreview = useCallback((file: any) => {
    const videoUrl = file.url;
    if (videoUrl) {
      // 在新窗口中打开视频
      window.open(videoUrl, '_blank');
    }
  }, []);

  // 预览处理 - 使用原图
  const handlePreview = useCallback((file: any) => {
    // 从uid中提取真实的imageId
    const imageId = file.uid.includes('-') ? file.uid.split('-')[0] : file.uid;
    const originalUrl = file.preview?.src || getOriginalImageUrl(imageId);
    window.open(originalUrl, '_blank');
  }, [getOriginalImageUrl]);

  // 保存商品
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      // 为创建和更新使用不同的数据格式
      if (isEditMode) {
        // 更新商品 - 使用对象格式
        // 清洗并去重 images 数组
        const cleanedImages = Array.isArray(values.images) 
          ? [...new Set(values.images.filter((id: any) => id && typeof id === 'string' && id.trim()))] 
          : [];
          
        const updateData = {
          name: values.name,
          subtitle: values.subtitle || '',
          description: values.description || '',
          brand: values.brand || '',
          price: Number(values.price),
          market_price: values.market_price ? Number(values.market_price) : null,
          stock: Number(values.stock),
          barcode: values.barcode || '',
          category_id: values.category_id ? { id: values.category_id } : null,
          boutique_id: values.boutique_id ? { id: values.boutique_id } : null,
          status: values.status,
          main_image: values.main_image || '',
          images: cleanedImages,
          video_url: values.video_url || '',
          is_on_sale: Boolean(values.is_on_sale),
          carousel: values.carousel || 'out'
        };

        await updateProduct({
          variables: {
            id: params.id as string,
            data: updateData
          }
        });
      } else {
        // 创建商品 - 尝试通过提供分类名称来关联
        let categoryData = null;
        if (values.category_id) {
          // 找到对应的分类
          const selectedCategory = categories.find(cat => cat.id === values.category_id);
          if (selectedCategory) {
            categoryData = {
              id: selectedCategory.id,
              name: selectedCategory.name
            };
          }
        }

        let boutiqueData = null;
        if (values.boutique_id) {
          // 找到对应的店铺
          const selectedBoutique = boutiques.find(boutique => boutique.id === values.boutique_id);
          if (selectedBoutique) {
            boutiqueData = {
              id: selectedBoutique.id,
              name: selectedBoutique.name
            };
          }
        }

        // 清洗并去重 images 数组
        const cleanedImages = Array.isArray(values.images) 
          ? [...new Set(values.images.filter((id: any) => id && typeof id === 'string' && id.trim()))] 
          : [];

        const createData = {
          name: values.name,
          subtitle: values.subtitle || '',
          description: values.description || '',
          brand: values.brand || '',
          price: Number(values.price),
          market_price: values.market_price ? Number(values.market_price) : null,
          stock: Number(values.stock),
          barcode: values.barcode || '',
          location: values.location || '',
          category_id: categoryData,
          boutique_id: boutiqueData,
          status: values.status,
          main_image: values.main_image || '',
          images: cleanedImages,
          video_url: values.video_url || '',
          is_on_sale: Boolean(values.is_on_sale),
          carousel: values.carousel || 'out'
        };

        await createProduct({
          variables: {
            data: createData
          }
        });
      }
    } catch (error) {
      console.error('保存商品失败:', error);
      message.error('保存商品失败');
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
      router.push(`/products?${decodedParams}`);
    } else {
      router.push('/products');
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params.id, productsData]);

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
    <div style={{ padding: '24px', backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
      {/* 头部 */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
            style={{ marginRight: 16 }}
          >
            返回
          </Button>
          <Title level={4} style={{ margin: 0, color: '#111827', fontWeight: 600 }}>
            {isEditMode ? '编辑商品' : '新增商品'}
          </Title>
        </div>
        <Space>
          <Button onClick={handleBack}>
            取消
          </Button>
          <Button 
            type="primary" 
            icon={<SaveOutlined />}
            loading={saving}
            onClick={handleSave}
            style={{ backgroundColor: '#C5A46D', borderColor: '#C5A46D' }}
          >
            保存
          </Button>
        </Space>
      </div>

      {/* 表单内容 */}
      <Row gutter={24}>
        <Col span={16}>
          <Card title="基本信息" style={{ marginBottom: 24 }}>
            <Form
              form={form}
              layout="vertical"
            >
              <Form.Item
                label="商品名称"
                name="name"
                rules={[{ required: true, message: '请输入商品名称' }]}
              >
                <Input placeholder="请输入商品名称" size="large" />
              </Form.Item>

              <Form.Item
                label="副标题"
                name="subtitle"
              >
                <Input placeholder="请输入商品副标题" size="large" />
              </Form.Item>

              <Form.Item
                label="商品描述"
                name="description"
              >
                <TextArea rows={4} placeholder="请输入商品描述" />
              </Form.Item>

              <Form.Item
                label="品牌"
                name="brand"
              >
                <Input placeholder="请输入品牌名称" size="large" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="价格"
                    name="price"
                    rules={[
                      { type: 'number', min: 0, message: '价格不能为负数' }
                    ]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="请输入价格"
                      min={0}
                      step={0.01}
                      precision={2}
                      size="large"
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
                      size="large"
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
                      { type: 'number', min: 0, message: '库存不能为负数' }
                    ]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="请输入库存数量"
                      min={0}
                      step={1}
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="商品条码"
                    name="barcode"
                  >
                    <Input placeholder="请输入商品条码" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="摆放位置"
                name="location"
              >
                <Input placeholder="请输入商品摆放位置（如：A区货架3层）" size="large" />
              </Form.Item>

              <Form.Item
                label="商品视频"
                tooltip="上传商品展示视频，支持 MP4、MOV、AVI 等格式，最大 100MB"
              >
                <Form.Item name="video_url" hidden>
                  <Input />
                </Form.Item>
                <Upload
                  listType="picture-card"
                  fileList={videoList}
                  beforeUpload={handleVideoUpload}
                  onRemove={handleRemoveVideo}
                  onChange={handleVideoChange}
                  onPreview={handleVideoPreview}
                  maxCount={1}
                  accept="video/*"
                  showUploadList={{
                    showPreviewIcon: true, // 启用预览图标
                    showRemoveIcon: true,
                    showDownloadIcon: false
                  }}
                >
                  {videoList.length < 1 && (
                    <div>
                      {videoUploading ? <LoadingOutlined /> : <UploadOutlined />}
                      <div style={{ marginTop: 8 }}>上传视频</div>
                      <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                        最大 100MB
                      </div>
                    </div>
                  )}
                </Upload>
                
                {/* 视频预览 */}
                {videoList.length > 0 && videoList[0].url && (
                  <div style={{ marginTop: 16 }}>
                    <video 
                      src={videoList[0].url} 
                      controls
                      style={{ 
                        width: '100%', 
                        maxWidth: 500,
                        borderRadius: 8,
                        border: '1px solid #d9d9d9'
                      }}
                    >
                      您的浏览器不支持视频播放
                    </video>
                  </div>
                )}
              </Form.Item>
            </Form>
          </Card>

          <Card title="商品图片">
            <Form form={form} layout="vertical">
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
                  onPreview={handlePreview}
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

              <Divider />

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
                  onPreview={handlePreview}
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
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="商品设置">
            <Form form={form} layout="vertical">
              <Form.Item
                label="分类"
                name="category_id"
              >
                <Select placeholder="请选择分类" allowClear size="large">
                  {categories.map((category: any) => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="所属店铺"
                name="boutique_id"
              >
                <Select 
                  placeholder="请选择店铺" 
                  allowClear 
                  size="large"
                  showSearch
                  filterOption={(input, option) => {
                    const label = option?.label || option?.children;
                    if (typeof label === 'string') {
                      return label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    }
                    return false;
                  }}
                >
                  {boutiques.map((boutique: any) => (
                    <Option key={boutique.id} value={boutique.id} label={boutique.name}>
                      {boutique.name}
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
                <Select placeholder="请选择商品状态" size="large">
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
                label="是否特价"
                name="is_on_sale"
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="轮播设置"
                name="carousel"
                tooltip="控制商品图片是否在App端参与轮播展示"
                initialValue="out"
              >
                <Select placeholder="请选择轮播设置" size="large">
                  <Option value="in">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleOutlined style={{ marginRight: '6px', color: '#10B981' }} />
                      参与轮播
                    </span>
                  </Option>
                  <Option value="out">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      <EyeInvisibleOutlined style={{ marginRight: '6px', color: '#666' }} />
                      不参与轮播
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

export default function ProductEditPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ProductEditContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
