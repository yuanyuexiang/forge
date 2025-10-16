/**
 * WebSocket 连接状态管理
 * 提供全局的 WebSocket 连接状态跟踪
 */

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

class WebSocketStatusManager {
  private status: ConnectionStatus = 'connecting';
  private listeners: Set<(status: ConnectionStatus) => void> = new Set();

  getStatus(): ConnectionStatus {
    return this.status;
  }

  setStatus(status: ConnectionStatus) {
    if (this.status !== status) {
      console.log(`🔄 WebSocket 状态变更: ${this.status} → ${status}`);
      this.status = status;
      this.notifyListeners();
    }
  }

  isConnected(): boolean {
    return this.status === 'connected';
  }

  subscribe(listener: (status: ConnectionStatus) => void): () => void {
    this.listeners.add(listener);
    // 立即通知当前状态
    listener(this.status);
    
    // 返回取消订阅函数
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.status));
  }
}

// 导出单例实例
export const wsStatus = new WebSocketStatusManager();
