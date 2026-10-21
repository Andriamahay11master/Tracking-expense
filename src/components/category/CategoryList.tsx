import React from "react";
import { Category, Expense } from "../../types";
import { Plus } from "lucide-react";

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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-800">
          Categories & Budgets
        </h2>
        <button
          onClick={onOpenAddCategoryModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition"
        >
          <Plus className="w-4 h-4" />
          New Category
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
            const percentage =
              cat.monthlyBudget > 0
                ? Math.min((spent / cat.monthlyBudget) * 100, 100)
                : 0;
            const isOver = spent > cat.monthlyBudget;

            return (
              <div key={cat.id} className="p-3.5 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="font-semibold text-slate-700 text-sm">
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
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
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
