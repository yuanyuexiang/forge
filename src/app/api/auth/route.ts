import { NextRequest, NextResponse } from 'next/server';
import { executeServerSideGraphQLQuery, AUTH_QUERIES } from '@lib/api/directus-config';
import { authLogger } from '@lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const { email, password, otp } = await request.json();
    
    authLogger.info('GraphQL System Auth - 开始认证流程', { email });
    
    // 使用 GraphQL 系统端点进行认证
    try {
      const authData = await executeServerSideGraphQLQuery(
        AUTH_QUERIES.LOGIN,
        { 
          email, 
          password, 
          mode: 'json', // 使用 JSON 模式
          ...(otp && { otp }) // 如果提供了 OTP，包含在请求中
        },
        undefined,
        true // 使用系统端点
      );

      if (authData?.auth_login?.access_token) {
        // GraphQL 认证成功，获取用户信息
        const token = authData.auth_login.access_token;
        
        try {
          const userData = await executeServerSideGraphQLQuery(
            AUTH_QUERIES.GET_CURRENT_USER,
            {},
            token,
            false // 使用普通端点获取用户信息
          );
          
          authLogger.info('GraphQL System Auth - 认证完全成功！');
          
          return NextResponse.json({
            access_token: authData.auth_login.access_token,
            refresh_token: authData.auth_login.refresh_token,
            expires: authData.auth_login.expires,
            user: userData?.users_me || {
              id: null,
              email,
              first_name: null,
              last_name: null,
            }
          });
        } catch (userError) {
          authLogger.warn('GraphQL 用户信息获取失败，但认证成功', userError);
          return NextResponse.json({
            access_token: authData.auth_login.access_token,
            refresh_token: authData.auth_login.refresh_token,
            expires: authData.auth_login.expires,
            user: { id: null, email, first_name: null, last_name: null }
          });
        }
      } else {
        // 认证失败
        authLogger.warn('GraphQL System Auth - 认证失败', { email });
        return NextResponse.json(
          { 
            errors: [{ message: '登录失败，请检查邮箱和密码' }] 
          },
          { status: 401 }
        );
      }
    } catch (authError: any) {
      authLogger.error('GraphQL System Auth - 认证错误', authError);
      return NextResponse.json(
        { 
          errors: [{ 
            message: authError.message || '登录失败，请检查邮箱和密码' 
          }]
        },
        { status: 401 }
      );
    }
    
  } catch (error) {
    authLogger.error('GraphQL System Auth - 服务器错误', error);
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
