import React from "react";
import { DollarSign, Wallet, PiggyBank, PieChart } from "lucide-react";

interface SummaryCardsProps {
  totalBudget: number;
  totalSpent: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalBudget,
  totalSpent,
}) => {
  const remaining = totalBudget - totalSpent;
  const spentPercent =
    totalBudget > 0
      ? Math.min(Math.round((totalSpent / totalBudget) * 100), 100)
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Total Budget Card */}
      <div className="bg-slate-900/80 p-5 rounded-2xl shadow-sm border border-slate-900 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Budget
          </p>
          <p className="text-2xl font-bold text-white mt-1">
            $
            {totalBudget.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="p-3 bg-indigo-900/80 text-indigo-600 rounded-xl">
          <Wallet className="w-6 h-6" />
        </div>
      </div>

      {/* Total Spent Card */}
      <div className="bg-slate-900/80 p-5 rounded-2xl shadow-sm border border-slate-900 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Spent
          </p>
          <p className="text-2xl font-bold text-rose-800 mt-1">
            $
            {totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="p-3 bg-rose-800/80 text-rose-600 rounded-xl">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>

      {/* Remaining Balance Card */}
      <div className="bg-slate-900/80 p-5 rounded-2xl shadow-sm border border-slate-900 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Remaining
          </p>
          <p
            className={`text-2xl font-bold mt-1 ${remaining >= 0 ? "text-emerald-600" : "text-rose-600"}`}
          >
            ${remaining.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div
          className={`p-3 rounded-xl ${remaining >= 0 ? "bg-emerald-800/80 text-emerald-600" : "bg-rose-800/80 text-rose-600"}`}
        >
          <PiggyBank className="w-6 h-6" />
        </div>
      </div>

      {/* Budget Used Card */}
      <div className="bg-slate-900/80 p-5 rounded-2xl shadow-sm border border-slate-900 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Budget Used
          </p>
          <p className="text-2xl font-bold text-white mt-1">{spentPercent}%</p>
        </div>
        <div className="p-3 bg-amber-800/80 text-amber-600 rounded-xl">
          <PieChart className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
