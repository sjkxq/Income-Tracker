import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import IncomeList from '../../src/components/IncomeList';
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

describe('IncomeList 组件', () => {
  const mockDelete = jest.fn();
  const mockExport = jest.fn();
  const mockImport = jest.fn().mockResolvedValue(undefined);
  const mockAutoExport = jest.fn();
  
  beforeEach(() => {
    mockDelete.mockClear();
    mockExport.mockClear();
    mockImport.mockClear();
    mockAutoExport.mockClear();
  });

  test('应该正确渲染收入列表', () => {
    const testIncomes = createTestIncomes(3);
    render(
      <IncomeList 
        incomes={testIncomes} 
        onDelete={mockDelete} 
        onExport={mockExport} 
        onImport={mockImport}
        onAutoExport={mockAutoExport}
      />
    );
    
    // 验证标题存在
    expect(screen.getByText(/收入记录/i)).toBeInTheDocument();
    
    // 验证每个收入项都被渲染
    testIncomes.forEach(income => {
      // 格式化日期以匹配组件中的格式 (yyyy-MM-dd)
      const formattedDate = `${income.date.getFullYear()}-${String(income.date.getMonth() + 1).padStart(2, '0')}-${String(income.date.getDate()).padStart(2, '0')}`;
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
      
      // 验证金额显示
      expect(screen.getByText(`¥${income.amount.toFixed(2)}`)).toBeInTheDocument();
    });
    
    // 验证删除按钮的数量与收入项数量相同
    const deleteButtons = screen.getAllByRole('button', { name: /删除/i });
    expect(deleteButtons).toHaveLength(testIncomes.length);
  });

  test('点击删除按钮时应该调用onDelete', () => {
    // 创建日期不同的收入，确保排序后的顺序是可预测的
    const oldIncome = {
      id: 'old-income',
      amount: 1000,
      date: new Date(2022, 1, 1),
      remark: '旧收入'
    };
    const newIncome = {
      id: 'new-income',
      amount: 2000,
      date: new Date(2023, 1, 1),
      remark: '新收入'
    };
    const testIncomes = [oldIncome, newIncome];
    
    render(
      <IncomeList 
        incomes={testIncomes} 
        onDelete={mockDelete} 
        onExport={mockExport} 
        onImport={mockImport}
        onAutoExport={mockAutoExport}
      />
    );
    
    // 点击第一个删除按钮（应该是最新日期的收入）
    const deleteButtons = screen.getAllByRole('button', { name: /删除/i });
    fireEvent.click(deleteButtons[0]);
    
    // 验证onDelete被调用，并且传入了正确的ID（最新日期的收入ID）
    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(newIncome.id);
  });

  test('当没有收入时应该显示空列表', () => {
    render(
      <IncomeList 
        incomes={[]} 
        onDelete={mockDelete} 
        onExport={mockExport} 
        onImport={mockImport}
        onAutoExport={mockAutoExport}
      />
    );
    
    // 验证没有删除按钮
    const deleteButtons = screen.queryAllByRole('button', { name: /删除/i });
    expect(deleteButtons).toHaveLength(0);
  });

  test('应该按日期降序排序显示收入', () => {
    // 创建日期不同的收入
    const oldIncome = createTestIncomes(1, { date: new Date(2022, 1, 1) })[0];
    const newIncome = createTestIncomes(1, { date: new Date(2023, 1, 1) })[0];
    const testIncomes = [oldIncome, newIncome];
    
    render(
      <IncomeList 
        incomes={testIncomes} 
        onDelete={mockDelete} 
        onExport={mockExport} 
        onImport={mockImport}
        onAutoExport={mockAutoExport}
      />
    );
    
    // 获取所有日期元素
    const dateElements = screen.getAllByText(/^\d{4}-\d{2}-\d{2}$/);
    
    // 验证新的收入在旧的收入之前（降序排序）
    expect(dateElements[0].textContent).toBe('2023-02-01');
    expect(dateElements[1].textContent).toBe('2022-02-01');
  });
});