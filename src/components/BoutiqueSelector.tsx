import React from 'react';
import { Select, Spin } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import { useGetBoutiquesQuery } from '@generated/graphql';
import { TokenManager } from '@lib/auth';

const { Option } = Select;

interface BoutiqueSelectorProps {
  value?: string;
  onChange?: (boutiqueId: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const BoutiqueSelector: React.FC<BoutiqueSelectorProps> = ({
  value,
  onChange,
  placeholder = '选择店铺',
  style,
  disabled = false
}) => {
  // 获取当前用户的店铺列表
  const userId = TokenManager.getCurrentUserId();
  const { data, loading, error } = useGetBoutiquesQuery({
    variables: userId ? { userId } : undefined,
    skip: !userId
  });

  const boutiques = data?.boutiques || [];

  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ minWidth: 200, ...style }}
      loading={loading}
      disabled={disabled || loading}
      allowClear
      showSearch
      filterOption={(input, option) => {
        const children = option?.label || option?.children;
        if (typeof children === 'string') {
          return children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
        return false;
      }}
    >
      {boutiques.map(boutique => (
        <Option key={boutique.id} value={boutique.id}>
          <ShopOutlined style={{ marginRight: 8 }} />
          {boutique.name}
          {boutique.address && (
            <span style={{ color: '#999', fontSize: '12px', marginLeft: 8 }}>
              {boutique.address}
            </span>
          )}
        </Option>
      ))}
    </Select>
  );
};

export default BoutiqueSelector;