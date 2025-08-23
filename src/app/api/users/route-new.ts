import { NextRequest, NextResponse } from 'next/server';
import { executeGraphQLQuery, DATA_QUERIES } from '../../lib/directus-config';

// GraphQL 查询：根据ID获取用户详情
const GET_USER_BY_ID_QUERY = `
  query GetUserById($id: ID!) {
    users_by_id(id: $id) {
      id
      first_name
      last_name
      email
      phone
      status
      created_at
      last_access
      orders {
        id
        total_price
        status
        created_at
      }
    }
  }
`;

// GraphQL 突变：更新用户状态
const UPDATE_USER_MUTATION = `
  mutation UpdateUser($id: ID!, $data: update_directus_users_input!) {
    update_users_item(id: $id, data: $data) {
      id
      status
      updated_at
    }
  }
`;

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: '认证失败' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort')?.split(',') || ['-created_at'];
    
    if (userId) {
      // 获取单个用户详情
      console.log(`Users API - GraphQL 获取用户详情: ${userId}`);
      const result = await executeGraphQLQuery(GET_USER_BY_ID_QUERY, { id: userId }, authHeader);
      
      if (!result.data?.users_by_id) {
        return NextResponse.json(
          { error: '用户未找到' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(result.data.users_by_id);
    } else {
      // 获取用户列表
      console.log('Users API - GraphQL 获取用户列表');
      const result = await executeGraphQLQuery(DATA_QUERIES.USERS, {
        limit,
        offset,
        sort
      }, authHeader);
      
      const users = result.data?.users || [];
      console.log(`Users API - 成功获取 ${users.length} 个用户`);
      return NextResponse.json(users);
    }
    
  } catch (error) {
    console.error('获取用户失败:', error);
    return NextResponse.json(
      { error: '获取用户失败' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json(
        { error: '用户ID必需' },
        { status: 400 }
      );
    }
    
    const updateData = await request.json();
    console.log(`Users API - GraphQL 更新用户 ${userId}:`, updateData);
    
    const result = await executeGraphQLQuery(
      UPDATE_USER_MUTATION, 
      { id: userId, data: updateData }, 
      authHeader
    );
    
    console.log('Users API - GraphQL 成功更新用户');
    return NextResponse.json(result.data?.update_users_item);
    
  } catch (error) {
    console.error('更新用户失败:', error);
    return NextResponse.json(
      { error: '更新用户失败' },
      { status: 500 }
    );
  }
}
