import React, { useState, useEffect } from "react";
import { IncomeForm } from "./components/IncomeForm";
import IncomeList from "./components/IncomeList";
import { Statistics } from "./components/Statistics";
import { Income } from "./types";

function App() {
  const [incomes, setIncomes] = useState<Income[]>(() => {
    const saved = localStorage.getItem("incomes");
    if (saved) {
      return JSON.parse(saved).map((income: any) => ({
        ...income,
        date: new Date(income.date),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [incomes]);

  const handleAdd = (income: Income) => {
    setIncomes([...incomes, income]);
  };

  const handleDelete = (id: string) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const handleExport = () => {
    const data = JSON.stringify(incomes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `income-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (
          Array.isArray(imported) &&
          imported.every((i) => i.id && i.date && i.amount)
        ) {
          setIncomes(
            imported.map((i) => ({
              ...i,
              date:
                new Date(i.date) instanceof Date &&
                !isNaN(new Date(i.date).getTime())
                  ? new Date(i.date)
                  : new Date(),
            }))
          );
        }
      } catch (error) {
        alert("文件格式不正确");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">收入追踪器</h1>
      <IncomeForm onAdd={handleAdd} />
      <IncomeList
        incomes={incomes}
        onDelete={handleDelete}
        onExport={handleExport}
        onImport={handleImport}
      />
      <Statistics incomes={incomes} />
    </div>
  );
}

export default App;
