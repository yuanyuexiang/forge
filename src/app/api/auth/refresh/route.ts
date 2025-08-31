import { NextRequest, NextResponse } from 'next/server';
import { executeServerSideGraphQLQuery, AUTH_QUERIES } from '@lib/api/directus-config';
import { authLogger } from '@lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    authLogger.info('GraphQL Token Refresh - 开始刷新令牌');

    // 使用 GraphQL 系统端点刷新 token
    try {
      const refreshData = await executeServerSideGraphQLQuery(
        AUTH_QUERIES.REFRESH_TOKEN,
        { 
          refresh_token: refresh_token,
          mode: 'json' // 使用 JSON 模式
        },
        undefined,
        true // 使用系统端点
      );

      if (refreshData?.auth_refresh?.access_token) {
        authLogger.info('GraphQL Token Refresh - 刷新成功');
        
        return NextResponse.json({
          access_token: refreshData.auth_refresh.access_token,
          refresh_token: refreshData.auth_refresh.refresh_token,
          expires: refreshData.auth_refresh.expires
        });
      } else {
        authLogger.warn('GraphQL Token Refresh - 无效的刷新响应');
        return NextResponse.json(
          { error: 'Failed to refresh token' },
          { status: 401 }
        );
      }
    } catch (refreshError: any) {
      authLogger.error('GraphQL Token Refresh - 刷新失败', refreshError);
      return NextResponse.json(
        { error: refreshError.message || 'Invalid refresh token' },
        { status: 401 }
      );
    }

  } catch (error) {
    authLogger.error('GraphQL Token Refresh - 服务器错误', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
