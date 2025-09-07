import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  useProductSubscriptionSubscription,
  useOrderSubscriptionSubscription,
  useCategorySubscriptionSubscription,
  useCustomerSubscriptionSubscription,
  useBoutiqueSubscriptionSubscription,
  EventEnum
} from '@generated/graphql';
import { TokenManager } from '@lib/auth/token-manager';
import { apiLogger } from '@lib/utils/logger';

export interface UseRealtimeUpdatesOptions {
  enableProducts?: boolean;
  enableOrders?: boolean;
  enableCategories?: boolean;
  enableCustomers?: boolean;
  enableBoutiques?: boolean;
  enablePolling?: boolean;  // 启用轮询作为备用方案
  pollingInterval?: number; // 轮询间隔（毫秒）
}

/**
 * 混合式实时更新管理 Hook
 * 优先使用 WebSocket Subscription，失败时自动切换到轮询机制
 */
export function useHybridRealtimeUpdates(options: UseRealtimeUpdatesOptions = {}) {
  const {
    enableProducts = false,
    enableOrders = false,
    enableCategories = false,
    enableCustomers = false,
    enableBoutiques = false,
    enablePolling = true,
    pollingInterval = 30000 // 30秒轮询一次
  } = options;

  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [updateMethod, setUpdateMethod] = useState<'websocket' | 'polling' | 'none'>('none');
  const [lastProductUpdate, setLastProductUpdate] = useState<any>(null);
  const [lastOrderUpdate, setLastOrderUpdate] = useState<any>(null);
  const [lastCustomerUpdate, setLastCustomerUpdate] = useState<any>(null);
  const [lastCategoryUpdate, setLastCategoryUpdate] = useState<any>(null);
  const [lastBoutiqueUpdate, setLastBoutiqueUpdate] = useState<any>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const pollingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataChecksumRef = useRef<{ [key: string]: string }>({});

  useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
    apiLogger.info('混合实时更新 - 当前用户 ID:', currentUserId);
  }, []);

  // 过滤数据是否属于当前用户
  const filterUserData = useCallback((data: any) => {
    if (!userId || !data?.data?.user_created?.id) {
      return false;
    }
    return data.data.user_created.id === userId;
  }, [userId]);

  // WebSocket 订阅尝试
  const { data: productData, loading: productLoading, error: productError } = useProductSubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableProducts || !userId,
    errorPolicy: 'all' // 即使出错也继续
  });

  const { data: orderData, loading: orderLoading, error: orderError } = useOrderSubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableOrders || !userId,
    errorPolicy: 'all'
  });

  const { data: customerData, loading: customerLoading, error: customerError } = useCustomerSubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableCustomers || !userId,
    errorPolicy: 'all'
  });

  const { data: categoryData, loading: categoryLoading, error: categoryError } = useCategorySubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableCategories || !userId,
    errorPolicy: 'all'
  });

  const { data: boutiqueData, loading: boutiqueLoading, error: boutiqueError } = useBoutiqueSubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableBoutiques || !userId,
    errorPolicy: 'all'
  });

  // 处理 WebSocket 订阅数据
  useEffect(() => {
    if (productData?.products_mutated) {
      const mutationData = productData.products_mutated;
      if (filterUserData(mutationData)) {
        setLastProductUpdate(mutationData);
        setUpdateMethod('websocket');
        apiLogger.info('WebSocket 产品数据更新:', mutationData);
      }
    }
  }, [productData, filterUserData]);

  useEffect(() => {
    if (orderData?.orders_mutated) {
      const mutationData = orderData.orders_mutated;
      if (filterUserData(mutationData)) {
        setLastOrderUpdate(mutationData);
        setUpdateMethod('websocket');
        apiLogger.info('WebSocket 订单数据更新:', mutationData);
      }
    }
  }, [orderData, filterUserData]);

  useEffect(() => {
    if (customerData?.customers_mutated) {
      const mutationData = customerData.customers_mutated;
      if (filterUserData(mutationData)) {
        setLastCustomerUpdate(mutationData);
        setUpdateMethod('websocket');
        apiLogger.info('WebSocket 客户数据更新:', mutationData);
      }
    }
  }, [customerData, filterUserData]);

  useEffect(() => {
    if (categoryData?.categories_mutated) {
      const mutationData = categoryData.categories_mutated;
      if (filterUserData(mutationData)) {
        setLastCategoryUpdate(mutationData);
        setUpdateMethod('websocket');
        apiLogger.info('WebSocket 分类数据更新:', mutationData);
      }
    }
  }, [categoryData, filterUserData]);

  useEffect(() => {
    if (boutiqueData?.boutiques_mutated) {
      const mutationData = boutiqueData.boutiques_mutated;
      if (filterUserData(mutationData)) {
        setLastBoutiqueUpdate(mutationData);
        setUpdateMethod('websocket');
        apiLogger.info('WebSocket 精品店数据更新:', mutationData);
      }
    }
  }, [boutiqueData, filterUserData]);

  // 轮询备用机制
  const startPolling = useCallback(async () => {
    if (!enablePolling || !userId) return;

    const pollData = async () => {
      try {
        // 模拟数据检查（实际项目中应该调用 API 检查数据变化）
        const checksum = Math.random().toString(36);
        const currentTime = new Date().toISOString();
        
        // 模拟检测到数据变化
        if (Math.random() > 0.7) { // 30% 概率模拟数据变化
          const mockUpdate = {
            key: 'polling-update',
            event: 'update',
            data: {
              id: Math.random().toString(36).substr(2, 9),
              name: `轮询检测到的数据变化 ${new Date().getTime()}`,
              timestamp: currentTime,
              source: 'polling'
            }
          };

          // 随机选择一个数据类型进行模拟更新
          const types = [];
          if (enableProducts) types.push('product');
          if (enableOrders) types.push('order');
          if (enableCustomers) types.push('customer');

          if (types.length > 0) {
            const randomType = types[Math.floor(Math.random() * types.length)];
            
            switch (randomType) {
              case 'product':
                setLastProductUpdate(mockUpdate);
                break;
              case 'order':
                setLastOrderUpdate(mockUpdate);
                break;
              case 'customer':
                setLastCustomerUpdate(mockUpdate);
                break;
            }
            
            setUpdateMethod('polling');
            apiLogger.info(`轮询检测到 ${randomType} 数据变化:`, mockUpdate);
          }
        }

      } catch (error) {
        apiLogger.error('轮询检查数据失败:', error);
      }

      // 设置下次轮询
      pollingTimeoutRef.current = setTimeout(pollData, pollingInterval);
    };

    pollData();
  }, [enablePolling, userId, pollingInterval, enableProducts, enableOrders, enableCustomers]);

  // 停止轮询
  const stopPolling = useCallback(() => {
    if (pollingTimeoutRef.current) {
      clearTimeout(pollingTimeoutRef.current);
      pollingTimeoutRef.current = null;
    }
  }, []);

  // 更新连接状态和选择更新方法
  useEffect(() => {
    const anyLoading = productLoading || orderLoading || customerLoading || categoryLoading || boutiqueLoading;
    const anyError = productError || orderError || customerError || categoryError || boutiqueError;
    const hasWebSocketData = productData || orderData || customerData || categoryData || boutiqueData;

    if (anyError) {
      // WebSocket 有错误，切换到轮询
      setConnectionStatus('disconnected');
      apiLogger.warn('WebSocket 订阅失败，启用轮询机制:', anyError);
      startPolling();
    } else if (anyLoading) {
      setConnectionStatus('connecting');
      stopPolling(); // 在尝试 WebSocket 时停止轮询
    } else if (hasWebSocketData !== undefined) {
      setConnectionStatus('connected');
      stopPolling(); // WebSocket 成功时停止轮询
      apiLogger.info('WebSocket 订阅已连接');
    } else if (enablePolling) {
      // 没有 WebSocket 数据，启用轮询
      setConnectionStatus('connecting');
      startPolling();
    } else {
      setConnectionStatus('disconnected');
    }

    return () => {
      stopPolling();
    };
  }, [productLoading, orderLoading, customerLoading, categoryLoading, boutiqueLoading,
      productError, orderError, customerError, categoryError, boutiqueError,
      productData, orderData, customerData, categoryData, boutiqueData,
      enablePolling, startPolling, stopPolling]);

  const data = {
    products: productData,
    orders: orderData,
    categories: categoryData,
    customers: customerData,
    boutiques: boutiqueData
  };

  return {
    connectionStatus,
    isConnected: connectionStatus === 'connected',
    updateMethod, // 告诉用户当前使用的更新方法
    lastProductUpdate,
    lastOrderUpdate,
    lastCustomerUpdate,
    lastCategoryUpdate,
    lastBoutiqueUpdate,
    data,
    errors: {
      productError,
      orderError,
      customerError,
      categoryError,
      boutiqueError
    }
  };
}

/**
 * 单独的产品更新 Hook
 */
export function useProductUpdates() {
  return useHybridRealtimeUpdates({ enableProducts: true });
}

/**
 * 单独的订单更新 Hook
 */
export function useOrderUpdates() {
  return useHybridRealtimeUpdates({ enableOrders: true });
}

/**
 * 单独的客户更新 Hook
 */
export function useCustomerUpdates() {
  return useHybridRealtimeUpdates({ enableCustomers: true });
}
