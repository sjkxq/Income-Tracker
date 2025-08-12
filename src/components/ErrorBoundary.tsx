
// 引入React库及其相关类型
import React, { Component, ErrorInfo, ReactNode } from "react";

// 定义ErrorBoundary组件的属性接口
interface ErrorBoundaryProps {
  children: ReactNode; // 子组件
}

// 定义ErrorBoundary组件的状态接口
interface ErrorBoundaryState {
  hasError: boolean; // 是否发生错误
}

// 定义ErrorBoundary类继承自Component，泛型参数分别为Props和State
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // 构造函数，初始化组件状态
  constructor(props: ErrorBoundaryProps) {
    super(props); // 调用父类构造函数
    this.state = { hasError: false }; // 初始状态为未发生错误
  }

  // 静态方法，用于在捕获到错误时更新状态
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }; // 返回新的状态，标记为发生错误
  }

  // 生命周期方法，用于捕获子组件树中的错误
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo); // 打印错误信息到控制台
  }

  // 渲染方法
  render() {
    if (this.state.hasError) { // 如果状态标记为发生错误
      return <h1 className="p-4 text-red-500">应用程序发生错误，请刷新页面</h1>; // 显示错误信息
    }
    return this.props.children; // 否则渲染子组件
  }
}

// 导出ErrorBoundary组件
export default ErrorBoundary;