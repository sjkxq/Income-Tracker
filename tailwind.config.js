/** @type {import('tailwindcss').Config} */
// 这行注释指定了该模块的类型为 Tailwind CSS 的配置类型，以便于 TypeScript 能够正确识别和类型检查
export default {
  // 导出一个默认的配置对象，这是 Tailwind CSS 所需要的配置格式
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // `content` 属性指定了 Tailwind CSS 应该扫描哪些文件来生成相应的样式
  // 这里包含了项目的入口 HTML 文件和 src 目录下所有的 JavaScript、TypeScript、JSX 和 TSX 文件
  theme: {
    extend: {},
  },
  // `theme` 属性用于扩展 Tailwind CSS 的默认主题配置
  // `extend` 对象允许你添加自定义的主题扩展，但在这里是空的，表示没有自定义扩展
  plugins: [],
  // `plugins` 属性用于添加 Tailwind CSS 插件，这些插件可以扩展 Tailwind 的功能
  // 这里是空的数组，表示没有添加任何插件
}
