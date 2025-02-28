import React from "react";
import { format } from "date-fns";
import { Income } from "../types";

interface Props {
  incomes: Income[];
  onDelete: (id: string) => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

const IncomeList: React.FC<Props> = ({
  incomes,
  onDelete,
  onExport,
  onImport,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">收入记录</h2>
        <div className="space-x-2">
          <label className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
            导入
            <input
              type="file"
              className="hidden"
              accept=".json"
              onChange={(e) =>
                e.target.files?.[0] && onImport(e.target.files[0])
              }
            />
          </label>
          <button
            onClick={onExport}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            导出
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {incomes.map((income) => (
          <div
            key={income.id}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
          >
            <div>
              <div className="font-medium">
                {format(income.date, "yyyy-MM-dd")}
              </div>
              <div className="text-gray-500">{income.description}</div>
            </div>
            <div className="text-green-600">¥{income.amount.toFixed(2)}</div>
            <button
              onClick={() => onDelete(income.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              删除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
