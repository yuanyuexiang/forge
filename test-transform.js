// 测试产品数据转换的脚本

// 模拟表单数据
const formValues = {
  name: "iPhone 14",
  description: "苹果最新款手机买买买",
  price: 7999,
  stock: 50,
  category_id: "1"  // 这是表单返回的字符串ID
};

// 转换函数（从 products/page.tsx 复制）
const transformValues = (values) => {
  return {
    ...values,
    category_id: values.category_id ? { id: values.category_id } : undefined
  };
};

// 测试转换
const transformed = transformValues(formValues);

console.log('Original values:', formValues);
console.log('Transformed values:', transformed);
console.log('category_id type:', typeof transformed.category_id);
console.log('category_id structure:', JSON.stringify(transformed.category_id, null, 2));

// 验证预期结果
const expected = {
  name: "iPhone 14",
  description: "苹果最新款手机买买买",
  price: 7999,
  stock: 50,
  category_id: { id: "1" }
};

console.log('\nExpected result:', expected);
console.log('Matches expected?', JSON.stringify(transformed) === JSON.stringify(expected));
