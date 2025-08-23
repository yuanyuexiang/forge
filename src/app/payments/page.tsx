'use client';

import { useAuth } from '../providers/AuthProvider';
import AdminLayout from '../components/AdminLayout';
import PaymentsContent from '../components/PaymentsContent';

export default function PaymentsPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // AuthProvider 会重定向到登录页面
  }

  return (
    <AdminLayout>
      <PaymentsContent />
    </AdminLayout>
  );
}
