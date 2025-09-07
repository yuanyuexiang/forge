import { useState, useEffect, useCallback } from 'react';
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
}

/**
 * 真正的实时更新管理 Hook
 * 连接到 Directus WebSocket Subscription
 */
export function useRealtimeUpdates(options: UseRealtimeUpdatesOptions = {}) {
  const {
    enableProducts = false,
    enableOrders = false,
    enableCategories = false,
    enableCustomers = false,
    enableBoutiques = false
  } = options;

  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [lastProductUpdate, setLastProductUpdate] = useState<any>(null);
  const [lastOrderUpdate, setLastOrderUpdate] = useState<any>(null);
  const [lastCustomerUpdate, setLastCustomerUpdate] = useState<any>(null);
  const [lastCategoryUpdate, setLastCategoryUpdate] = useState<any>(null);
  const [lastBoutiqueUpdate, setLastBoutiqueUpdate] = useState<any>(null);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
    apiLogger.info('当前用户 ID:', currentUserId);
  }, []);

  // 过滤数据是否属于当前用户
  const filterUserData = useCallback((data: any) => {
    if (!userId || !data?.data?.user_created?.id) {
      apiLogger.warn('无法过滤用户数据:', { userId, data });
      return false;
    }
    const belongsToUser = data.data.user_created.id === userId;
    apiLogger.info('数据用户过滤:', { belongsToUser, currentUserId: userId, dataUserId: data.data.user_created.id });
    return belongsToUser;
  }, [userId]);

  // 产品订阅
  const { data: productData, loading: productLoading, error: productError } = useProductSubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableProducts || !userId,
    onSubscriptionData: ({ subscriptionData }) => {
      apiLogger.info('收到产品订阅数据:', subscriptionData);
      if (subscriptionData.data?.products_mutated) {
        const mutationData = subscriptionData.data.products_mutated;
        
        if (filterUserData(mutationData)) {
          setLastProductUpdate(mutationData);
          apiLogger.info('产品数据已更新 - 当前用户:', mutationData);
        } else {
          apiLogger.info('产品数据更新 - 非当前用户，已忽略');
        }
      }
    },
    onSubscriptionComplete: () => {
      apiLogger.info('产品订阅完成');
      setConnectionStatus('disconnected');
    },
    onError: (error) => {
      apiLogger.error('产品订阅错误:', error);
      setConnectionStatus('disconnected');
    }
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
  }, []);

  // 过滤数据是否属于当前用户
  const filterUserData = (data: any) => {
    if (!userId || !data?.data?.user_created?.id) return false;
    return data.data.user_created.id === userId;
  };

  // 产品订阅
  const { data: productData, isConnected: productConnected } = useRealtimeSubscription({
    subscription: useProductSubscriptionSubscription,
    variables: { event: EventEnum.Update },
    skip: !enableProducts || !userId,
    onData: (data) => {
      if (filterUserData(data.products_mutated) && onProductUpdate) {
        onProductUpdate(data.products_mutated);
        message.info('产品数据已更新');
      }
    },
    onConnected: () => {
      console.log('产品订阅已连接');
    },
    onError: (error) => {
      console.error('产品订阅错误:', error);
    }
  });

  // 订单订阅
  const { data: orderData, isConnected: orderConnected } = useRealtimeSubscription({
    subscription: useOrderSubscriptionSubscription,
    variables: { event: EventEnum.Update },
    skip: !enableOrders || !userId,
    onData: (data) => {
      if (filterUserData(data.orders_mutated) && onOrderUpdate) {
        onOrderUpdate(data.orders_mutated);
        message.info('订单数据已更新');
      }
    },
    onConnected: () => {
      console.log('订单订阅已连接');
    },
    onError: (error) => {
      console.error('订单订阅错误:', error);
    }
  });

  // 分类订阅
  const { data: categoryData, isConnected: categoryConnected } = useRealtimeSubscription({
    subscription: useCategorySubscriptionSubscription,
    variables: { event: EventEnum.Update },
    skip: !enableCategories || !userId,
    onData: (data) => {
      if (filterUserData(data.categories_mutated) && onCategoryUpdate) {
        onCategoryUpdate(data.categories_mutated);
        message.info('分类数据已更新');
      }
    },
    onConnected: () => {
      console.log('分类订阅已连接');
    },
    onError: (error) => {
      console.error('分类订阅错误:', error);
    }
  });

  // 客户订阅
  const { data: customerData, isConnected: customerConnected } = useRealtimeSubscription({
    subscription: useCustomerSubscriptionSubscription,
    variables: { event: EventEnum.Update },
    skip: !enableCustomers || !userId,
    onData: (data) => {
      if (filterUserData(data.customers_mutated) && onCustomerUpdate) {
        onCustomerUpdate(data.customers_mutated);
        message.info('客户数据已更新');
      }
    },
    onConnected: () => {
      console.log('客户订阅已连接');
    },
    onError: (error) => {
      console.error('客户订阅错误:', error);
    }
  });

  // 精品店订阅
  const { data: boutiqueData, isConnected: boutiqueConnected } = useRealtimeSubscription({
    subscription: useBoutiqueSubscriptionSubscription,
    variables: { event: EventEnum.Update },
    skip: !enableBoutiques || !userId,
    onData: (data) => {
      if (filterUserData(data.boutiques_mutated) && onBoutiqueUpdate) {
        onBoutiqueUpdate(data.boutiques_mutated);
        message.info('精品店数据已更新');
      }
    },
    onConnected: () => {
      console.log('精品店订阅已连接');
    },
    onError: (error) => {
      console.error('精品店订阅错误:', error);
    }
  });

  // 更新连接状态
  useEffect(() => {
    const anyEnabled = enableProducts || enableOrders || enableCategories || enableCustomers || enableBoutiques;
    const anyConnected = productConnected || orderConnected || categoryConnected || customerConnected || boutiqueConnected;
    
    if (!anyEnabled) {
      setConnectionStatus('disconnected');
    } else if (anyConnected) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('connecting');
    }
  }, [enableProducts, enableOrders, enableCategories, enableCustomers, enableBoutiques, 
      productConnected, orderConnected, categoryConnected, customerConnected, boutiqueConnected]);

  return {
    connectionStatus,
    isConnected: connectionStatus === 'connected',
    data: {
      products: productData,
      orders: orderData,
      categories: categoryData,
      customers: customerData,
      boutiques: boutiqueData
    }
  };
}
