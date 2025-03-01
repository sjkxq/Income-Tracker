// 引入React库和useState钩子
import React, { useState } from 'react';
// 引入react-datepicker组件
import DatePicker from 'react-datepicker';
// 引入react-datepicker的样式
import "react-datepicker/dist/react-datepicker.css";
// 引入Income类型定义
import { Income } from '../types';

// 定义组件的Props接口
interface Props {
  // 定义onAdd函数，接收一个Income类型的参数
  onAdd: (income: Income) => void;
}

// 导出IncomeForm组件，使用React.FC泛型定义组件类型，并传入Props接口
export const IncomeForm: React.FC<Props> = ({ onAdd }) => {
  // 使用useState钩子定义日期状态，初始值为当前日期
  const [date, setDate] = useState(new Date());
  // 使用useState钩子定义金额状态，初始值为空字符串
  const [amount, setAmount] = useState('');

  // 定义表单提交处理函数
  const handleSubmit = (e: React.FormEvent) => {
    // 阻止表单默认提交行为
    e.preventDefault();
    // 如果金额为空，则直接返回
    if (!amount) return;

    // 调用onAdd函数，传入新的Income对象
    onAdd({
      // 使用当前时间戳作为唯一ID
      id: Date.now().toString(),
      // 使用当前日期
      date,
      // 将金额字符串转换为浮点数
      amount: parseFloat(amount)
    });

    // 清空金额输入框
    setAmount('');
  };

  // 渲染表单
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">日期</label>
        <DatePicker
          // 设置选中的日期
          selected={date}
          // 日期变化时更新状态
          onChange={(date: Date) => setDate(date)}
          // 设置日期选择器的样式
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">金额</label>
        <input
          // 设置输入框类型为数字
          type="number"
          // 设置输入框的值为当前金额状态
          value={amount}
          // 输入框值变化时更新金额状态
          onChange={(e) => setAmount(e.target.value)}
          // 设置输入框的样式
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          // 设置输入框的步长为0.01
          step="0.01"
        />
      </div>
      <button
        // 设置按钮类型为提交
        type="submit"
        // 设置按钮的样式
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        添加收入
      </button>
    </form>
  );
};
