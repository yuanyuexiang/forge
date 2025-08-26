'use client';

import { useAuth } from '../providers/AuthProvider';
import AdminLayout from '../components/AdminLayout';
import OrdersContentGraphQL from '../components/OrdersContentGraphQL';

export default function OrdersPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // AuthProvider 会重定向到登录页面
  }

  return (
    <AdminLayout>
      <OrdersContentGraphQL />
    </AdminLayout>
  );
}
