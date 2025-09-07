import { useQuery } from '@apollo/client';
import { GetProductsDocument } from '@generated/graphql';

export function useRealtimeProducts(variables?: { userId?: string }) {
  const result = useQuery(GetProductsDocument, {
    variables,
    pollInterval: 30000,
    notifyOnNetworkStatusChange: true,
  });

  return {
    ...result,
    strategy: 'polling' as const,
    lastUpdateTime: new Date(),
    refresh: result.refetch,
    queryResult: result,
    subscriptionResult: null
  };
}
