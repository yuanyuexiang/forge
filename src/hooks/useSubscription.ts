import { useSubscription as useApolloSubscription, SubscriptionHookOptions, OperationVariables } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { apiLogger } from '@lib/utils/logger';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export interface UseRealtimeSubscriptionOptions<TData, TVariables extends OperationVariables> {
  subscription: any;
  variables?: TVariables;
  onData?: (data: TData) => void;
  onError?: (error: Error) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  skip?: boolean;
}

/**
 * 基础订阅连接状态 Hook
 */
export function useSubscription() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');

  useEffect(() => {
    // 模拟连接状态，实际项目中需要监听WebSocket连接状态
    setConnectionStatus('connecting');
    
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    connectionStatus,
    isConnected: connectionStatus === 'connected'
  };
}

/**
 * 通用的实时订阅 Hook
 * 提供连接状态管理和错误处理
 */
export function useRealtimeSubscription<TData = any, TVariables extends OperationVariables = OperationVariables>(
  options: UseRealtimeSubscriptionOptions<TData, TVariables>
) {
  const {
    subscription,
    variables,
    onData,
    onError,
    onConnected,
    onDisconnected,
    skip = false
  } = options;

  const isConnectedRef = useRef(false);

  const { data, loading, error } = useApolloSubscription(subscription, {
    variables,
    skip,
    onSubscriptionData: ({ subscriptionData }: any) => {
      if (!isConnectedRef.current) {
        isConnectedRef.current = true;
        onConnected?.();
        apiLogger.info('Subscription connected');
      }

      if (subscriptionData.data && onData) {
        onData(subscriptionData.data);
      }
    },
    onError: (err: any) => {
      apiLogger.error('Subscription error:', err);
      if (isConnectedRef.current) {
        isConnectedRef.current = false;
        onDisconnected?.();
      }
      onError?.(err);
    },
  });

  useEffect(() => {
    return () => {
      if (isConnectedRef.current) {
        isConnectedRef.current = false;
        onDisconnected?.();
        apiLogger.info('Subscription disconnected');
      }
    };
  }, [onDisconnected]);

  return {
    data,
    loading,
    error,
    isConnected: isConnectedRef.current,
  };
}
