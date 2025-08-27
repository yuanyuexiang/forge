import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from './providers/AntdRegistry';
import ApolloProvider from './providers/ApolloProvider';
import { AuthProvider } from './providers/AuthProvider';

// 抑制 Ant Design 兼容性警告
import '../lib/suppress-warnings';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

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
