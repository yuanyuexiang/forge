import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('Directus Auth - Login attempt for:', email);
    
    // 调用 Directus 认证端点
    const response = await fetch('https://directus.matrix-net.tech/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    const data = await response.json();
    
    console.log('Directus Auth - Response:', {
      status: response.status,
      hasData: !!data.data,
      hasErrors: !!data.errors
    });
    
    if (response.ok && data.data) {
      // 认证成功
      return NextResponse.json({
        access_token: data.data.access_token,
        refresh_token: data.data.refresh_token,
        expires: data.data.expires,
        user: {
          id: data.data.user?.id,
          email: data.data.user?.email,
          first_name: data.data.user?.first_name,
          last_name: data.data.user?.last_name,
        }
      });
    } else {
      // 认证失败
      return NextResponse.json(
        { 
          errors: data.errors || [{ message: '登录失败，请检查邮箱和密码' }] 
        },
        { status: response.status || 401 }
      );
    }
    
  } catch (error) {
    console.error('Directus Auth Error:', error);
    return NextResponse.json(
      { 
        errors: [{ message: '服务器连接失败，请稍后重试' }] 
      },
      { status: 500 }
    );
  }
}

// 处理 OPTIONS 请求（CORS 预检）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
