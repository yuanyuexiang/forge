import { NextRequest, NextResponse } from 'next/server';
import { executeGraphQLQuery, DATA_QUERIES } from '../../lib/directus-config';

// GraphQL 突变：创建分类
const CREATE_CATEGORY_MUTATION = `
  mutation CreateCategory($data: create_categories_input!) {
    create_categories_item(data: $data) {
      id
      name
      description
      created_at
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
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort')?.split(',') || ['name'];
    
    console.log('Categories API - GraphQL 获取分类列表');
    
    const result = await executeGraphQLQuery(DATA_QUERIES.CATEGORIES, {}, authHeader);
    const categories = result.data?.categories || [];
    
    console.log(`Categories API - 成功获取 ${categories.length} 个分类`);
    return NextResponse.json(categories);
    
  } catch (error) {
    console.error('获取分类列表失败:', error);
    return NextResponse.json(
      { error: '获取分类列表失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    const categoryData = await request.json();
    console.log('Categories API - GraphQL 创建分类:', categoryData);
    
    const result = await executeGraphQLQuery(
      CREATE_CATEGORY_MUTATION, 
      { data: categoryData }, 
      authHeader
    );
    
    console.log('Categories API - GraphQL 成功创建分类');
    return NextResponse.json(result.data?.create_categories_item);
    
  } catch (error) {
    console.error('创建分类失败:', error);
    return NextResponse.json(
      { error: '创建分类失败' },
      { status: 500 }
    );
  }
}
