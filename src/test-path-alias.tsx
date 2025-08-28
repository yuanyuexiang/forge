// 路径别名测试文件
// 用于验证 @components, @lib, @providers 等别名是否正常工作

import { ProtectedRoute, AdminLayout } from '@components';
import { TokenManager } from '@lib/auth/token-manager';
import { DIRECTUS_CONFIG } from '@lib/api/directus-config';
import { logger } from '@lib/utils/logger';
import { useAuth } from '@providers/AuthProvider';

// 这个文件用于测试路径别名配置是否正确
// 如果没有错误，说明所有别名都工作正常

console.log('路径别名测试通过！');

export default function PathAliasTest() {
  return null;
}
