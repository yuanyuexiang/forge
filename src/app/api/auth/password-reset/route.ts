import { NextRequest, NextResponse } from 'next/server';
import { executeServerSideGraphQLQuery, AUTH_QUERIES } from '@lib/api/directus-config';
import { authLogger } from '@lib/utils/logger';

// 重置密码
export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    authLogger.info('GraphQL Password Reset - 开始密码重置');

    try {
      await executeServerSideGraphQLQuery(
        AUTH_QUERIES.PASSWORD_RESET,
        { 
          token: token,
          password: password
        },
        undefined,
        true // 使用系统端点
      );

      authLogger.info('GraphQL Password Reset - 密码重置成功');
      
      return NextResponse.json({
        success: true,
        message: '密码重置成功，请使用新密码登录'
      });
    } catch (resetError: any) {
      authLogger.error('GraphQL Password Reset - 重置失败', resetError);
      return NextResponse.json(
        { error: resetError.message || '密码重置失败，请重新申请重置链接' },
        { status: 400 }
      );
    }

  } catch (error) {
    authLogger.error('GraphQL Password Reset - 服务器错误', error);
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
