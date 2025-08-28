'use client';

import React from 'react';
import { ApolloProvider as ApolloProviderBase } from '@apollo/client';
import client from '@lib/api/apollo-client'; // 确保路径正确

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProviderBase client={client}>
      {children}
    </ApolloProviderBase>
  );
}