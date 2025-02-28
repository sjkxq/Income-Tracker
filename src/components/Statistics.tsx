import React from 'react';
import { format } from 'date-fns';
import { Income } from '../types';

interface Props {
  incomes: Income[];
}

export const Statistics: React.FC<Props> = ({ incomes }) => {
  const stats = incomes.reduce((acc, income) => {
    const dateKey = format(income.date, 'yyyy-MM');
    acc[dateKey] = (acc[dateKey] || 0) + income.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">月度统计</h2>
      {Object.entries(stats).map(([date, total]) => (
        <div
          key={date}
          className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
        >
          <div className="font-medium">{date}</div>
          <div className="text-green-600">¥{total.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};
