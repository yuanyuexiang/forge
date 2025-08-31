import { NextRequest, NextResponse } from 'next/server';
import { executeServerSideGraphQLQuery, AUTH_QUERIES } from '@lib/api/directus-config';
import { authLogger } from '@lib/utils/logger';

// 请求密码重置
export async function POST(request: NextRequest) {
  try {
    const { email, reset_url } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    authLogger.info('GraphQL Password Reset Request - 开始密码重置请求', { email });

    try {
      await executeServerSideGraphQLQuery(
        AUTH_QUERIES.PASSWORD_REQUEST,
        { 
          email: email,
          reset_url: reset_url || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password`
        },
        undefined,
        true // 使用系统端点
      );

      authLogger.info('GraphQL Password Reset Request - 密码重置邮件发送成功');
      
      return NextResponse.json({
        success: true,
        message: '密码重置邮件已发送，请检查您的邮箱'
      });
    } catch (resetError: any) {
      authLogger.error('GraphQL Password Reset Request - 请求失败', resetError);
      return NextResponse.json(
        { error: resetError.message || '密码重置请求失败' },
        { status: 400 }
      );
    }

  } catch (error) {
    authLogger.error('GraphQL Password Reset Request - 服务器错误', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
