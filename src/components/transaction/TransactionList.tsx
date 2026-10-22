import React, { useState } from "react";
import { Expense, Category } from "../../types";
import { Search, Trash2, Filter } from "lucide-react";

interface TransactionListProps {
  expenses: Expense[];
  categories: Category[];
  onDeleteExpense: (expenseId: string) => Promise<void>;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  expenses,
  categories,
  onDeleteExpense,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Map category IDs for quick lookup
  const categoryMap = new Map<string, Category>(
    categories.map((c) => [c.id!, c]),
  );

  // Filter transactions based on search input & dropdown selection
  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch = exp.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "ALL" || exp.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-slate-800">
          Recent Transactions
        </h2>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Dropdown Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-3 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredExpenses.length === 0 ? (
        <p className="text-center text-slate-400 py-8 text-sm">
          No expenses found for this selection.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Description</th>
                <th className="pb-3 px-2">Category</th>
                <th className="pb-3 px-2 text-right">Amount</th>
                <th className="pb-3 px-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredExpenses.map((exp) => {
                const category = categoryMap.get(exp.categoryId);

                return (
                  <tr key={exp.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-2 text-slate-500 text-xs whitespace-nowrap">
                      {exp.date}
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-800">
                      {exp.description}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${category?.color || "#94a3b8"}20`,
                          color: category?.color || "#475569",
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: category?.color || "#94a3b8",
                          }}
                        />
                        {category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-semibold text-slate-800">
                      ${exp.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => exp.id && onDeleteExpense(exp.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                        title="Delete Expense"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
