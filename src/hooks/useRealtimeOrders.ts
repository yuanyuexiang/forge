import { useEffect, useState, useCallback, useRef } from 'react';
import { message } from 'antd';
import { 
  useGetUserOrdersQuery,
  useOrdersRealtimeSubscription,
  GetUserOrdersQuery 
} from '@generated/graphql';
import { TokenManager } from '@lib/auth';
import { wsStatus } from '@lib/api/websocket-status';

// 订单类型定义
type Order = GetUserOrdersQuery['orders'][0];

// 统计数据接口
export interface OrderStatistics {
  totalOrders: number;
  totalAmount: number;
  pendingOrders: number;
  completedOrders: number;
  todayOrders: number;
  todayAmount: number;
}

// Hook 返回值接口
interface UseRealtimeOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: any;
  statistics: OrderStatistics;
  refetch: () => void;
  connected: boolean;
}

/**
 * 实时订单 Hook
 * 功能：
 * 1. 获取当前用户所有授权店铺的订单
 * 2. 订阅实时订单变化
 * 3. 自动合并和更新订单数据
 * 4. 计算实时统计数据
 * 5. 播放新订单提示音
 */
export const useRealtimeOrders = (
  enableSound: boolean = true
): UseRealtimeOrdersReturn => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [connected, setConnected] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 获取当前用户ID
  const userId = TokenManager.getCurrentUserId();

  // 查询用户所有授权店铺的订单（通过用户ID过滤）
  const { 
    data: queryData, 
    loading: queryLoading, 
    error: queryError,
    refetch 
  } = useGetUserOrdersQuery({
    variables: { userId: userId || '' },
    skip: !userId, // 如果没有用户ID，跳过查询
    fetchPolicy: 'cache-and-network', // 优化加载体验：先用缓存，再请求网络
    nextFetchPolicy: 'cache-first', // 后续请求优先使用缓存
    onCompleted: (data) => {
      console.log('✅ 订单数据加载完成:', data);
    },
    onError: (error) => {
      console.error('❌ 订单数据加载失败:', error);
    }
  });

  // 订阅实时订单变化
  const { 
    data: subscriptionData, 
    loading: subscriptionLoading,
    error: subscriptionError 
  } = useOrdersRealtimeSubscription({
    skip: typeof window === 'undefined', // 仅在浏览器环境启用
    onData: (options) => {
      console.log('🔔 订阅收到数据:', options.data);
      // 订阅活跃且接收到数据，表示连接正常
      setConnected(true);
    },
    onError: (error) => {
      console.error('❌ 订阅错误:', error);
      setConnected(false);
    }
  });

  // 初始化音频
  useEffect(() => {
    if (typeof window !== 'undefined' && enableSound) {
      audioRef.current = new Audio('/sounds/notification.mp3');
      audioRef.current.volume = 0.5;
    }
  }, [enableSound]);

  // 监听订阅状态变化
  useEffect(() => {
    console.log('🔍 订阅状态:', { 
      subscriptionLoading, 
      subscriptionError: subscriptionError?.message,
      hasData: !!subscriptionData,
      isBrowser: typeof window !== 'undefined'
    });

    // 如果订阅不在加载中且没有错误，表示连接已建立
    if (!subscriptionLoading && !subscriptionError && typeof window !== 'undefined') {
      console.log('✅ WebSocket 订阅已建立');
      setConnected(true);
    }
    
    // 如果有订阅错误，设置为断开
    if (subscriptionError) {
      console.error('❌ 订阅连接失败:', subscriptionError);
      setConnected(false);
    }
  }, [subscriptionLoading, subscriptionError, subscriptionData]);

  // 监听全局 WebSocket 连接状态
  useEffect(() => {
    const unsubscribe = wsStatus.subscribe((status) => {
      console.log('📡 全局 WebSocket 状态更新:', status);
      setConnected(status === 'connected');
    });

    return unsubscribe;
  }, []);

  // 播放提示音
  const playNotificationSound = useCallback(() => {
    if (enableSound && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.warn('播放提示音失败:', error);
      });
    }
  }, [enableSound]);

  // 初始化订单列表
  useEffect(() => {
    if (queryData?.orders) {
      setOrders(queryData.orders as Order[]);
    }
  }, [queryData]);

  // 处理实时订单变化
  useEffect(() => {
    if (!subscriptionData?.orders_mutated) return;

    const { event, data, key } = subscriptionData.orders_mutated;

    // 订阅数据会自动根据用户权限过滤，无需前端过滤

    setOrders(prevOrders => {
      let newOrders = [...prevOrders];
      const orderId = key || data?.id;

      switch (event) {
        case 'create':
          // 新订单
          if (data && !newOrders.find(o => o.id === data.id)) {
            newOrders = [data as Order, ...newOrders];
            
            // 显示通知
            message.success({
              content: `新订单: ${data.customer?.nick_name || '未知客户'} (${data.boutique?.name || '未知店铺'}) - ¥${data.total_price}`,
              duration: 5,
            });
            
            // 播放提示音
            playNotificationSound();
          }
          break;

        case 'update':
          // 更新订单
          if (data) {
            const index = newOrders.findIndex(o => o.id === data.id);
            if (index !== -1) {
              newOrders[index] = data as Order;
              
              message.info({
                content: `订单已更新: ${data.customer?.nick_name || data.id}`,
                duration: 3,
              });
            }
          }
          break;

        case 'delete':
          // 删除订单
          newOrders = newOrders.filter(o => o.id !== orderId);
          
          message.warning({
            content: `订单已删除: ${orderId}`,
            duration: 3,
          });
          break;

        default:
          break;
      }

      return newOrders;
    });
  }, [subscriptionData, playNotificationSound]);

  // 计算统计数据
  const statistics: OrderStatistics = {
    totalOrders: orders.length,
    totalAmount: orders.reduce((sum, order) => sum + (order.total_price || 0), 0),
    pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    todayOrders: orders.filter(o => {
      const today = new Date();
      const orderDate = new Date(o.date_created);
      return orderDate.toDateString() === today.toDateString();
    }).length,
    todayAmount: orders
      .filter(o => {
        const today = new Date();
        const orderDate = new Date(o.date_created);
        return orderDate.toDateString() === today.toDateString();
      })
      .reduce((sum, order) => sum + (order.total_price || 0), 0),
  };

  return {
    orders,
    loading: queryLoading && !queryData, // 只有初次加载且没有数据时才显示 loading
    error: queryError || subscriptionError,
    statistics,
    refetch,
    connected,
  };
};
