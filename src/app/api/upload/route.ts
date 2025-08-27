import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: '没有找到文件' }, { status: 400 });
    }

    // 获取认证token
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!authToken) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }

    // 使用硬编码的Directus URL，或者从环境变量获取
    const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'https://directus.matrix-net.tech';
    
    // 创建新的FormData，包含Directus需要的字段
    // 注意：根据Directus文档，元数据字段必须在文件字段之前
    const directusFormData = new FormData();
    
    // 先添加元数据 - 尝试最简单的方式
    directusFormData.append('storage', 'local');
    
    // 如果文件有MIME类型，就添加，否则让Directus自动推断
    if (file.type) {
      directusFormData.append('type', file.type);
    }
    
    // 最后添加文件
    directusFormData.append('file', file);
    
    console.log('Uploading to:', `${directusUrl}/files`);
    console.log('Auth token present:', !!authToken);
    console.log('File info:', {
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size
    });
    
    // 调试：输出FormData内容
    console.log('FormData entries:');
    for (const [key, value] of directusFormData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.type}, ${value.size})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // 转发到Directus文件上传API
    const directusResponse = await fetch(`${directusUrl}/files`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      },
      body: directusFormData
    });

    console.log('Directus response status:', directusResponse.status);

    if (!directusResponse.ok) {
      const errorText = await directusResponse.text();
      console.error('Directus upload error:', errorText);
      return NextResponse.json({ 
        error: `Directus上传失败: ${directusResponse.status}`, 
        details: errorText 
      }, { status: directusResponse.status });
    }

    const result = await directusResponse.json();
    console.log('Upload successful:', result);
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('文件上传错误:', error);
    return NextResponse.json(
      { error: '文件上传失败', details: error instanceof Error ? error.message : '未知错误' }, 
      { status: 500 }
    );
  }
}
