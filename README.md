# Income Tracker - 收入跟踪应用

基于现代Web技术栈构建的收入管理渐进式Web应用(PWA)，提供数据记录、统计分析和离线使用能力。

## ✨ 功能特性
- 📝 收入记录表单（日期、金额、分类）
- 📊 可视化统计报表
- 🔄 本地数据持久化
- 📲 PWA离线支持
- 🎨 TailwindCSS样式系统

## 🛠️ 开发环境

### 前置要求
- Node.js 16+ 
- npm 9+

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

## 🚀 生产构建

### 常规构建模式
```bash
npm run build
```
构建产物将生成在 `dist/` 目录，包含：
- 静态资源哈希处理
- 代码分割优化
- 代码压缩优化
- 自动生成的Service Worker

### 单文件构建模式
```bash
npm run build:single
```
将所有资源（HTML、CSS、JavaScript、图片等）打包到一个单独的HTML文件中：
- 无需服务器，可直接在浏览器中打开
- 便于分享和离线使用
- 适合嵌入到其他应用或系统中

### 预览构建结果
```bash
npm run preview
```

## 📦 技术栈
- **框架**: React 18
- **构建工具**: Vite 4
- **样式**: TailwindCSS 3
- **类型系统**: TypeScript 5
- **PWA支持**: vite-plugin-pwa 0.16