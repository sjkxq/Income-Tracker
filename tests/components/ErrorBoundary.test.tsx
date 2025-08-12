import React from 'react';
import { render, screen } from '../utils/test-utils';
import ErrorBoundary from '../../src/components/ErrorBoundary';

// 创建一个会抛出错误的组件
const ErrorComponent = () => {
  throw new Error('测试错误');
};

// 创建一个正常的组件
const NormalComponent = () => <div>正常组件</div>;

// 在测试前禁用控制台错误，避免测试输出中出现预期的错误日志
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

// 测试后恢复控制台错误
afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary 组件', () => {
  test('当子组件没有错误时应该正常渲染', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('正常组件')).toBeInTheDocument();
    expect(screen.queryByText('应用程序发生错误，请刷新页面')).not.toBeInTheDocument();
  });

  test('当子组件抛出错误时应该显示错误UI', () => {
    // 使用 jest.spyOn 来监视 console.error，因为 React 会在错误边界捕获错误时记录错误
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );
    
    // 验证显示错误信息
    expect(screen.getByText('应用程序发生错误，请刷新页面')).toBeInTheDocument();
    
    // 清理 spy
    spy.mockRestore();
  });
});