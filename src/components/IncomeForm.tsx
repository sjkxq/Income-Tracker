import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Income } from '../types';

interface Props {
  onAdd: (income: Income) => void;
}

export const IncomeForm: React.FC<Props> = ({ onAdd }) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    onAdd({
      id: Date.now().toString(),
      date,
      amount: parseFloat(amount)
    });

    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">日期</label>
        <DatePicker
          selected={date}
          onChange={(date: Date) => setDate(date)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">金额</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          step="0.01"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        添加收入
      </button>
    </form>
  );
};
