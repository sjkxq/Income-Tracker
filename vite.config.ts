// 导入 defineConfig 函数，用于配置 Vite
import { defineConfig } from 'vite'
// 导入 @vitejs/plugin-react 插件，用于支持 React 语法
import react from '@vitejs/plugin-react'
// 导入 vite-plugin-pwa 插件，用于支持 PWA（渐进式网页应用）
import { VitePWA } from 'vite-plugin-pwa'
// 导入 vite-plugin-singlefile 插件，用于将所有资源内联到一个HTML文件
import { viteSingleFile } from 'vite-plugin-singlefile'

// 检查是否为单文件构建模式
const isSingleFileBuild = process.env.BUILD_MODE === 'single'

// 导出默认的 Vite 配置
export default defineConfig({
  // 配置插件
  plugins: [
    // 使用 react 插件
    react(),
    // 使用 VitePWA 插件，并传入配置对象
    VitePWA({
      // 自动更新类型
      registerType: 'autoUpdate',
      // 配置 PWA 的 manifest 文件
      manifest: {
        // 应用的名称
        name: 'Income Tracker',
        // 应用的短名称
        short_name: 'Income',
        // 应用的描述
        description: 'Track your income',
        // 应用的主题颜色
        theme_color: '#ffffff',
        // 应用的图标列表
        icons: [
          {
            // 图标文件路径
            src: '/icon-192x192.png',
            // 图标尺寸
            sizes: '192x192',
            // 图标类型
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    // 仅在单文件构建模式下使用 viteSingleFile 插件
    ...(isSingleFileBuild ? [viteSingleFile()] : [])
  ],
  // 配置开发服务器
  server: {
    // 允许所有主机名
    allowedHosts: true,
    // 服务器端口号
    port: 5176
  },
  // 构建配置
  build: {
    // 根据构建模式应用不同的配置
    ...(isSingleFileBuild
      ? {
          // 单文件构建模式的配置
          cssCodeSplit: false,
          assetsInlineLimit: Infinity,
          rollupOptions: {
            output: {
              // 空配置，让vite-plugin-singlefile处理打包逻辑
            },
          },
        }
      : {
          // 常规构建模式的配置
          cssCodeSplit: true,
          assetsInlineLimit: 4096, // 默认值
          rollupOptions: {
            output: {
              // 常规构建的输出配置
              manualChunks: {
                vendor: ['react', 'react-dom'],
                // 可以根据需要添加更多的代码分割配置
              },
            },
          },
        }),
  }
})