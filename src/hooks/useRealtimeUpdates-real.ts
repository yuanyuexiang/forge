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
    skip: !enableProducts || !userId
  });

  useEffect(() => {
    if (productData?.products_mutated) {
      const mutationData = productData.products_mutated;
      apiLogger.info('收到产品订阅数据:', mutationData);
      
      if (filterUserData(mutationData)) {
        setLastProductUpdate(mutationData);
        apiLogger.info('产品数据已更新 - 当前用户:', mutationData);
      } else {
        apiLogger.info('产品数据更新 - 非当前用户，已忽略');
      }
    }
  }, [productData, filterUserData]);

  // 订单订阅
  const { data: orderData, loading: orderLoading, error: orderError } = useOrderSubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableOrders || !userId
  });

  useEffect(() => {
    if (orderData?.orders_mutated) {
      const mutationData = orderData.orders_mutated;
      apiLogger.info('收到订单订阅数据:', mutationData);
      
      if (filterUserData(mutationData)) {
        setLastOrderUpdate(mutationData);
        apiLogger.info('订单数据已更新 - 当前用户:', mutationData);
      } else {
        apiLogger.info('订单数据更新 - 非当前用户，已忽略');
      }
    }
  }, [orderData, filterUserData]);

  // 客户订阅
  const { data: customerData, loading: customerLoading, error: customerError } = useCustomerSubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableCustomers || !userId
  });

  useEffect(() => {
    if (customerData?.customers_mutated) {
      const mutationData = customerData.customers_mutated;
      apiLogger.info('收到客户订阅数据:', mutationData);
      
      if (filterUserData(mutationData)) {
        setLastCustomerUpdate(mutationData);
        apiLogger.info('客户数据已更新 - 当前用户:', mutationData);
      } else {
        apiLogger.info('客户数据更新 - 非当前用户，已忽略');
      }
    }
  }, [customerData, filterUserData]);

  // 分类订阅
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useCategorySubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableCategories || !userId
  });

  useEffect(() => {
    if (categoryData?.categories_mutated) {
      const mutationData = categoryData.categories_mutated;
      apiLogger.info('收到分类订阅数据:', mutationData);
      
      if (filterUserData(mutationData)) {
        setLastCategoryUpdate(mutationData);
        apiLogger.info('分类数据已更新 - 当前用户:', mutationData);
      } else {
        apiLogger.info('分类数据更新 - 非当前用户，已忽略');
      }
    }
  }, [categoryData, filterUserData]);

  // 精品店订阅
  const { data: boutiqueData, loading: boutiqueLoading, error: boutiqueError } = useBoutiqueSubscriptionSubscription({
    variables: { event: EventEnum.Update },
    skip: !enableBoutiques || !userId
  });

  useEffect(() => {
    if (boutiqueData?.boutiques_mutated) {
      const mutationData = boutiqueData.boutiques_mutated;
      apiLogger.info('收到精品店订阅数据:', mutationData);
      
      if (filterUserData(mutationData)) {
        setLastBoutiqueUpdate(mutationData);
        apiLogger.info('精品店数据已更新 - 当前用户:', mutationData);
      } else {
        apiLogger.info('精品店数据更新 - 非当前用户，已忽略');
      }
    }
  }, [boutiqueData, filterUserData]);

  // 更新连接状态
  useEffect(() => {
    const anyLoading = productLoading || orderLoading || customerLoading || categoryLoading || boutiqueLoading;
    const anyError = productError || orderError || customerError || categoryError || boutiqueError;
    const anyData = productData || orderData || customerData || categoryData || boutiqueData;

    if (anyError) {
      setConnectionStatus('disconnected');
      apiLogger.error('订阅连接错误:', { productError, orderError, customerError, categoryError, boutiqueError });
    } else if (anyLoading) {
      setConnectionStatus('connecting');
      apiLogger.info('订阅连接中...');
    } else if (anyData !== undefined) {
      setConnectionStatus('connected');
      apiLogger.info('订阅已连接');
    } else {
      setConnectionStatus('disconnected');
    }
  }, [productLoading, orderLoading, customerLoading, categoryLoading, boutiqueLoading,
      productError, orderError, customerError, categoryError, boutiqueError,
      productData, orderData, customerData, categoryData, boutiqueData]);

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
