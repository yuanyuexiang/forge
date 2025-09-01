import { NextRequest, NextResponse } from 'next/server';
import { DIRECTUS_CONFIG } from '@lib/api/directus-config';
import { getEnvironmentFromRequest } from '@lib/utils/environment';
import { proxyLogger } from '@lib/utils/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headers = new Headers();
    
    // 复制相关的头部信息
    headers.set('Content-Type', 'application/json');
    
    // 如果有认证头，传递给目标服务器
    const authHeader = request.headers.get('authorization');
    if (authHeader) {
      headers.set('Authorization', authHeader);
    }

    // 根据环境确定目标 URL
    const host = request.headers.get('host') || '';
    const protocol = request.nextUrl.protocol;
    const { isLocal, targetUrl: baseTargetUrl } = getEnvironmentFromRequest(host);
    
    const targetUrl = `${baseTargetUrl}/graphql/system`;
    
    proxyLogger.info('GraphQL System Proxy Request', {
      environment: isLocal ? 'local' : 'production',
      targetUrl,
      hasAuth: !!authHeader,
      requestPreview: body.substring(0, 200) + '...'
    });

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.text();
    
    proxyLogger.debug('GraphQL System Proxy Response', {
      status: response.status,
      responsePreview: data.substring(0, 200) + '...'
    });

    // 如果响应不是 JSON，可能是错误
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      proxyLogger.error('Failed to parse GraphQL System response as JSON', {
        status: response.status,
        data: data.substring(0, 500)
      });
      
      return NextResponse.json(
        { 
          error: 'Invalid response from GraphQL System endpoint',
          details: response.status !== 200 ? `HTTP ${response.status}` : 'Invalid JSON'
        },
        { status: 500 }
      );
    }

    // 检查 GraphQL 错误
    if (jsonData.errors && jsonData.errors.length > 0) {
      proxyLogger.warn('GraphQL System errors detected', {
        errors: jsonData.errors
      });
    }

    return new NextResponse(JSON.stringify(jsonData), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    proxyLogger.error('GraphQL System Proxy Error', error);
    
    return NextResponse.json(
      { 
        error: 'GraphQL System proxy failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 支持 OPTIONS 请求用于 CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
