// 引入React库和useState钩子
import React, { useState } from "react";
// 引入date-fns库中的format函数，用于格式化日期
import { format } from "date-fns";
// 引入Income类型定义，用于类型检查
import { Income } from "../types";

// 定义组件的Props接口，包含收入记录数组、删除函数、导出函数、导入函数
interface Props {
  incomes: Income[];
  onDelete: (id: string) => void;
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
  onAutoExport: () => void;
}

// 定义IncomeList组件，接收Props作为参数
const IncomeList: React.FC<Props> = ({
  incomes,
  onDelete,
  onExport,
  onImport,
}) => {
  // 使用useState钩子管理折叠状态，初始值为false
  const [collapsed, setCollapsed] = useState(false);

  // 切换折叠状态的函数
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // 渲染组件的JSX结构
  return (
    <div>
      {/* 标题和操作按钮的容器 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">收入记录</h2>
        <div className="space-x-2">
          {/* 切换折叠状态的按钮 */}
          <button
            onClick={toggleCollapse}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {collapsed ? "显示" : "隐藏"}
          </button>
          {/* 导入文件的按钮和隐藏的文件输入 */}
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
          {/* 导出文件的按钮 */}
          <button
            onClick={onExport}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            导出
          </button>
        </div>
      </div>
      {/* 如果不处于折叠状态，显示收入记录列表 */}
      {!collapsed && (
        <div className="space-y-4">
          {/* 遍历收入记录数组，生成每个记录的卡片 */}
          {incomes.map((income) => (
            <div
              key={income.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
            >
              <div>
                <div className="font-medium">
                  {format(income.date, "yyyy-MM-dd")}
                  {income.remark && (
                    <span className="text-sm text-gray-400"> - {income.remark}</span>
                  )}
                </div>
                {income.remark && (
                  <div className="text-sm text-gray-400">{income.remark}</div>
                )}
              </div>
              {/* 显示收入金额 */}
              <div className="text-green-600">¥{income.amount.toFixed(2)}</div>
              {/* 删除收入的按钮 */}
              <button
                onClick={() => onDelete(income.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                删除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 导出IncomeList组件
export default IncomeList;