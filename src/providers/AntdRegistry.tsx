'use client';

import React, { useEffect } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = createCache();
  
  // 抑制 Ant Design React 版本兼容性警告
  useEffect(() => {
    // 覆盖 console.warn 来过滤特定的 antd 警告
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0]?.includes?.('antd v5 support React is 16 ~ 18')) {
        return; // 忽略这个特定的警告
      }
      originalWarn.apply(console, args);
    };
    
    return () => {
      console.warn = originalWarn;
    };
  }, []);
  
  useServerInsertedHTML(() => (
    <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
  ));

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;