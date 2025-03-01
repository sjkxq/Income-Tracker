    import React, { useState, useEffect } from "react";
    import { IncomeForm } from "./components/IncomeForm";
    import IncomeList from "./components/IncomeList";
    import { Statistics } from "./components/Statistics";
    import { Income } from "./types";
    import { format } from "date-fns"; // 导入 format 函数
    
    function App() {
      // 使用 useState 钩子管理收入列表，从 localStorage 中获取初始数据
      const [incomes, setIncomes] = useState<Income[]>(() => {
        const saved = localStorage.getItem("incomes");
        if (saved) {
          // 如果有保存的数据，解析 JSON 并将日期字符串转换为 Date 对象
          return JSON.parse(saved).map((income: any) => ({
            ...income,
            date: new Date(income.date),
          }));
        }
        return [];
      });
    
      // 使用 useEffect 钩子在收入列表变化时更新 localStorage
      useEffect(() => {
        localStorage.setItem("incomes", JSON.stringify(incomes));
      }, [incomes]);
    
      // 处理添加收入的函数
      const handleAdd = (income: Income) => {
        setIncomes([...incomes, income]);
      };
    
      // 处理删除收入的函数
      const handleDelete = (id: string) => {
        setIncomes(incomes.filter((income) => income.id !== id));
      };
    
      // 处理导出收入的函数
      const handleExport = () => {
        const data = JSON.stringify(incomes, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `income-${format(new Date(), "yyyy-MM-dd HH-mm")}.json`; // 使用 format 函数生成文件名
        link.click();
      };
    
      // 处理自动导出收入的函数
      const handleAutoExport = () => {
        handleExport();
      };
    
      // 读取文件的函数
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
    
      // 保存数据到文件的函数
      const saveToFile = (data: string, fileName: string) => {
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
      };
    
      // 处理导入收入的函数
      const handleImport = async (file: File) => {
        try {
          const content = await readFile(file);
          const imported = JSON.parse(content);
          if (
            Array.isArray(imported) &&
            imported.every((i) => i.id && i.date && i.amount)
          ) {
            // 检查导入的数据格式是否正确
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