// 修改文件：src/types.ts
export interface Income {
  id: string;
  date: Date;
  amount: number;
  description?: string; // 添加可选字段提升兼容性
}