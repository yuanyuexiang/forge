'use client';

import { useAuth } from '../providers/AuthProvider';
import AdminLayout from '../components/AdminLayout';
import CategoriesContent from '../components/CategoriesContent';

export default function CategoriesPage() {
  const { user } = useAuth();

  if (!user) {
    return null; // AuthProvider 会重定向到登录页面
  }

  return (
    <AdminLayout>
      <CategoriesContent />
    </AdminLayout>
  );
}
