import { NextRequest, NextResponse } from 'next/server';
import { getApiConfig, defaultApiConfig, directApiConfig } from '../../lib/api-config';
import { DIRECTUS_CONFIG } from '../../lib/directus-config';

export async function GET() {
  try {
    const currentConfig = getApiConfig();
    
    const configInfo = {
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      
      // 当前生效的配置
      currentConfig: {
        endpoint: currentConfig.endpoint,
        useProxy: currentConfig.useProxy,
        timeout: currentConfig.timeout,
        retryCount: currentConfig.retryCount,
      },
      
      // 预设配置
      presetConfigs: {
        default: {
          endpoint: defaultApiConfig.endpoint,
          useProxy: defaultApiConfig.useProxy,
        },
        direct: {
          endpoint: directApiConfig.endpoint,
          useProxy: directApiConfig.useProxy,
        }
      },
      
      // Directus 配置
      directusConfig: {
        GRAPHQL_URL: DIRECTUS_CONFIG.GRAPHQL_URL,
        GRAPHQL_SYSTEM_URL: DIRECTUS_CONFIG.GRAPHQL_SYSTEM_URL,
        LOCAL_GRAPHQL_PROXY: DIRECTUS_CONFIG.LOCAL_GRAPHQL_PROXY,
        BASE_URL: DIRECTUS_CONFIG.BASE_URL,
      },
      
      // 配置解析结果
      analysis: {
        isUsingProxy: currentConfig.useProxy,
        targetEndpoint: currentConfig.useProxy 
          ? `${DIRECTUS_CONFIG.BASE_URL}${DIRECTUS_CONFIG.LOCAL_GRAPHQL_PROXY} -> ${DIRECTUS_CONFIG.GRAPHQL_URL}`
          : currentConfig.endpoint,
        isSmartDetection: true,
        currentHost: typeof window !== 'undefined' ? window.location.host : 'server-side',
      },
      
      // 简化说明
      explanation: {
        development: "开发环境自动使用代理 (/api/graphql) 避免 CORS 问题",
        production: "生产环境根据域名智能检测：forge 域名直连 /graphql，其他情况使用代理",
        benefits: "无需环境变量配置，自动适应部署环境"
      }
    };

    return NextResponse.json(configInfo, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to retrieve configuration info',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
