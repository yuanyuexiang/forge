import { NextRequest, NextResponse } from 'next/server';

const DIRECTUS_GRAPHQL_URL = 'https://directus.matrix-net.tech/graphql';

// 尝试不同的 GraphQL 认证突变名称
const AUTH_MUTATIONS = [
  // 标准 Directus GraphQL 认证
  `mutation Login($email: String!, $password: String!) {
    auth_login(email: $email, password: $password) {
      access_token
      refresh_token
      expires
    }
  }`,
  // 备选突变名称
  `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
      expires
    }
  }`,
  // 另一种可能的名称
  `mutation Authenticate($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      access_token
      refresh_token
      expires
    }
  }`
];

async function tryGraphQLAuth(email: string, password: string) {
  for (let i = 0; i < AUTH_MUTATIONS.length; i++) {
    const mutation = AUTH_MUTATIONS[i];
    console.log(`尝试 GraphQL 认证方式 ${i + 1}...`);
    
    try {
      const response = await fetch(DIRECTUS_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables: { email, password },
        }),
      });
      
      const result = await response.json();
      
      // 如果没有错误且有数据，认证成功
      if (!result.errors && result.data) {
        const authData = result.data.auth_login || result.data.login || result.data.authenticate;
        if (authData?.access_token) {
          console.log(`GraphQL 认证成功，使用方式 ${i + 1}`);
          return authData;
        }
      }
      
      console.log(`方式 ${i + 1} 失败:`, result.errors?.[0]?.message || '无数据返回');
    } catch (error) {
      console.log(`方式 ${i + 1} 异常:`, error);
    }
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    console.log('Directus Auth - 尝试 GraphQL 认证:', email);
    
    // 首先尝试 GraphQL 认证
    const graphqlAuth = await tryGraphQLAuth(email, password);
    
    if (graphqlAuth) {
      // GraphQL 认证成功，获取用户信息
      try {
        const userResponse = await fetch(DIRECTUS_GRAPHQL_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${graphqlAuth.access_token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                users_me {
                  id
                  email
                  first_name
                  last_name
                  role {
                    id
                    name
                  }
                }
              }
            `,
          }),
        });
        
        const userResult = await userResponse.json();
        
        return NextResponse.json({
          access_token: graphqlAuth.access_token,
          refresh_token: graphqlAuth.refresh_token,
          expires: graphqlAuth.expires,
          user: userResult.data?.users_me || {
            id: null,
            email,
            first_name: null,
            last_name: null,
          }
        });
      } catch (userError) {
        console.warn('GraphQL 用户信息获取失败:', userError);
        return NextResponse.json({
          access_token: graphqlAuth.access_token,
          refresh_token: graphqlAuth.refresh_token,
          expires: graphqlAuth.expires,
          user: { id: null, email, first_name: null, last_name: null }
        });
      }
    }
    
    // GraphQL 认证失败，回退到 REST API
    console.log('GraphQL 认证全部失败，尝试 REST API...');
    const restResponse = await fetch('https://directus.matrix-net.tech/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const restData = await restResponse.json();
    
    if (restResponse.ok && restData.data) {
      console.log('REST API 认证成功');
      return NextResponse.json({
        access_token: restData.data.access_token,
        refresh_token: restData.data.refresh_token,
        expires: restData.data.expires,
        user: {
          id: restData.data.user?.id,
          email: restData.data.user?.email,
          first_name: restData.data.user?.first_name,
          last_name: restData.data.user?.last_name,
        }
      });
    } else {
      return NextResponse.json(
        { errors: restData.errors || [{ message: '登录失败，请检查邮箱和密码' }] },
        { status: 401 }
      );
    }
    
  } catch (error) {
    console.error('Directus Auth Error:', error);
    return NextResponse.json(
      { errors: [{ message: '服务器连接失败，请稍后重试' }] },
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
