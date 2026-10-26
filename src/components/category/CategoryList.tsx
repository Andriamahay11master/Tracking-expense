import React from "react";
import { Category, Expense } from "../../types";
import { Plus, Tag } from "lucide-react";
import { CATEGORY_ICONS } from "./categoryIcons";

interface CategoryListProps {
  categories: Category[];
  expenses: Expense[];
  onOpenAddCategoryModal: () => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  expenses,
  onOpenAddCategoryModal,
}) => {
  // Helper to calculate total spending per category
  const getCategorySpent = (categoryId: string) => {
    return expenses
      .filter((exp) => exp.categoryId === categoryId)
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-900">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">Categories Budgets</h2>
        <button
          onClick={onOpenAddCategoryModal}
          className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800 text-indigo-400 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
        >
          <Plus className="w-4 h-4" />
          New
        </button>
      </div>

      {categories.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-6">
          No categories added yet.
        </p>
      ) : (
        <div className="space-y-4">
          {categories.map((cat) => {
            const spent = getCategorySpent(cat.id!);
            const Icon =
              Object.entries(CATEGORY_ICONS).find(
                ([name]) => name === cat.icon,
              )?.[1] ?? Tag;
            const percentage =
              cat.monthlyBudget > 0
                ? Math.min((spent / cat.monthlyBudget) * 100, 100)
                : 0;
            const isOver = spent > cat.monthlyBudget;

            return (
              <div
                key={cat.id}
                className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="flex flex-row">
                      <Icon className="w-5 h-5 text-white mr-2" />
                    </div>
                    <span className="font-semibold text-white text-sm">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    ${spent.toFixed(2)} /{" "}
                    <span className="text-slate-400">
                      ${cat.monthlyBudget.toFixed(2)}
                    </span>
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isOver
                        ? "bg-rose-500"
                        : percentage > 85
                          ? "bg-amber-500"
                          : "bg-indigo-600"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
