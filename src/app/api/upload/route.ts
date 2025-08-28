import { NextRequest, NextResponse } from 'next/server';
import { TokenManager } from '@lib/auth/token-manager';
import { DIRECTUS_CONFIG } from '@lib/api/directus-config';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '没有找到文件' },
        { status: 400 }
      );
    }

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: '只支持图片文件' },
        { status: 400 }
      );
    }

    // 验证文件大小 (最大 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '文件大小不能超过 10MB' },
        { status: 400 }
      );
    }

    // 从请求头获取认证令牌
    let token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '未找到认证令牌，请重新登录' },
        { status: 401 }
      );
    }

    console.log('开始上传到 Directus:', {
      url: DIRECTUS_CONFIG.FILE_UPLOAD_URL,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      hasToken: !!token
    });

    // 创建新的 FormData 用于发送到 Directus
    const directusFormData = new FormData();
    directusFormData.append('file', file);

    // 发送到 Directus
    const response = await fetch(DIRECTUS_CONFIG.FILE_UPLOAD_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: directusFormData,
    });

    const responseHeaders = Object.fromEntries(response.headers.entries());
    console.log('Directus 响应状态:', response.status);
    console.log('Directus 响应头:', responseHeaders);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Directus 上传失败:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });

      // 如果是认证错误，尝试刷新令牌再试一次
      if (response.status === 401) {
        console.log('认证失败，尝试刷新令牌...');
        const newToken = await TokenManager.refreshAccessToken();
        
        if (newToken) {
          console.log('令牌刷新成功，重试上传...');
          const retryResponse = await fetch(DIRECTUS_CONFIG.FILE_UPLOAD_URL, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${newToken}`,
            },
            body: directusFormData,
          });

          if (retryResponse.ok) {
            const retryData = await retryResponse.json();
            console.log('重试上传成功:', retryData);
            return NextResponse.json(retryData);
          } else {
            const retryError = await retryResponse.text();
            console.log('重试上传仍然失败:', retryError);
          }
        }
      }
      
      return NextResponse.json(
        { error: '上传失败', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Directus 上传成功:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('上传 API 错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}
