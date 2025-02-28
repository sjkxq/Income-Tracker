  import React, { useState } from 'react';
  import { format } from 'date-fns';
  import { Income } from '../types';
  
  interface Props {
    incomes: Income[];
  }
  
  export const Statistics: React.FC<Props> = ({ incomes }) => {

    const [isAnnual, setIsAnnual] = useState(false);
  
    const stats = incomes.reduce((acc, income) => {
      const dateKey = isAnnual ? format(income.date, 'yyyy') : format(income.date, 'yyyy-MM');
      acc[dateKey] = (acc[dateKey] || 0) + income.amount;
      return acc;
    }, {} as Record<string, number>);
  
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">月度统计</h2>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {isAnnual ? "按月统计" : "按年统计"}
        </button>
        {Object.entries(stats).map(([date, total]) => (
          <div
            key={date}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
          >
            <div className="font-medium">{date}</div>
            <div className="text-green-600">¥{total.toFixed(2)}</div>
          </div>
        ))}
        {Object.keys(stats).length === 0 && <div className="text-center text-gray-500">暂无收入记录</div>}
      </div>
    );
  };