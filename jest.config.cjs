module.exports = {
  // 测试环境
  testEnvironment: 'jsdom',
  
  // 限制工作进程数量为1（适合单核环境）
  maxWorkers: "1",
  
  // 测试文件匹配模式
  testMatch: [
    '<rootDir>/tests/**/*.test.{ts,tsx}',
  ],
  
  // 转换器配置 - 更新ts-jest配置方式
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true
      }
    }]
  },
  
  // 不转换node_modules中的文件（除了需要转换的特定模块）
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library|react-datepicker)/)'
  ],
  
  // 模块名称映射，用于简化导入路径
  moduleNameMapper: {
    // 处理CSS导入 - 修复react-datepicker CSS问题
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/__mocks__/styleMock.js',
    // 处理图片导入
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  
  // 设置文件
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js',
  ],
  
  // 覆盖率配置 - 默认不收集覆盖率以提高性能
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text'], // 只保留文本报告以减少内存使用
  
  // 忽略的文件或目录
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
  ],
  
  // 设置较短的测试超时时间
  testTimeout: 10000, // 10秒
  
  // 减少详细输出
  verbose: false,
  
  // 缓存转换结果以提高性能
  cache: true,
  
  // 扩展名解析
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};