// src/components/DailyBarChart.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Expense } from "../../types";

interface DailyBarChartProps {
  expenses: Expense[];
  currentMonth: string; // Format: "YYYY-MM"
}

interface BarDataPoint {
  day: string;
  total: number;
}

interface CustomBarTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: BarDataPoint; value?: number }>;
  label?: string;
}

const CustomBarTooltip = ({
  active,
  payload,
  label,
}: CustomBarTooltipProps) => {
  if (active && payload && payload.length) {
    const value = payload[0].value || 0;
    return (
      <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-slate-300 mt-0.5">
          Total:{" "}
          <span className="font-bold text-white">${value.toFixed(2)}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const DailyBarChart: React.FC<DailyBarChartProps> = ({
  expenses,
  currentMonth,
}) => {
  // Extract year and month, then generate array for all days in month
  const [yearStr, monthStr] = currentMonth.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const daysInMonth = new Date(year, month, 0).getDate();

  // Create an initial map for days 1 through daysInMonth
  const data: BarDataPoint[] = Array.from(
    { length: daysInMonth },
    (_, index) => {
      const dayNum = index + 1;
      const dayString = `${currentMonth}-${dayNum.toString().padStart(2, "0")}`;

      const dailyTotal = expenses
        .filter((exp) => exp.date === dayString)
        .reduce((sum, exp) => sum + exp.amount, 0);

      return {
        day: `${dayNum}`,
        total: dailyTotal,
      };
    },
  );

  return (
    <div className="bg-slate-900/80 p-6 rounded-2xl shadow-sm border border-slate-900">
      <h2 className="text-lg font-bold text-white mb-4">
        Daily Spending Velocity
      </h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="total" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
