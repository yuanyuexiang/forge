import React from 'react';
import { Badge, Tooltip } from 'antd';
import { WifiOutlined, LoadingOutlined, DisconnectOutlined } from '@ant-design/icons';

interface RealtimeStatusProps {
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  showLabel?: boolean;
}

const RealtimeStatus: React.FC<RealtimeStatusProps> = ({ 
  connectionStatus, 
  showLabel = false 
}) => {
  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          status: 'success' as const,
          icon: <WifiOutlined />,
          text: '实时连接已建立',
          label: '实时更新'
        };
      case 'connecting':
        return {
          status: 'processing' as const,
          icon: <LoadingOutlined spin />,
          text: '正在建立实时连接...',
          label: '连接中'
        };
      case 'disconnected':
      default:
        return {
          status: 'default' as const,
          icon: <DisconnectOutlined />,
          text: '实时连接已断开',
          label: '离线'
        };
    }
  };

  const config = getStatusConfig();

  const badgeElement = (
    <Badge 
      status={config.status} 
      text={showLabel ? config.label : undefined}
    />
  );

  return (
    <Tooltip title={config.text}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {config.icon}
        {badgeElement}
      </div>
    </Tooltip>
  );
};

export default RealtimeStatus;
