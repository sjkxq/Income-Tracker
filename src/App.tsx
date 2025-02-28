import { useState, useEffect } from 'react';
import { IncomeForm } from './components/IncomeForm';
import { IncomeList } from './components/IncomeList';
import { Statistics } from './components/Statistics';
import { Income } from './types';

function App() {
  const [incomes, setIncomes] = useState<Income[]>(() => {
    const saved = localStorage.getItem('incomes');
    if (saved) {
      return JSON.parse(saved).map((income: any) => ({
        ...income,
        date: new Date(income.date)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes));
  }, [incomes]);

  const handleAdd = (income: Income) => {
    setIncomes([...incomes, income]);
  };

  const handleDelete = (id: string) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">收入追踪器</h1>
      <IncomeForm onAdd={handleAdd} />
      <IncomeList incomes={incomes} onDelete={handleDelete} />
      <Statistics incomes={incomes} />
    </div>
  );
}

export default App;
