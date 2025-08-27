// 抑制 Ant Design v5 React 兼容性警告
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = function(...args) {
    // 检查是否是 Ant Design 兼容性警告
    const message = args.join(' ');
    if (
      message.includes('antd: compatible') && 
      message.includes('antd v5 support React is 16 ~ 18')
    ) {
      // 静默忽略这个警告
      return;
    }
    // 其他警告正常显示
    originalWarn.apply(console, args);
  };
}
