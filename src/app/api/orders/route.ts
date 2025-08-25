import { NextRequest, NextResponse } from 'next/server';
import { executeGraphQLQuery, DATA_QUERIES } from '../../lib/directus-config';

// GraphQL 查询：获取单个订单详情
const GET_ORDER_BY_ID_QUERY = `
  query GetOrderById($id: ID!) {
    orders_by_id(id: $id) {
      id
      user_id
      total_price
      status
      created_at
      updated_at
      order_items {
        id
        product_id
        quantity
        price
        product {
          id
          name
          description
          price
          stock
        }
      }
      payment {
        id
        payment_method
        amount
        status
        paid_at
        transaction_id
      }
      user {
        id
        first_name
        last_name
        email
        phone
      }
    }
  }
`;

// GraphQL 突变：更新订单状态
const UPDATE_ORDER_MUTATION = `
  mutation UpdateOrder($id: ID!, $data: update_orders_input!) {
    update_orders_item(id: $id, data: $data) {
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
    const orderId = searchParams.get('id');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort')?.split(',') || ['-created_at'];
    
    if (orderId) {
      // 获取单个订单详情
      console.log(`Orders API - GraphQL 获取订单详情: ${orderId}`);
      const result = await executeGraphQLQuery(GET_ORDER_BY_ID_QUERY, { id: orderId }, authHeader);
      
      if (!result.data?.orders_by_id) {
        return NextResponse.json(
          { error: '订单未找到' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(result.data.orders_by_id);
    } else {
      // 获取订单列表
      console.log('Orders API - GraphQL 获取订单列表');
      const result = await executeGraphQLQuery(DATA_QUERIES.ORDERS, {
        limit,
        offset,
        sort
      }, authHeader);
      
      const orders = result.data?.orders || [];
      console.log(`Orders API - 成功获取 ${orders.length} 个订单`);
      return NextResponse.json(orders);
    }
    
  } catch (error) {
    console.error('获取订单失败:', error);
    return NextResponse.json(
      { error: '获取订单失败' },
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
    const orderId = searchParams.get('id');
    
    if (!orderId) {
      return NextResponse.json(
        { error: '订单ID必需' },
        { status: 400 }
      );
    }
    
    const updateData = await request.json();
    console.log(`Orders API - GraphQL 更新订单 ${orderId}:`, updateData);
    
    const result = await executeGraphQLQuery(
      UPDATE_ORDER_MUTATION, 
      { id: orderId, data: updateData }, 
      authHeader
    );
    
    console.log('Orders API - GraphQL 成功更新订单');
    return NextResponse.json(result.data?.update_orders_item);
    
  } catch (error) {
    console.error('更新订单失败:', error);
    return NextResponse.json(
      { error: '更新订单失败' },
      { status: 500 }
    );
  }
}
