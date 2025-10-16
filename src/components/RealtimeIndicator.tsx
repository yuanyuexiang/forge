import React from 'react';
import { Badge, Tooltip } from 'antd';
import { WifiOutlined } from '@ant-design/icons';

interface RealtimeIndicatorProps {
  connected: boolean;
  className?: string;
}

/**
 * 实时连接状态指示器
 * 显示 WebSocket 连接状态
 */
export const RealtimeIndicator: React.FC<RealtimeIndicatorProps> = ({ 
  connected,
  className 
}) => {
  return (
    <Tooltip 
      title={connected ? '实时连接已建立' : '实时连接断开'}
      placement="left"
    >
      <div 
        className={className}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          padding: '8px 16px',
          borderRadius: '4px',
          backgroundColor: connected ? '#f6ffed' : '#fff2e8',
          border: `1px solid ${connected ? '#b7eb8f' : '#ffbb96'}`,
          transition: 'all 0.3s ease'
        }}
      >
        <Badge 
          status={connected ? 'success' : 'error'} 
          text={
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '13px',
              color: connected ? '#52c41a' : '#ff4d4f'
            }}>
              <WifiOutlined />
              {connected ? '实时监控中' : '连接断开'}
            </span>
          }
        />
      </div>
    </Tooltip>
  );
};
