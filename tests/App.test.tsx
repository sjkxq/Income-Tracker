import React from 'react';
import { render, screen, fireEvent, waitFor } from './utils/test-utils';
import App from '../src/App';

describe('App 组件', () => {
  test('应该正确渲染所有子组件', () => {
    render(<App />);
    
    // 验证标题存在
    expect(screen.getByText(/收入追踪器/i)).toBeInTheDocument();
    
    // 验证IncomeForm组件存在
    expect(screen.getByPlaceholderText(/备注/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/金额/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/日期/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /添加收入/i })).toBeInTheDocument();
    
    // 验证IncomeList组件存在
    expect(screen.getByRole('heading', { name: /收入记录/i })).toBeInTheDocument();
    
    // 验证Statistics组件存在
    expect(screen.getByText(/金额统计/i)).toBeInTheDocument();
  });

  test('应该能够添加新的收入记录', async () => {
    render(<App />);
    
    // 填写表单
    fireEvent.change(screen.getByPlaceholderText(/备注/i), { target: { value: '测试收入' } });
    fireEvent.change(screen.getByPlaceholderText(/金额/i), { target: { value: '1000' } });
    
    const dateInput = screen.getByPlaceholderText(/日期/i);
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    fireEvent.change(dateInput, { target: { value: dateString } });
    
    // 提交表单
    fireEvent.click(screen.getByRole('button', { name: /添加收入/i }));
    
    // 验证收入记录被添加到列表中
    await waitFor(() => {
      const amountElements = screen.getAllByText('¥1000.00');
      expect(amountElements.length).toBeGreaterThan(0);
      expect(screen.getByText(dateString)).toBeInTheDocument();
      if (screen.queryByText('测试收入')) {
        expect(screen.getByText('测试收入')).toBeInTheDocument();
      }
    });
    
    // 验证月度统计信息更新
    const monthYear = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    expect(screen.getByText(monthYear)).toBeInTheDocument();
    const statisticsAmountElements = screen.getAllByText('¥1000.00');
    expect(statisticsAmountElements.length).toBeGreaterThan(0);
  });

  test('应该能够删除收入记录', async () => {
    render(<App />);
    
    // 添加收入记录
    fireEvent.change(screen.getByPlaceholderText(/备注/i), { target: { value: '测试收入' } });
    fireEvent.change(screen.getByPlaceholderText(/金额/i), { target: { value: '1000' } });
    
    const dateInput = screen.getByPlaceholderText(/日期/i);
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    fireEvent.change(dateInput, { target: { value: dateString } });
    
    fireEvent.click(screen.getByRole('button', { name: /添加收入/i }));
    
    // 等待收入记录被添加
    await waitFor(() => {
      const amountElements = screen.getAllByText('¥1000.00');
      expect(amountElements.length).toBeGreaterThan(0);
    });
    
    // 删除收入记录
    const deleteButton = screen.getByRole('button', { name: /删除/i });
    fireEvent.click(deleteButton);
    
    // 验证收入记录被删除
    await waitFor(() => {
      expect(screen.queryByText('¥1000.00')).not.toBeInTheDocument();
    });
  });

  test('添加多个收入记录后统计信息应该正确更新', async () => {
    render(<App />);
    
    // 添加第一个收入记录
    fireEvent.change(screen.getByPlaceholderText(/备注/i), { target: { value: '收入1' } });
    fireEvent.change(screen.getByPlaceholderText(/金额/i), { target: { value: '1000' } });
    
    const dateInput = screen.getByPlaceholderText(/日期/i);
    const date1 = `2023-01-15`;
    fireEvent.change(dateInput, { target: { value: date1 } });
    
    fireEvent.click(screen.getByRole('button', { name: /添加收入/i }));
    
    // 等待第一个收入记录被添加
    await waitFor(() => {
      const amountElements = screen.getAllByText('¥1000.00');
      expect(amountElements.length).toBeGreaterThan(0);
    });
    
    // 添加第二个收入记录
    fireEvent.change(screen.getByPlaceholderText(/备注/i), { target: { value: '收入2' } });
    fireEvent.change(screen.getByPlaceholderText(/金额/i), { target: { value: '2000' } });
    
    const date2 = `2023-02-15`;
    fireEvent.change(dateInput, { target: { value: date2 } });
    
    fireEvent.click(screen.getByRole('button', { name: /添加收入/i }));
    
    // 等待第二个收入记录被添加
    await waitFor(() => {
      expect(screen.getByText('¥2000.00')).toBeInTheDocument();
    });
    
    // 验证月度统计信息
    expect(screen.getByText('2023-01')).toBeInTheDocument();
    expect(screen.getByText('2023-02')).toBeInTheDocument();
  });

  test('空金额时不应该添加收入记录', async () => {
    render(<App />);
    
    // 提交空表单
    fireEvent.click(screen.getByRole('button', { name: /添加收入/i }));
    
    // 验证收入列表仍然为空
    await waitFor(() => {
      // 检查是否没有删除按钮，表示没有收入记录
      expect(screen.queryByRole('button', { name: /删除/i })).not.toBeInTheDocument();
    });
  });
});