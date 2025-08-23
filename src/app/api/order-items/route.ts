import { NextRequest, NextResponse } from 'next/server';
import { executeGraphQLQuery } from '../../lib/directus-config';

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
    const orderId = searchParams.get('order_id');
    
    if (!orderId) {
      return NextResponse.json(
        { error: '订单ID必需' },
        { status: 400 }
      );
    }
    
    console.log(`Order Items API - GraphQL 获取订单 ${orderId} 的订单项`);
    const result = await executeGraphQLQuery(
      GET_ORDER_ITEMS_BY_ORDER_QUERY, 
      { order_id: orderId }, 
      authHeader
    );
    
    const orderItems = result.data?.order_items || [];
    console.log(`Order Items API - 成功获取 ${orderItems.length} 个订单项`);
    return NextResponse.json(orderItems);
    
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
    
    if (!authHeader) {
      return NextResponse.json(
        { error: '需要认证' },
        { status: 401 }
      );
    }
    
    const orderItemData = await request.json();
    console.log('Order Items API - GraphQL 创建订单项:', orderItemData);
    
    const result = await executeGraphQLQuery(
      CREATE_ORDER_ITEM_MUTATION, 
      { data: orderItemData }, 
      authHeader
    );
    
    console.log('Order Items API - GraphQL 成功创建订单项');
    return NextResponse.json(result.data?.create_order_items_item);
    
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
    
    if (!authHeader) {
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
    
    const result = await executeGraphQLQuery(
      UPDATE_ORDER_ITEM_MUTATION, 
      { id: itemId, data: updateData }, 
      authHeader
    );
    
    console.log('Order Items API - GraphQL 成功更新订单项');
    return NextResponse.json(result.data?.update_order_items_item);
    
  } catch (error) {
    console.error('更新订单项失败:', error);
    return NextResponse.json(
      { error: '更新订单项失败' },
      { status: 500 }
    );
  }
}
