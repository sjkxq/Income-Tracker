import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { IncomeForm } from '../../src/components/IncomeForm';

describe('IncomeForm 组件', () => {
  const mockAddIncome = jest.fn();
  
  beforeEach(() => {
    mockAddIncome.mockClear();
  });

  test('应该正确渲染表单', () => {
    render(<IncomeForm onAdd={mockAddIncome} />);
    
    expect(screen.getByPlaceholderText(/备注/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/金额/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/日期/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /添加收入/i })).toBeInTheDocument();
  });

  test('提交有效表单时应该调用onAdd', async () => {
    render(<IncomeForm onAdd={mockAddIncome} />);
    
    // 填写表单
    fireEvent.change(screen.getByPlaceholderText(/备注/i), { target: { value: '测试收入' } });
    fireEvent.change(screen.getByPlaceholderText(/金额/i), { target: { value: '1000' } });
    
    // 提交表单
    fireEvent.click(screen.getByRole('button', { name: /添加收入/i }));
    
    // 验证onAdd被调用
    await waitFor(() => {
      expect(mockAddIncome).toHaveBeenCalledTimes(1);
      expect(mockAddIncome).toHaveBeenCalledWith(expect.objectContaining({
        remark: '测试收入',
        amount: 1000,
        date: expect.any(Date)
      }));
    });
    
    // 验证表单被重置
    await waitFor(() => {
      const remarkInput = screen.getByPlaceholderText(/备注/i) as HTMLInputElement;
      const amountInput = screen.getByPlaceholderText(/金额/i) as HTMLInputElement;
      expect(remarkInput).toBeInTheDocument();
      expect(amountInput).toBeInTheDocument();
      // 检查值是否为空或空字符串
      expect(remarkInput.value).toBe('');
      expect(amountInput.value).toBe('');
    });
  });

  test('提交无效表单时不应该调用onAdd', async () => {
    render(<IncomeForm onAdd={mockAddIncome} />);
    
    // 不填写金额，直接提交
    fireEvent.change(screen.getByPlaceholderText(/金额/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /添加收入/i }));
    
    // 验证onAdd没有被调用
    await waitFor(() => {
      expect(mockAddIncome).not.toHaveBeenCalled();
    });
  });

  test('金额输入后可以成功提交', async () => {
    render(<IncomeForm onAdd={mockAddIncome} />);
    
    // 输入金额
    fireEvent.change(screen.getByPlaceholderText(/金额/i), { target: { value: '100' } });
    
    // 提交表单
    fireEvent.click(screen.getByRole('button', { name: /添加收入/i }));
    
    // 验证onAdd被调用
    await waitFor(() => {
      expect(mockAddIncome).toHaveBeenCalledTimes(1);
      expect(mockAddIncome).toHaveBeenCalledWith(expect.objectContaining({
        amount: 100,
        date: expect.any(Date)
      }));
    });
  });
});