// 引入React库，用于创建组件和操作React相关功能
import React from 'react';
// 引入ReactDOM库，用于将React组件渲染到DOM中
import ReactDOM from 'react-dom/client';
// 引入App组件，这是应用的根组件
import App from './App';
// 引入ErrorBoundary组件，用于捕获并处理组件树中的JavaScript错误
import ErrorBoundary from './components/ErrorBoundary'; // 新增导入
// 引入index.css文件，用于全局样式设置
import './index.css';

// 使用ReactDOM.createRoot方法创建一个根容器，并渲染React应用
// document.getElementById('root')! 获取id为'root'的DOM元素，感叹号表示该元素一定存在，不会为null
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary> {/* 新增错误边界 */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
