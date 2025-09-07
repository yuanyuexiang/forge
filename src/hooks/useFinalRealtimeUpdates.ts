import { useState, useEffect, useCallback } from 'react';
import { useHybridRealtimeUpdates } from './useHybridRealtimeUpdates';
import { useRealtimeSync } from './useRealtimeSync';
import { apiLogger } from '@lib/utils/logger';

export interface FinalRealtimeOptions {
  enableWebSocket?: boolean;
  enableSSE?: boolean;
  enablePolling?: boolean;
  dataTypes?: string[];
  pollingInterval?: number;
}

export interface RealtimeStatus {
  method: 'websocket' | 'sse' | 'polling' | 'none';
  isConnected: boolean;
  activeConnections: number;
  lastUpdate: Date | null;
  errorCount: number;
}

/**
 * 最终的实时更新 Hook，整合 WebSocket、SSE 和轮询三种方式
 * 提供最可靠的跨浏览器实时数据同步解决方案
 */
export function useFinalRealtimeUpdates(options: FinalRealtimeOptions = {}) {
  const {
    enableWebSocket = true,
    enableSSE = true,
    enablePolling = true,
    dataTypes = ['products', 'orders', 'customers', 'categories'],
    pollingInterval = 30000
  } = options;

  const [currentMethod, setCurrentMethod] = useState<'websocket' | 'sse' | 'polling' | 'none'>('none');
  const [errorCount, setErrorCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // WebSocket + 轮询混合方案
  const hybridUpdates = useHybridRealtimeUpdates({
    enableProducts: dataTypes.includes('products'),
    enableOrders: dataTypes.includes('orders'),
    enableCategories: dataTypes.includes('categories'),
    enableCustomers: dataTypes.includes('customers'),
    enableBoutiques: dataTypes.includes('boutiques'),
    enablePolling,
    pollingInterval
  });

  // SSE 方案
  const sseSync = useRealtimeSync({
    enableSync: enableSSE,
    dataTypes
  });

  // 确定当前使用的方法
  useEffect(() => {
    if (enableWebSocket && hybridUpdates.connectionStatus === 'connected') {
      setCurrentMethod('websocket');
    } else if (enableSSE && sseSync.isConnected) {
      setCurrentMethod('sse');
    } else if (enablePolling && hybridUpdates.updateMethod === 'polling') {
      setCurrentMethod('polling');
    } else {
      setCurrentMethod('none');
    }
  }, [
    enableWebSocket, 
    enableSSE, 
    enablePolling,
    hybridUpdates.connectionStatus,
    hybridUpdates.updateMethod,
    sseSync.isConnected
  ]);

  // 监听数据变化
  useEffect(() => {
    const anyUpdate = hybridUpdates.lastProductUpdate || 
                     hybridUpdates.lastOrderUpdate || 
                     hybridUpdates.lastCustomerUpdate || 
                     hybridUpdates.lastCategoryUpdate || 
                     hybridUpdates.lastBoutiqueUpdate;
    
    if (anyUpdate) {
      setLastUpdate(new Date());
      apiLogger.info('通过混合方式收到数据更新:', anyUpdate);
    }
  }, [
    hybridUpdates.lastProductUpdate,
    hybridUpdates.lastOrderUpdate,
    hybridUpdates.lastCustomerUpdate,
    hybridUpdates.lastCategoryUpdate,
    hybridUpdates.lastBoutiqueUpdate
  ]);

  useEffect(() => {
    if (sseSync.lastDataChange) {
      setLastUpdate(new Date());
      apiLogger.info('通过 SSE 收到数据更新:', sseSync.lastDataChange);
    }
  }, [sseSync.lastDataChange]);

  // 错误计数
  useEffect(() => {
    const errorCount = Object.values(hybridUpdates.errors).filter(err => err).length;
    if (errorCount > 0) {
      setErrorCount(prev => prev + errorCount);
    }
  }, [hybridUpdates.errors]);

  // 发送数据变更通知
  const notifyDataChange = useCallback(async (type: string, data: any) => {
    let success = false;

    // 优先尝试 SSE
    if (enableSSE && sseSync.isConnected) {
      try {
        success = await sseSync.notifyDataChange(type, data);
        if (success) {
          apiLogger.info('通过 SSE 发送数据变更通知成功');
          return true;
        }
      } catch (error) {
        apiLogger.error('SSE 发送失败:', error);
      }
    }

    // 如果 SSE 失败，尝试其他方法
    if (!success) {
      apiLogger.warn('尝试备用方法发送数据变更通知');
      // 这里可以添加其他发送方法的逻辑
      // 例如直接调用 API 或使用 WebSocket
    }

    return success;
  }, [enableSSE, sseSync]);

  // 手动刷新数据
  const refreshData = useCallback(async () => {
    try {
      // 获取 SSE 连接信息
      if (enableSSE) {
        await sseSync.getConnectionInfo();
      }

      apiLogger.info('数据刷新完成');
      return true;
    } catch (error) {
      apiLogger.error('数据刷新失败:', error);
      return false;
    }
  }, [enableSSE, sseSync]);

  // 重新连接
  const reconnect = useCallback(async () => {
    try {
      // 重连 SSE
      if (enableSSE) {
        sseSync.disconnect();
        setTimeout(() => sseSync.connect(), 1000);
      }

      // 重连 WebSocket（通过 hybrid 方式）
      if (enableWebSocket) {
        // hybridUpdates 内部会自动重连
      }

      apiLogger.info('重连操作已触发');
      return true;
    } catch (error) {
      apiLogger.error('重连操作失败:', error);
      return false;
    }
  }, [enableSSE, enableWebSocket, sseSync]);

  // 状态信息
  const status: RealtimeStatus = {
    method: currentMethod,
    isConnected: currentMethod !== 'none',
    activeConnections: Math.max(sseSync.activeConnections, 0),
    lastUpdate,
    errorCount
  };

  // 详细状态信息
  const detailedStatus = {
    websocket: {
      enabled: enableWebSocket,
      status: hybridUpdates.connectionStatus,
      isConnected: hybridUpdates.connectionStatus === 'connected'
    },
    sse: {
      enabled: enableSSE,
      status: sseSync.connectionStatus,
      isConnected: sseSync.isConnected,
      activeConnections: sseSync.activeConnections
    },
    polling: {
      enabled: enablePolling,
      isActive: hybridUpdates.updateMethod === 'polling',
      interval: pollingInterval
    }
  };

  return {
    // 主要状态
    status,
    isConnected: status.isConnected,
    currentMethod,
    lastUpdate,
    
    // 详细状态
    detailedStatus,
    
    // 操作方法
    notifyDataChange,
    refreshData,
    reconnect,
    
    // 原始 hooks 引用（用于高级操作）
    hybridUpdates,
    sseSync
  };
}

// 便捷的数据类型特定 hooks
export function useFinalProductUpdates() {
  return useFinalRealtimeUpdates({ dataTypes: ['products'] });
}

export function useFinalOrderUpdates() {
  return useFinalRealtimeUpdates({ dataTypes: ['orders'] });
}

export function useFinalCustomerUpdates() {
  return useFinalRealtimeUpdates({ dataTypes: ['customers'] });
}
