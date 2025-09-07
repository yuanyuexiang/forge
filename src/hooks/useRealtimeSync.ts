import { useState, useEffect, useRef, useCallback } from 'react';
import { TokenManager } from '@lib/auth/token-manager';
import { apiLogger } from '@lib/utils/logger';

export interface RealtimeSyncOptions {
  enableSync?: boolean;
  dataTypes?: string[];
}

export interface DataChangeEvent {
  id: string;
  type: string;
  data: any;
  userId: string;
  sourceClientId: string;
  timestamp: string;
}

/**
 * 基于 Server-Sent Events (SSE) 的跨浏览器实时同步 Hook
 * 适用于云端部署环境，提供可靠的跨浏览器数据同步
 */
export function useRealtimeSync(options: RealtimeSyncOptions = {}) {
  const {
    enableSync = true,
    dataTypes = ['products', 'orders', 'customers', 'categories']
  } = options;

  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [lastDataChange, setLastDataChange] = useState<DataChangeEvent | null>(null);
  const [activeConnections, setActiveConnections] = useState(0);
  const [clientId] = useState(() => Math.random().toString(36).substr(2, 9));
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const currentUserId = TokenManager.getCurrentUserId();
    setUserId(currentUserId);
  }, []);

  // 连接到 SSE 服务
  const connect = useCallback(() => {
    if (!enableSync || !userId) return;

    try {
      setConnectionStatus('connecting');
      apiLogger.info('建立 SSE 连接...', { clientId, userId });

      const url = `/api/realtime-sync?clientId=${clientId}&userId=${userId}`;
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setConnectionStatus('connected');
        apiLogger.info('SSE 连接已建立', { clientId });
        
        // 清除重连定时器
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
      };

      eventSource.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          apiLogger.info('收到 SSE 消息:', message);

          switch (message.type) {
            case 'connected':
              apiLogger.info('SSE 连接确认:', message);
              break;
              
            case 'heartbeat':
              // 心跳消息，保持连接活跃
              break;
              
            case 'dataChange':
              const changeEvent = message.event as DataChangeEvent;
              
              // 只处理相关数据类型的变更
              if (dataTypes.includes(changeEvent.type)) {
                setLastDataChange(changeEvent);
                apiLogger.info('收到数据变更:', changeEvent);
                
                // 触发自定义事件，其他组件可以监听
                window.dispatchEvent(new CustomEvent('realtimeDataChange', {
                  detail: changeEvent
                }));
              }
              break;
              
            default:
              apiLogger.warn('未知的 SSE 消息类型:', message);
          }
        } catch (error) {
          apiLogger.error('解析 SSE 消息失败:', error);
        }
      };

      eventSource.onerror = (error) => {
        apiLogger.error('SSE 连接错误:', error);
        setConnectionStatus('disconnected');
        
        // 自动重连
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
        
        // 3秒后重连
        reconnectTimeoutRef.current = setTimeout(() => {
          apiLogger.info('尝试重新连接 SSE...');
          connect();
        }, 3000);
      };

    } catch (error) {
      apiLogger.error('建立 SSE 连接失败:', error);
      setConnectionStatus('disconnected');
    }
  }, [enableSync, userId, clientId, dataTypes]);

  // 断开连接
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    setConnectionStatus('disconnected');
    apiLogger.info('SSE 连接已断开');
  }, []);

  // 发送数据变更通知
  const notifyDataChange = useCallback(async (type: string, data: any) => {
    if (!enableSync || !userId || connectionStatus !== 'connected') {
      apiLogger.warn('无法发送数据变更通知:', { enableSync, userId, connectionStatus });
      return false;
    }

    try {
      const response = await fetch('/api/realtime-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          userId,
          clientId
        })
      });

      const result = await response.json();
      
      if (result.success) {
        apiLogger.info('数据变更通知已发送:', { type, broadcastCount: result.broadcastCount });
        setActiveConnections(result.activeConnections);
        return true;
      } else {
        apiLogger.error('发送数据变更通知失败:', result.error);
        return false;
      }
    } catch (error) {
      apiLogger.error('发送数据变更通知异常:', error);
      return false;
    }
  }, [enableSync, userId, clientId, connectionStatus]);

  // 获取活跃连接数
  const getConnectionInfo = useCallback(async () => {
    try {
      const response = await fetch('/api/realtime-sync', {
        method: 'OPTIONS'
      });
      const info = await response.json();
      setActiveConnections(info.activeConnections);
      return info;
    } catch (error) {
      apiLogger.error('获取连接信息失败:', error);
      return null;
    }
  }, []);

  // 自动连接和清理
  useEffect(() => {
    if (enableSync && userId) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [enableSync, userId, connect, disconnect]);

  return {
    connectionStatus,
    isConnected: connectionStatus === 'connected',
    clientId,
    userId,
    lastDataChange,
    activeConnections,
    notifyDataChange,
    getConnectionInfo,
    connect,
    disconnect
  };
}

// 便捷的数据类型特定 hooks
export function useProductSync() {
  return useRealtimeSync({ dataTypes: ['products'] });
}

export function useOrderSync() {
  return useRealtimeSync({ dataTypes: ['orders'] });
}

export function useCustomerSync() {
  return useRealtimeSync({ dataTypes: ['customers'] });
}
