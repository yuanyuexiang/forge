import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    
    console.log('Requesting asset with ID:', id);
    
    // 如果 id 看起来像是完整的URL，直接重定向
    if (id.startsWith('http://') || id.startsWith('https://')) {
      console.log('Redirecting to external URL:', id);
      return NextResponse.redirect(id);
    }
    
    // 使用硬编码的Directus URL，或者从环境变量获取
    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://directus.matrix-net.tech';
    const assetUrl = `${directusUrl}/assets/${id}`;
    
    console.log('Fetching from Directus:', assetUrl);
    
    // 获取认证 token 从 cookie
    const authCookie = request.headers.get('cookie');
    const token = authCookie?.split(';')
      .find(c => c.trim().startsWith('directus_token='))
      ?.split('=')[1];
    
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('Auth token present for asset request');
    } else {
      console.log('No auth token found for asset request');
    }
    
    // 转发到Directus获取文件
    const directusResponse = await fetch(assetUrl, { headers });

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
