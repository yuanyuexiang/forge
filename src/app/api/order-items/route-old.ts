import { NextRequest, NextResponse } from 'next/server';

// 使用本地 GraphQL 代理端点
const GRAPHQL_PROXY_URL = '/api/graphql';

// GraphQL 查询：根据订单ID获取订单项
const GET_ORDER_ITEMS_BY_ORDER_QUERY = `
  query GetOrderItemsByOrder($order_id: String!) {
    order_items(filter: { order_id: { _eq: $order_id } }) {
      id
      order_id
      product_id
      quantity
      price
      created_at
      updated_at
      product {
        id
        name
        description
        price
        stock
        category_id
        category {
          name
        }
      }
    }
  }
`;

// GraphQL 查询：获取所有订单项
const GET_ORDER_ITEMS_QUERY = `
  query GetOrderItems($limit: Int, $offset: Int, $sort: [String]) {
    order_items(limit: $limit, offset: $offset, sort: $sort) {
      id
      order_id
      product_id
      quantity
      price
      created_at
      updated_at
      order {
        id
        user_id
        total_price
        status
        user {
          first_name
          last_name
        }
      }
      product {
        id
        name
        description
        price
        stock
      }
    }
  }
`;

// GraphQL 突变：创建订单项
const CREATE_ORDER_ITEM_MUTATION = `
  mutation CreateOrderItem($data: create_order_items_input!) {
    create_order_items_item(data: $data) {
      id
      order_id
      product_id
      quantity
      price
      created_at
    }
  }
`;

// GraphQL 突变：更新订单项
const UPDATE_ORDER_ITEM_MUTATION = `
  mutation UpdateOrderItem($id: ID!, $data: update_order_items_input!) {
    update_order_items_item(id: $id, data: $data) {
      id
      quantity
      price
      updated_at
    }
  }
`;

// GraphQL 突变：删除订单项
const DELETE_ORDER_ITEM_MUTATION = `
  mutation DeleteOrderItem($id: ID!) {
    delete_order_items_item(id: $id) {
      id
    }
  }
`;

async function executeGraphQLQuery(query: string, variables: any, authToken?: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${GRAPHQL_PROXY_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL 错误:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL 查询失败');
    }
    
    return result.data;
  } catch (error) {
    console.error('GraphQL 请求失败:', error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort')?.split(',') || ['created_at'];
    
    if (orderId) {
      // 获取特定订单的订单项
      console.log(`Order Items API - GraphQL 获取订单 ${orderId} 的订单项`);
      const data = await executeGraphQLQuery(GET_ORDER_ITEMS_BY_ORDER_QUERY, { order_id: orderId }, token);
      return NextResponse.json(data.order_items || []);
    } else {
      // 获取所有订单项
      console.log('Order Items API - GraphQL 获取订单项列表');
      const data = await executeGraphQLQuery(GET_ORDER_ITEMS_QUERY, {
        limit,
        offset,
        sort
      }, token);
      
      console.log(`Order Items API - 成功获取 ${data.order_items?.length || 0} 个订单项`);
      return NextResponse.json(data.order_items || []);
    }
    
  } catch (error) {
    console.error('获取订单项失败:', error);
    return NextResponse.json(
      { error: '获取订单项失败' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    const orderItemData = await request.json();
    console.log('Order Items API - GraphQL 创建订单项:', orderItemData);
    
    const data = await executeGraphQLQuery(
      CREATE_ORDER_ITEM_MUTATION, 
      { data: orderItemData }, 
      token
    );
    
    console.log('Order Items API - GraphQL 成功创建订单项');
    return NextResponse.json(data.create_order_items_item);
    
  } catch (error) {
    console.error('创建订单项失败:', error);
    return NextResponse.json(
      { error: '创建订单项失败' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('id');
    
    if (!itemId) {
      return NextResponse.json(
        { error: '订单项ID必需' },
        { status: 400 }
      );
    }
    
    const updateData = await request.json();
    console.log(`Order Items API - GraphQL 更新订单项 ${itemId}:`, updateData);
    
    const data = await executeGraphQLQuery(
      UPDATE_ORDER_ITEM_MUTATION, 
      { id: itemId, data: updateData }, 
      token
    );
    
    console.log('Order Items API - GraphQL 成功更新订单项');
    return NextResponse.json(data.update_order_items_item);
    
  } catch (error) {
    console.error('更新订单项失败:', error);
    return NextResponse.json(
      { error: '更新订单项失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('id');
    
    if (!itemId) {
      return NextResponse.json(
        { error: '订单项ID必需' },
        { status: 400 }
      );
    }
    
    console.log(`Order Items API - GraphQL 删除订单项 ${itemId}`);
    
    const data = await executeGraphQLQuery(
      DELETE_ORDER_ITEM_MUTATION, 
      { id: itemId }, 
      token
    );
    
    console.log('Order Items API - GraphQL 成功删除订单项');
    return NextResponse.json(data.delete_order_items_item);
    
  } catch (error) {
    console.error('删除订单项失败:', error);
    return NextResponse.json(
      { error: '删除订单项失败' },
      { status: 500 }
    );
  }
}
