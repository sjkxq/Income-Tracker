  // 引入React库和useState钩子，用于创建组件和管理状态
  import React, { useState } from 'react';
  // 引入date-fns库中的format函数，用于格式化日期
  import { format } from 'date-fns';
  // 引入Income类型定义，用于类型检查
  import { Income } from '../types';
  
  // 定义组件的Props接口，包含一个Income数组
  interface Props {
    incomes: Income[];
  }
  
  // 导出Statistics组件，使用React.FC泛型定义，并传入Props接口
  export const Statistics: React.FC<Props> = ({ incomes }) => {

    // 使用useState钩子管理是否按年统计的状态，初始值为false（按月统计）
    const [isAnnual, setIsAnnual] = useState(false);
  
    // 使用reduce函数遍历incomes数组，生成统计结果
    const stats = incomes.reduce((acc, income) => {
      // 根据isAnnual状态决定日期格式，年或年-月
      const dateKey = isAnnual ? format(income.date, 'yyyy') : format(income.date, 'yyyy-MM');
      // 将收入累加到对应的日期键中，如果键不存在则初始化为0
      acc[dateKey] = (acc[dateKey] || 0) + income.amount;
      return acc;
    }, {} as Record<string, number>); // 初始化acc为空对象，类型为字符串键和数字值的记录
  
    // 返回组件的JSX结构
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">月度统计</h2>
        <button
          // 点击按钮切换isAnnual状态
          onClick={() => setIsAnnual(!isAnnual)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {isAnnual ? "按月统计" : "按年统计"} {/* 根据isAnnual状态显示不同的文本 */}
        </button>
        {/* 遍历stats对象，生成统计结果的列表 */}
        {Object.entries(stats).map(([date, total]) => (
          <div
            key={date}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
          >
            <div className="font-medium">{date}</div> {/* 显示日期 */}
            <div className="text-green-600">¥{total.toFixed(2)}</div> {/* 显示总收入，保留两位小数 */}
          </div>
        ))}
        {/* 如果stats对象为空，显示暂无收入记录 */}
        {Object.keys(stats).length === 0 && <div className="text-center text-gray-500">暂无收入记录</div>}
      </div>
    );
  };