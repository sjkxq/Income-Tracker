    import React, { useState, useEffect } from "react";
    import { IncomeForm } from "./components/IncomeForm";
    import IncomeList from "./components/IncomeList";
    import { Statistics } from "./components/Statistics";
    import { Income } from "./types";
    import { format } from "date-fns"; // 导入 format 函数
    
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
        link.download = `income-${format(new Date(), "yyyy-MM-dd HH-mm")}.json`; // 使用 format 函数
        link.click();
      };
    
      const handleAutoExport = () => {
        handleExport();
      };
    
      const readFile = async (file: File): Promise<any> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target?.result);
          };
          reader.onerror = reject;
          reader.readAsText(file);
        });
      };
    
      const saveToFile = (data: string, fileName: string) => {
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
      };
    
      const handleImport = async (file: File) => {
        try {
          const content = await readFile(file);
          const imported = JSON.parse(content);
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
          } else {
            alert("文件格式不正确");
          }
        } catch (error) {
          alert("导入失败");
        }
      };
    
      return (
        <div className="max-w-lg mx-auto p-4 space-y-8">
          <h1 className="text-2xl font-bold text-center">收入追踪器</h1>
          <IncomeForm onAdd={handleAdd} />
          <Statistics incomes={incomes} />
          <IncomeList
            incomes={incomes}
            onDelete={handleDelete}
            onExport={handleExport}
            onImport={handleImport}
            onAutoExport={handleAutoExport}
          />
        </div>
      );
    }
    
    export default App;