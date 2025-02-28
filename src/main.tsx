import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary'; // 新增导入
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary> {/* 新增错误边界 */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
