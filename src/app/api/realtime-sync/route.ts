import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// 存储所有活跃的连接
const connections = new Map<string, ReadableStreamDefaultController>();

// 数据变更事件存储
const dataChanges = new Map<string, any>();

export async function GET(request: NextRequest) {
  // 设置 SSE 响应头
  const responseHeaders = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  const searchParams = request.nextUrl.searchParams;
  const clientId = searchParams.get('clientId') || Math.random().toString(36).substr(2, 9);
  const userId = searchParams.get('userId');
  
  console.log(`SSE 连接建立: clientId=${clientId}, userId=${userId}`);

  // 创建可读流
  const stream = new ReadableStream({
    start(controller) {
      // 保存连接
      connections.set(clientId, controller);
      
      // 发送连接成功消息
      controller.enqueue(`data: ${JSON.stringify({
        type: 'connected',
        clientId,
        timestamp: new Date().toISOString(),
        message: 'SSE 连接已建立'
      })}\n\n`);

      // 发送心跳保持连接
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(`data: ${JSON.stringify({
            type: 'heartbeat',
            timestamp: new Date().toISOString()
          })}\n\n`);
        } catch (error) {
          console.log(`心跳发送失败，清理连接: ${clientId}`);
          clearInterval(heartbeat);
          connections.delete(clientId);
        }
      }, 30000); // 30秒心跳

      // 处理连接关闭
      request.signal.addEventListener('abort', () => {
        console.log(`SSE 连接关闭: ${clientId}`);
        clearInterval(heartbeat);
        connections.delete(clientId);
        try {
          controller.close();
        } catch (error) {
          // 连接已关闭
        }
      });
    },
    
    cancel() {
      console.log(`SSE 连接取消: ${clientId}`);
      connections.delete(clientId);
    }
  });

  return new Response(stream, {
    headers: responseHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data, userId, clientId } = body;
    
    console.log(`收到数据变更: type=${type}, userId=${userId}, clientId=${clientId}`);
    
    // 创建变更事件
    const changeEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      data,
      userId,
      sourceClientId: clientId,
      timestamp: new Date().toISOString()
    };

    // 广播给所有其他连接（除了发送者）
    let broadcastCount = 0;
    for (const [connId, controller] of connections.entries()) {
      if (connId !== clientId) { // 不发送给发送者自己
        try {
          controller.enqueue(`data: ${JSON.stringify({
            type: 'dataChange',
            event: changeEvent
          })}\n\n`);
          broadcastCount++;
        } catch (error) {
          console.log(`广播失败，移除连接: ${connId}`);
          connections.delete(connId);
        }
      }
    }

    console.log(`数据变更已广播给 ${broadcastCount} 个连接`);

    return NextResponse.json({ 
      success: true, 
      broadcastCount,
      activeConnections: connections.size,
      changeEvent 
    });
    
  } catch (error) {
    console.error('处理数据变更失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : '未知错误' 
    }, { status: 500 });
  }
}

// 获取当前活跃连接数
export async function OPTIONS() {
  return NextResponse.json({
    activeConnections: connections.size,
    connectionIds: Array.from(connections.keys())
  });
}
