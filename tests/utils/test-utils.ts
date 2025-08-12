import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Income } from '../../src/types';

// 自定义渲染函数，可以在这里添加全局的Provider等
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options });

// 创建测试用的Income数据
const createTestIncome = (overrides?: Partial<Income>): Income => ({
  id: `test-${Math.random().toString(36).substr(2, 9)}`,
  description: '测试收入',
  amount: 1000,
  date: new Date(),
  ...overrides
});

// 创建多个测试用的Income数据
const createTestIncomes = (count: number, overrides?: Partial<Income>): Income[] => {
  return Array.from({ length: count }, (_, index) => 
    createTestIncome({
      id: `test-${index}`,
      description: `测试收入 ${index + 1}`,
      amount: 1000 * (index + 1),
      date: new Date(2023, index % 12, 1), // 分布在不同月份
      ...overrides
    })
  );
};

// 导出所有测试工具函数
export * from '@testing-library/react';
export { customRender as render, createTestIncome, createTestIncomes };