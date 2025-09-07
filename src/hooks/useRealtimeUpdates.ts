import { useEffect, useState } from 'react';
import { useRealtimeSubscription } from './useSubscription';
import { 
  useProductSubscriptionSubscription,
  useOrderSubscriptionSubscription,
  useCategorySubscriptionSubscription,
  useCustomerSubscriptionSubscription,
  useBoutiqueSubscriptionSubscription,
  EventEnum
} from '@generated/graphql';
import { TokenManager } from '@lib/auth/token-manager';
import { message } from 'antd';

interface UseRealtimeUpdatesOptions {
  enableProducts?: boolean;
  enableOrders?: boolean;
  enableCategories?: boolean;
  enableCustomers?: boolean;
  enableBoutiques?: boolean;
  onProductUpdate?: (data: any) => void;
  onOrderUpdate?: (data: any) => void;
  onCategoryUpdate?: (data: any) => void;
  onCustomerUpdate?: (data: any) => void;
  onBoutiqueUpdate?: (data: any) => void;
}

/**
 * 统一的实时更新管理 Hook
 * 自动处理权限过滤和用户身份验证
 */
export function useRealtimeUpdates(options: UseRealtimeUpdatesOptions = {}) {
  const {
    enableProducts = true,
    enableOrders = true,
    enableCategories = true,
    enableCustomers = true,
    enableBoutiques = true,
    onProductUpdate,
    onOrderUpdate,
    onCategoryUpdate,
    onCustomerUpdate,
    onBoutiqueUpdate
  } = options;

  const [userId, setUserId] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [lastProductUpdate, setLastProductUpdate] = useState<any>(null);
  const [lastOrderUpdate, setLastOrderUpdate] = useState<any>(null);
  const [lastCategoryUpdate, setLastCategoryUpdate] = useState<any>(null);
  const [lastCustomerUpdate, setLastCustomerUpdate] = useState<any>(null);
  const [lastBoutiqueUpdate, setLastBoutiqueUpdate] = useState<any>(null);

  const [data, setData] = useState({
    products: null,
    orders: null,
    categories: null,
    customers: null,
    boutiques: null
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
