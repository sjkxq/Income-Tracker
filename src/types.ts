// 导出一个名为 Income 的接口，用于定义收入的数据结构
export interface Income {
  // 定义一个名为 id 的字符串字段，用于唯一标识收入记录
  id: string;
  // 定义一个名为 date 的 Date 类型字段，用于记录收入的日期
  date: Date;
  // 定义一个名为 amount 的数字字段，用于记录收入的金额
  amount: number;
  description?: string; // 添加可选字段提升兼容性
}