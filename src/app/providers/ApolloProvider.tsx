'use client';

import { ApolloProvider as ClientApolloProvider } from "@apollo/client/react";
import client from '../lib/apollo-client'; // 确保路径正确

export default function ApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClientApolloProvider client={client}>
      {children}
    </ClientApolloProvider>
  );
}