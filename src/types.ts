export  interface Income {
  id: string;
  date: Date;
  amount: number;
  description?: string;
  remark?: string; // 添加备注字段
}