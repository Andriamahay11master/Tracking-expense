// src/components/BudgetAlerts.tsx
import React, { useState } from "react";
import { Category, Expense } from "../../types";
import {
  AlertTriangle,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface BudgetAlertsProps {
  categories: Category[];
  expenses: Expense[];
}

interface AlertItem {
  category: Category;
  spent: number;
  budget: number;
  percentage: number;
  type: "exceeded" | "warning";
}

export const BudgetAlerts: React.FC<BudgetAlertsProps> = ({
  categories,
  expenses,
}) => {
  const [dismissedCategories, setDismissedCategories] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // 1. Calculate spending per category and filter for alerts (>85%)
  const alerts: AlertItem[] = categories
    .map((cat) => {
      const spent = expenses
        .filter((exp) => exp.categoryId === cat.id)
        .reduce((sum, exp) => sum + exp.amount, 0);

      const budget = cat.monthlyBudget;
      const percentage = budget > 0 ? (spent / budget) * 100 : 0;

      let type: "exceeded" | "warning" | null = null;
      if (percentage >= 100) {
        type = "exceeded";
      } else if (percentage >= 85) {
        type = "warning";
      }

      return { category: cat, spent, budget, percentage, type };
    })
    .filter(
      (item): item is AlertItem & { type: "exceeded" | "warning" } =>
        item.type !== null && !dismissedCategories.includes(item.category.id!),
    );

  // If no active alerts, render nothing
  if (alerts.length === 0) return null;

  const handleDismiss = (categoryId: string) => {
    setDismissedCategories((prev) => [...prev, categoryId]);
  };

  const exceededCount = alerts.filter((a) => a.type === "exceeded").length;
  const warningCount = alerts.filter((a) => a.type === "warning").length;

  return (
    <div className="mb-6 space-y-3">
      {/* Header Bar showing quick summary */}
      <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm">
              Budget Limit Attention Required
            </h3>
            <p className="text-xs text-slate-400">
              {exceededCount > 0 && `${exceededCount} exceeded`}
              {exceededCount > 0 && warningCount > 0 && " · "}
              {warningCount > 0 && `${warningCount} near limit`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          title={isExpanded ? "Collapse Banners" : "Expand Banners"}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Expanded List of Individual Alert Banners */}
      {isExpanded && (
        <div className="space-y-2.5">
          {alerts.map(({ category, spent, budget, percentage, type }) => {
            const isExceeded = type === "exceeded";
            const overAmount = spent - budget;

            return (
              <div
                key={category.id}
                className={`flex items-start justify-between p-4 rounded-xl border transition shadow-sm ${
                  isExceeded
                    ? "bg-rose-50/90 border-rose-200 text-rose-900"
                    : "bg-amber-50/90 border-amber-200 text-amber-900"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg mt-0.5 ${
                      isExceeded
                        ? "bg-rose-100 text-rose-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {isExceeded ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">
                        {category.name} Budget Alert
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          isExceeded
                            ? "bg-rose-200 text-rose-800"
                            : "bg-amber-200 text-amber-800"
                        }`}
                      >
                        {Math.round(percentage)}% Used
                      </span>
                    </div>

                    <p className="text-xs mt-1 text-slate-700">
                      {isExceeded ? (
                        <>
                          You have exceeded your limit by{" "}
                          <span className="font-bold text-rose-700">
                            ${overAmount.toFixed(2)}
                          </span>
                          . Spent: <strong>${spent.toFixed(2)}</strong> /
                          Budget: ${budget.toFixed(2)}
                        </>
                      ) : (
                        <>
                          You have used{" "}
                          <strong>{percentage.toFixed(1)}%</strong> of your
                          monthly limit. Remaining:{" "}
                          <span className="font-bold text-amber-800">
                            ${(budget - spent).toFixed(2)}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                {/* Dismiss Alert Button */}
                <button
                  onClick={() => handleDismiss(category.id!)}
                  className={`p-1.5 rounded-lg transition ${
                    isExceeded
                      ? "text-rose-400 hover:text-rose-700 hover:bg-rose-100"
                      : "text-amber-400 hover:text-amber-700 hover:bg-amber-100"
                  }`}
                  title="Dismiss alert"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
