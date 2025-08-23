import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { errors: [{ message: '未提供认证 token' }] },
        { status: 401 }
      );
    }
    
    const token = authHeader.substring(7);
    
    // 调用 Directus 获取用户信息
    const response = await fetch('https://directus.matrix-net.tech/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const userData = await response.json();
      return NextResponse.json(userData.data);
    } else {
      return NextResponse.json(
        { errors: [{ message: 'Token 验证失败' }] },
        { status: response.status }
      );
    }
    
  } catch (error) {
    console.error('User info error:', error);
    return NextResponse.json(
      { errors: [{ message: '获取用户信息失败' }] },
      { status: 500 }
    );
  }
}
