import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import { Statistics } from '../../src/components/Statistics';
import { Income } from '../../src/types';

// 创建测试用的Income数据
const createTestIncomes = (count: number, overrides?: Partial<Income>): Income[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `test-${i}`,
    amount: 1000 + i * 1000,
    date: new Date(2023, i, 1),
    remark: `测试收入 ${i + 1}`,
    ...overrides
  }));
};

describe('Statistics 组件', () => {
  test('应该正确渲染统计信息', () => {
    const testIncomes = createTestIncomes(3, {
      amount: 1000, // 所有收入金额都是1000
      date: new Date(2023, 0, 15) // 所有收入都在同一个月
    });
    
    render(<Statistics incomes={testIncomes} />);
    
    // 验证标题存在
    expect(screen.getByText(/金额统计/i)).toBeInTheDocument();
    
    // 验证按月统计按钮存在
    expect(screen.getByRole('button', { name: /按年统计/i })).toBeInTheDocument();
    
    // 验证月度统计信息
    expect(screen.getByText('2023-01')).toBeInTheDocument();
    expect(screen.getByText('¥5000.00')).toBeInTheDocument();
  });

  test('应该正确计算不同金额的统计信息', () => {
    const testIncomes = [
      ...createTestIncomes(1, { amount: 1000, date: new Date(2023, 0, 15) }),
      ...createTestIncomes(1, { amount: 2000, date: new Date(2023, 0, 16) }),
      ...createTestIncomes(1, { amount: 3000, date: new Date(2023, 0, 17) })
    ];
    
    render(<Statistics incomes={testIncomes} />);
    
    // 验证月度统计信息
    expect(screen.getByText('2023-01')).toBeInTheDocument();
    expect(screen.getByText('¥6000.00')).toBeInTheDocument();
  });

  test('当没有收入时应该显示暂无收入记录', () => {
    render(<Statistics incomes={[]} />);
    
    // 验证显示暂无收入记录
    expect(screen.getByText(/暂无收入记录/i)).toBeInTheDocument();
  });

  test('应该按月份分组显示统计信息', () => {
    // 创建不同月份的收入
    const testIncomes = [
      ...createTestIncomes(1, { amount: 1000, date: new Date(2023, 0, 15) }), // 1月
      ...createTestIncomes(1, { amount: 2000, date: new Date(2023, 1, 15) }), // 2月
      ...createTestIncomes(1, { amount: 3000, date: new Date(2023, 1, 20) })  // 2月
    ];
    
    render(<Statistics incomes={testIncomes} />);
    
    // 验证月度统计信息
    expect(screen.getByText('2023-01')).toBeInTheDocument();
    expect(screen.getByText('2023-02')).toBeInTheDocument();
    expect(screen.getByText('¥1000.00')).toBeInTheDocument();
    expect(screen.getByText('¥5000.00')).toBeInTheDocument();
  });
  
  test('点击按钮应该切换统计模式', () => {
    // 创建不同月份的收入，确保不同年份有不同的总金额
    const testIncomes = [
      ...createTestIncomes(1, { amount: 1000, date: new Date(2023, 0, 15) }), // 2023年1月
      ...createTestIncomes(1, { amount: 2000, date: new Date(2023, 1, 15) }), // 2023年2月
      ...createTestIncomes(1, { amount: 5000, date: new Date(2022, 0, 20) })  // 2022年1月
    ];
    
    render(<Statistics incomes={testIncomes} />);
    
    // 初始应该是按月统计
    expect(screen.getByText('2023-01')).toBeInTheDocument();
    expect(screen.getByText('2023-02')).toBeInTheDocument();
    expect(screen.getByText('2022-01')).toBeInTheDocument();
    
    // 点击切换按钮
    fireEvent.click(screen.getByRole('button', { name: /按年统计/i }));
    
    // 现在应该是按年统计
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    
    // 使用getAllByText并验证数量和内容
    const amountElements = screen.getAllByText(/¥\d+\.\d{2}/);
    expect(amountElements).toHaveLength(2);
    expect(amountElements[0].textContent).toBe('¥3000.00'); // 2023年总计
    expect(amountElements[1].textContent).toBe('¥5000.00'); // 2022年总计
  });
});