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
```bash
npm run build
```
构建产物将生成在 `dist/` 目录，包含：
- 静态资源哈希处理
- 代码压缩优化
- 自动生成的Service Worker

### 预览构建结果
```bash
npm run preview
```

## 🚧 项目结构
```bash
.
├── public/          # 静态资源
├── src/
│   ├── components/  # React组件
│   │   ├── IncomeForm.tsx   # 收入表单
│   │   ├── IncomeList.tsx   # 收入列表 
│   │   └── Statistics.tsx   # 统计模块
│   ├── App.tsx      # 根组件
│   └── main.tsx     # 入口文件
├── tailwind.config.js  # Tailwind配置
└── vite.config.ts   # Vite配置
```

## 📦 技术栈
- **框架**: React 18
- **构建工具**: Vite 4
- **样式**: TailwindCSS 3
- **类型系统**: TypeScript 5
- **PWA支持**: vite-plugin-pwa 0.16

## 🔧 部署指南
### GitHub Pages
1. 安装部署工具
```bash
npm install gh-pages --save-dev
```

2. 添加部署脚本（已存在于package.json）：
```json
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

3. 执行部署
```bash
npm run deploy
```
