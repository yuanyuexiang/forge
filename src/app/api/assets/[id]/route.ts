import { NextRequest, NextResponse } from 'next/server';
import { APP_CONFIG } from '@config/app-config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const url = new URL(request.url);
    
    console.log('Requesting asset with ID:', id);
    
    // 如果 id 看起来像是完整的URL，直接重定向
    if (id.startsWith('http://') || id.startsWith('https://')) {
      console.log('Redirecting to external URL:', id);
      return NextResponse.redirect(id);
    }
    
    // 使用配置文件中的Directus URL，或者从环境变量获取
    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || APP_CONFIG.API.DIRECTUS.DEFAULT_URL;
    const assetUrl = `${directusUrl}${APP_CONFIG.API.DIRECTUS.ASSETS_ENDPOINT}/${id}`;
    
    // 构建完整的URL，包含所有查询参数
    const directusAssetUrl = new URL(assetUrl);
    
    // 转发所有查询参数（除了 token，它会被单独处理）
    for (const [key, value] of url.searchParams.entries()) {
      if (key !== 'token') {
        directusAssetUrl.searchParams.set(key, value);
      }
    }
    
    console.log('Fetching from Directus:', directusAssetUrl.toString());
    
    // 获取认证 token - 优先从Authorization头，然后从查询参数，最后从cookie
    let token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      token = url.searchParams.get('token') || undefined;
    }
    
    if (!token) {
      const authCookie = request.headers.get('cookie');
      token = authCookie?.split(';')
        .find(c => c.trim().startsWith('directus_token='))
        ?.split('=')[1];
    }
    
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('Auth token present for asset request');
    } else {
      console.log('No auth token found for asset request');
    }
    
    // 转发到Directus获取文件
    const directusResponse = await fetch(directusAssetUrl.toString(), { headers });

    console.log('Directus asset response status:', directusResponse.status);

    if (!directusResponse.ok) {
      console.error('Asset not found:', id);
      return NextResponse.json({ error: '文件未找到' }, { status: 404 });
    }

    // 获取文件内容和headers
    const fileBuffer = await directusResponse.arrayBuffer();
    const contentType = directusResponse.headers.get('content-type') || 'application/octet-stream';
    
    console.log('Returning asset:', { contentType, size: fileBuffer.byteLength });
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000'
      }
    });
    
  } catch (error) {
    console.error('获取文件错误:', error);
    return NextResponse.json({ error: '获取文件失败' }, { status: 500 });
  }
}
