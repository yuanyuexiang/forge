'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Switch, Button, message, Typography, Radio, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { getApiConfig, setApiConfig, defaultApiConfig, directApiConfig } from '@/app/lib/api-config';

const { Text, Paragraph } = Typography;

interface ApiSettingsProps {
  visible: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export const ApiSettings: React.FC<ApiSettingsProps> = ({ visible, onClose, onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      const config = getApiConfig();
      form.setFieldsValue({
        endpoint: config.endpoint,
        requiresAuth: config.requiresAuth,
        authToken: config.authToken || '',
        useProxy: config.useProxy !== false // 默认使用代理
      });
    }
  }, [visible, form]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      
      setApiConfig({
        endpoint: values.endpoint,
        requiresAuth: values.requiresAuth,
        authToken: values.requiresAuth ? values.authToken : undefined,
        useProxy: values.useProxy
      });
      
      message.success('API 配置已保存，请刷新页面以应用更改');
      onSave?.();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.setFieldsValue({
      endpoint: defaultApiConfig.endpoint,
      requiresAuth: defaultApiConfig.requiresAuth,
      authToken: '',
      useProxy: true
    });
  };

  const handlePresetChange = (e: any) => {
    const preset = e.target.value;
    if (preset === 'proxy') {
      form.setFieldsValue({
        endpoint: defaultApiConfig.endpoint,
        useProxy: true
      });
    } else if (preset === 'direct') {
      form.setFieldsValue({
        endpoint: directApiConfig.endpoint,
        useProxy: false
      });
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <SettingOutlined />
          <span>GraphQL API 设置</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="reset" onClick={handleReset}>
          重置为默认
        </Button>,
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button key="save" type="primary" loading={loading} onClick={handleSave}>
          保存
        </Button>
      ]}
      width={600}
    >
      <div className="mb-4">
        <Paragraph type="secondary">
          配置您的 GraphQL API 端点。如果遇到 CORS 错误，建议使用代理模式。
        </Paragraph>
      </div>

      {/* 预设选项 */}
      <div className="mb-4">
        <Typography.Text strong>快速配置：</Typography.Text>
        <Radio.Group onChange={handlePresetChange} className="mt-2">
          <Space direction="vertical">
            <Radio value="proxy">代理模式 (推荐) - 避免 CORS 问题</Radio>
            <Radio value="direct">直连模式 - 直接连接到 API</Radio>
            <Radio value="custom">自定义配置</Radio>
          </Space>
        </Radio.Group>
      </div>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          endpoint: defaultApiConfig.endpoint,
          requiresAuth: defaultApiConfig.requiresAuth,
          authToken: '',
          useProxy: true
        }}
      >
        <Form.Item
          name="endpoint"
          label="GraphQL 端点 URL"
          rules={[
            { required: true, message: '请输入 GraphQL 端点 URL' }
          ]}
        >
          <Input placeholder="/api/graphql 或 https://your-api.com/graphql" />
        </Form.Item>

        <Form.Item
          name="useProxy"
          label="使用代理模式"
          valuePropName="checked"
          extra="代理模式可以避免 CORS 错误，推荐使用"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="requiresAuth"
          label="需要认证"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => 
            prevValues.requiresAuth !== currentValues.requiresAuth
          }
        >
          {({ getFieldValue }) =>
            getFieldValue('requiresAuth') ? (
              <Form.Item
                name="authToken"
                label="认证 Token"
                rules={[
                  { required: true, message: '请输入认证 Token' }
                ]}
              >
                <Input.Password placeholder="Bearer token 或 API key" />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <Text type="warning">
          <strong>注意：</strong> 更改 API 配置后需要刷新页面才能生效。代理模式可以解决大多数 CORS 问题。
        </Text>
      </div>
    </Modal>
  );
};

export default ApiSettings;
