/**
 * 数据导出工具函数
 * 支持将数据导出为CSV格式
 */

import dayjs from 'dayjs';

// CSV导出配置接口
interface ExportConfig {
  filename: string;
  headers: { key: string; label: string; transform?: (value: any) => string }[];
}

// 转义CSV字段中的特殊字符
function escapeCsvField(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  const str = String(value);
  // 如果包含逗号、双引号或换行符，需要用双引号包围，并转义内部双引号
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// 转换数据为CSV格式
function convertToCSV(data: any[], config: ExportConfig): string {
  if (!data.length) {
    return '';
  }

  // 生成标题行
  const headers = config.headers.map(h => h.label).join(',');
  
  // 生成数据行
  const rows = data.map(item => {
    return config.headers.map(header => {
      let value = item;
      
      // 支持嵌套属性访问，如 'customer.nick_name'
      const keys = header.key.split('.');
      for (const key of keys) {
        value = value?.[key];
      }
      
      // 应用转换函数
      if (header.transform && value !== undefined && value !== null) {
        value = header.transform(value);
      }
      
      return escapeCsvField(value);
    }).join(',');
  });

  return [headers, ...rows].join('\n');
}

// 下载CSV文件
function downloadCSV(csvContent: string, filename: string): void {
  // 添加UTF-8 BOM以确保中文正确显示
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // 创建下载链接
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // 清理URL对象
  URL.revokeObjectURL(url);
}

// 主导出函数
export function exportToCSV(data: any[], config: ExportConfig): void {
  try {
    if (!data.length) {
      throw new Error('没有数据可导出');
    }

    const csvContent = convertToCSV(data, config);
    const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const filename = `${config.filename}_${timestamp}.csv`;
    
    downloadCSV(csvContent, filename);
  } catch (error) {
    console.error('导出失败:', error);
    throw error;
  }
}

// 预定义的导出配置
export const EXPORT_CONFIGS = {
  // 订单导出配置
  orders: {
    filename: '订单数据',
    headers: [
      { key: 'id', label: '订单ID' },
      { key: 'customer.nick_name', label: '客户姓名' },
      { key: 'customer.open_id', label: '微信OpenID' },
      { key: 'boutique.name', label: '店铺名称' },
      { key: 'boutique.address', label: '店铺地址' },
      { key: 'total_price', label: '订单金额', transform: (value) => `¥${value || 0}` },
      { key: 'status', label: '订单状态' },
      { key: 'date_created', label: '创建时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') },
      { key: 'date_updated', label: '更新时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') }
    ]
  },
  
  // 客户导出配置
  customers: {
    filename: '客户数据',
    headers: [
      { key: 'id', label: '客户ID' },
      { key: 'nick_name', label: '微信昵称' },
      { key: 'open_id', label: '微信OpenID' },
      { key: 'sex', label: '性别', transform: (value) => value === 1 ? '男' : value === 2 ? '女' : '未知' },
      { key: 'date_created', label: '注册时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') },
      { key: 'date_updated', label: '更新时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') }
    ]
  },
  
  // 商品导出配置
  products: {
    filename: '商品数据',
    headers: [
      { key: 'id', label: '商品ID' },
      { key: 'name', label: '商品名称' },
      { key: 'subtitle', label: '副标题' },
      { key: 'description', label: '商品描述' },
      { key: 'price', label: '售价', transform: (value) => `¥${value || 0}` },
      { key: 'market_price', label: '市场价', transform: (value) => `¥${value || 0}` },
      { key: 'stock', label: '库存' },
      { key: 'barcode', label: '条码' },
      { key: 'brand', label: '品牌' },
      { key: 'boutique_id.name', label: '所属店铺' },
      { key: 'category_id.name', label: '商品分类' },
      { key: 'status', label: '状态' },
      { key: 'date_created', label: '创建时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') }
    ]
  },
  
  // 店铺导出配置
  boutiques: {
    filename: '店铺数据',
    headers: [
      { key: 'id', label: '店铺ID' },
      { key: 'name', label: '店铺名称' },
      { key: 'address', label: '店铺地址' },
      { key: 'city', label: '所在城市' },
      { key: 'code', label: '店铺代码' },
      { key: 'category', label: '店铺类别' },
      { key: 'contact', label: '联系方式' },
      { key: 'expire_date', label: '过期时间', transform: (value) => value ? dayjs(value).format('YYYY-MM-DD') : '' },
      { key: 'stars', label: '评分' },
      { key: 'status', label: '状态' },
      { key: 'sort', label: '排序' },
      { key: 'date_created', label: '创建时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') },
      { key: 'date_updated', label: '更新时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') },
      { key: 'user_created.first_name', label: '创建者姓' },
      { key: 'user_created.last_name', label: '创建者名' },
      { key: 'user_created.email', label: '创建者邮箱' }
    ]
  },
  
  // 终端设备导出配置
  terminals: {
    filename: '终端设备数据',
    headers: [
      { key: 'id', label: '设备ID' },
      { key: 'date_created', label: '添加时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') },
      { key: 'date_updated', label: '更新时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') },
      { key: 'user_created.first_name', label: '创建者姓' },
      { key: 'user_created.last_name', label: '创建者名' },
      { key: 'user_created.email', label: '创建者邮箱' }
    ]
  },
  
  // 浏览记录导出配置
  views: {
    filename: '商品浏览记录',
    headers: [
      { key: 'id', label: '记录ID' },
      { key: 'customer.nick_name', label: '客户昵称' },
      { key: 'customer.open_id', label: '微信OpenID' },
      { key: 'product.name', label: '商品名称' },
      { key: 'product.price', label: '商品价格', transform: (value) => `¥${value || 0}` },
      { key: 'product.market_price', label: '市场价', transform: (value) => `¥${value || 0}` },
      { key: 'boutique.name', label: '店铺名称' },
      { key: 'boutique.address', label: '店铺地址' },
      { key: 'date_created', label: '浏览时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') }
    ]
  },
  
  // 访问记录导出配置
  visits: {
    filename: '店铺访问记录',
    headers: [
      { key: 'id', label: '记录ID' },
      { key: 'customer.nick_name', label: '客户昵称' },
      { key: 'customer.open_id', label: '微信OpenID' },
      { key: 'boutique.name', label: '店铺名称' },
      { key: 'boutique.address', label: '店铺地址' },
      { key: 'boutique.city', label: '店铺城市' },
      { key: 'boutique.category', label: '店铺类型' },
      { key: 'date_created', label: '访问时间', transform: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss') }
    ]
  }
};

// 导出函数的便捷封装
export const exportOrders = (data: any[]) => exportToCSV(data, EXPORT_CONFIGS.orders);
export const exportCustomers = (data: any[]) => exportToCSV(data, EXPORT_CONFIGS.customers);
export const exportProducts = (data: any[]) => exportToCSV(data, EXPORT_CONFIGS.products);
export const exportBoutiques = (data: any[]) => exportToCSV(data, EXPORT_CONFIGS.boutiques);
export const exportTerminals = (data: any[]) => exportToCSV(data, EXPORT_CONFIGS.terminals);
export const exportViews = (data: any[]) => exportToCSV(data, EXPORT_CONFIGS.views);
export const exportVisits = (data: any[]) => exportToCSV(data, EXPORT_CONFIGS.visits);