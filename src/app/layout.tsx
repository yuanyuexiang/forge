import type { Metadata } from "next";
import "./globals.css";
import StyledComponentsRegistry from '@providers/AntdRegistry';
import ApolloProvider from '@providers/ApolloProvider';
import { AuthProvider } from '@providers/AuthProvider';

// 抑制 Ant Design 兼容性警告
import '@lib/utils/suppress-warnings';

export const metadata: Metadata = {
  title: "服装店管理后台",
  description: "现代化服装店管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <StyledComponentsRegistry>
          <ApolloProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ApolloProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
