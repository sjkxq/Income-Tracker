import React from 'react';
import { format } from 'date-fns';
import { Income } from '../types';

interface Props {
  incomes: Income[];
  onDelete: (id: string) => void;
}

export const IncomeList: React.FC<Props> = ({ incomes, onDelete }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">收入记录</h2>
      {incomes.map((income) => (
        <div
          key={income.id}
          className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
        >
          <div>
            <div className="font-medium">{format(income.date, 'yyyy-MM-dd')}</div>
            <div className="text-green-600">¥{income.amount.toFixed(2)}</div>
          </div>
          <button
            onClick={() => onDelete(income.id)}
            className="text-red-500 hover:text-red-700"
          >
            删除
          </button>
        </div>
      ))}
    </div>
  );
};
