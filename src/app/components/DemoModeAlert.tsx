'use client';

import React from 'react';
import { Alert, Typography, Space, Divider } from 'antd';
import { InfoCircleOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface DemoModeAlertProps {
  showApiSettings?: () => void;
}

export const DemoModeAlert: React.FC<DemoModeAlertProps> = ({ showApiSettings }) => {
  return (
    <Alert
      message="🎭 演示模式"
      description={
        <Space direction="vertical" size="small" className="w-full">
          <Paragraph className="mb-2">
            <Text type="secondary">
              当前无法连接到 GraphQL API，系统正在使用模拟数据演示功能。
            </Text>
          </Paragraph>
          
          <Divider className="my-2" />
          
          <div>
            <Text strong>
              <UserOutlined className="mr-1" />
              可用的演示账户：
            </Text>
            <ul className="mt-1 mb-0 text-sm">
              <li><Text code>admin@example.com</Text> / <Text code>password</Text> (系统管理员)</li>
              <li><Text code>manager@example.com</Text> / <Text code>123456</Text> (业务经理)</li>
              <li><Text code>demo@test.com</Text> / <Text code>demo</Text> (演示用户)</li>
            </ul>
          </div>
          
          {showApiSettings && (
            <>
              <Divider className="my-2" />
              <div>
                <Text>
                  <SettingOutlined className="mr-1" />
                  如果您有自己的 GraphQL API，可以{' '}
                  <a onClick={showApiSettings} className="cursor-pointer">
                    点击这里配置 API 设置
                  </a>
                </Text>
              </div>
            </>
          )}
        </Space>
      }
      type="warning"
      showIcon
      icon={<InfoCircleOutlined />}
      className="mb-4"
    />
  );
};

export default DemoModeAlert;
