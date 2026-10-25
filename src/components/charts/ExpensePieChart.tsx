// src/components/ExpensePieChart.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Category, Expense } from "../../types";

interface ExpensePieChartProps {
  categories: Category[];
  expenses: Expense[];
}

interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}

// Custom Tooltip component for Recharts
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: PieDataPoint }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as PieDataPoint;
    return (
      <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{data.name}</p>
        <p className="text-slate-300 mt-0.5">
          Spent:{" "}
          <span className="font-bold text-white">${data.value.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const ExpensePieChart: React.FC<ExpensePieChartProps> = ({
  categories,
  expenses,
}) => {
  // Aggregate expenses by category
  const data: PieDataPoint[] = categories
    .map((cat) => {
      const totalSpent = expenses
        .filter((exp) => exp.categoryId === cat.id)
        .reduce((sum, exp) => sum + exp.amount, 0);

      return {
        name: cat.name,
        value: totalSpent,
        color: cat.color || "#6366f1",
      };
    })
    .filter((item) => item.value > 0); // Only display categories with spending

  if (data.length === 0) {
    return (
      <div className="bg-slate-900/80 p-6 rounded-2xl shadow-sm border border-slate-900 flex flex-col items-center justify-center min-h-[300px]">
        <p className="text-sm text-slate-400">
          No expenses logged for this period.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 p-6 rounded-2xl shadow-sm border border-slate-900">
      <h2 className="text-lg font-bold text-white mb-4">
        Spending by Category
      </h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={85}
              paddingAngle={7}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs text-slate-500 font-medium">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
