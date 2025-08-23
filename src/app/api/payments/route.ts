import { NextRequest, NextResponse } from 'next/server';
import { executeGraphQLQuery, DATA_QUERIES } from '../../lib/directus-config';

// GraphQL 查询：根据订单ID获取支付信息
const GET_PAYMENTS_BY_ORDER_QUERY = `
  query GetPaymentsByOrder($order_id: String!) {
    payments(filter: { order_id: { _eq: $order_id } }) {
      id
      order_id
      payment_method
      amount
      status
      transaction_id
      paid_at
      created_at
      updated_at
    }
  }
`;

// GraphQL 突变：更新支付状态
const UPDATE_PAYMENT_MUTATION = `
  mutation UpdatePayment($id: ID!, $data: update_payments_input!) {
    update_payments_item(id: $id, data: $data) {
      id
      status
      paid_at
      updated_at
    }
  }
`;

// GraphQL 突变：创建支付记录
const CREATE_PAYMENT_MUTATION = `
  mutation CreatePayment($data: create_payments_input!) {
    create_payments_item(data: $data) {
      id
      order_id
      payment_method
      amount
      status
      transaction_id
      created_at
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
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const sort = searchParams.get('sort')?.split(',') || ['-created_at'];
    
    if (orderId) {
      // 根据订单ID获取支付信息
      console.log(`Payments API - GraphQL 获取订单 ${orderId} 的支付信息`);
      const result = await executeGraphQLQuery(
        GET_PAYMENTS_BY_ORDER_QUERY, 
        { order_id: orderId }, 
        authHeader
      );
      
      const payments = result.data?.payments || [];
      console.log(`Payments API - 成功获取 ${payments.length} 条支付记录`);
      return NextResponse.json(payments);
    } else {
      // 获取所有支付记录
      console.log('Payments API - GraphQL 获取支付记录列表');
      const result = await executeGraphQLQuery(DATA_QUERIES.PAYMENTS, {
        limit,
        offset,
        sort
      }, authHeader);
      
      const payments = result.data?.payments || [];
      console.log(`Payments API - 成功获取 ${payments.length} 条支付记录`);
      return NextResponse.json(payments);
    }
    
  } catch (error) {
    console.error('获取支付记录失败:', error);
    return NextResponse.json(
      { error: '获取支付记录失败' },
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
    
    const paymentData = await request.json();
    console.log('Payments API - GraphQL 创建支付记录:', paymentData);
    
    const result = await executeGraphQLQuery(
      CREATE_PAYMENT_MUTATION, 
      { data: paymentData }, 
      authHeader
    );
    
    console.log('Payments API - GraphQL 成功创建支付记录');
    return NextResponse.json(result.data?.create_payments_item);
    
  } catch (error) {
    console.error('创建支付记录失败:', error);
    return NextResponse.json(
      { error: '创建支付记录失败' },
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
    const paymentId = searchParams.get('id');
    
    if (!paymentId) {
      return NextResponse.json(
        { error: '支付ID必需' },
        { status: 400 }
      );
    }
    
    const updateData = await request.json();
    console.log(`Payments API - GraphQL 更新支付记录 ${paymentId}:`, updateData);
    
    const result = await executeGraphQLQuery(
      UPDATE_PAYMENT_MUTATION, 
      { id: paymentId, data: updateData }, 
      authHeader
    );
    
    console.log('Payments API - GraphQL 成功更新支付记录');
    return NextResponse.json(result.data?.update_payments_item);
    
  } catch (error) {
    console.error('更新支付记录失败:', error);
    return NextResponse.json(
      { error: '更新支付记录失败' },
      { status: 500 }
    );
  }
}
