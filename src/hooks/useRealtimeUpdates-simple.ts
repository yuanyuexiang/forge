import { useState, useEffect } from 'react';
import { useSubscription } from './useSubscription';

export interface UseRealtimeUpdatesOptions {
  enableProducts?: boolean;
  enableOrders?: boolean;
  enableCategories?: boolean;
  enableCustomers?: boolean;
  enableBoutiques?: boolean;
}

/**
 * 简化的实时更新管理 Hook
 * 用于测试和演示 GraphQL Subscription 功能
 */
export function useRealtimeUpdates(options: UseRealtimeUpdatesOptions = {}) {
  const { connectionStatus } = useSubscription();
  
  const [lastProductUpdate, setLastProductUpdate] = useState<any>(null);
  const [lastOrderUpdate, setLastOrderUpdate] = useState<any>(null);
  const [lastCustomerUpdate, setLastCustomerUpdate] = useState<any>(null);
  const [lastCategoryUpdate, setLastCategoryUpdate] = useState<any>(null);
  const [lastBoutiqueUpdate, setLastBoutiqueUpdate] = useState<any>(null);

  const [data] = useState({
    products: null,
    orders: null,
    categories: null,
    customers: null,
    boutiques: null
  });

  // 模拟数据更新，用于测试
  useEffect(() => {
    if (connectionStatus === 'connected') {
      const interval = setInterval(() => {
        // 随机生成一些测试数据更新
        const randomUpdate = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
          event: 'update',
          data: {
            title: `测试数据 ${new Date().getTime()}`,
            status: 'updated'
          }
        };

        // 随机选择一个数据类型进行更新
        const updateTypes = ['product', 'order', 'customer'];
        const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
        
        switch (randomType) {
          case 'product':
            setLastProductUpdate({ ...randomUpdate, type: 'product' });
            break;
          case 'order':
            setLastOrderUpdate({ ...randomUpdate, type: 'order' });
            break;
          case 'customer':
            setLastCustomerUpdate({ ...randomUpdate, type: 'customer' });
            break;
        }
      }, 5000); // 每5秒模拟一次更新

      return () => clearInterval(interval);
    }
  }, [connectionStatus]);

  return {
    connectionStatus,
    isConnected: connectionStatus === 'connected',
    lastProductUpdate,
    lastOrderUpdate,
    lastCustomerUpdate,
    lastCategoryUpdate,
    lastBoutiqueUpdate,
    data
  };
}

/**
 * 单独的产品更新 Hook
 */
export function useProductUpdates() {
  return useRealtimeUpdates({ enableProducts: true });
}

/**
 * 单独的订单更新 Hook
 */
export function useOrderUpdates() {
  return useRealtimeUpdates({ enableOrders: true });
}

/**
 * 单独的客户更新 Hook
 */
export function useCustomerUpdates() {
  return useRealtimeUpdates({ enableCustomers: true });
}
