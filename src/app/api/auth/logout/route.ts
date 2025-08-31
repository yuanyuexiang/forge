import { NextRequest, NextResponse } from 'next/server';
import { executeServerSideGraphQLQuery, AUTH_QUERIES } from '@lib/api/directus-config';
import { authLogger } from '@lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json();

    authLogger.info('GraphQL System Logout - 开始登出流程');

    // 如果有 refresh_token，使用 GraphQL 系统端点登出
    if (refresh_token) {
      try {
        await executeServerSideGraphQLQuery(
          AUTH_QUERIES.LOGOUT,
          { 
            refresh_token: refresh_token,
            mode: 'json' // 使用 JSON 模式
          },
          undefined,
          true // 使用系统端点
        );
        
        authLogger.info('GraphQL System Logout - 服务端登出成功');
      } catch (logoutError: any) {
        // 即使服务端登出失败，也继续处理客户端登出
        authLogger.warn('GraphQL System Logout - 服务端登出失败，继续客户端登出', logoutError);
      }
    }

    // 返回成功响应，让客户端清除本地 token
    return NextResponse.json({
      success: true,
      message: '登出成功'
    });

  } catch (error) {
    authLogger.error('GraphQL System Logout - 服务器错误', error);
    
    // 即使出错，也返回成功，让客户端清除本地 token
    return NextResponse.json({
      success: true,
      message: '登出成功'
    });
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
