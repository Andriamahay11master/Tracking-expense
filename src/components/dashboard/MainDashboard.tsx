import React from "react";
import { useAuth } from "../../context/AuthContext";
import { SummaryCards } from "../cards/SummaryCards";
import { Plus, LogOutIcon } from "lucide-react";
import { CategoryList } from "../category/CategoryList";
import expensesData from "../../data/expenses_data";
import categoriesData from "../../data/category_data";

const MainDashboard: React.FC = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <h1 className="text-3xl font-bold mb-4 text-slate-800">
          Expense Tracker
        </h1>
        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-row items-center justify-between py-4">
        <div className="basis-1/2">
          <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
        </div>
        <div className="basis-1/2 flex justify-end gap-2">
          <button className="px-4 py-2 bg-violet-900 text-white font-semibold rounded-md flex items-center gap-2 hover:bg-violet-800 mr-2">
            <Plus /> Add Expense
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
          >
            <LogOutIcon className="w-4 h-4 mr-1" />
            Sign Out
          </button>
        </div>
      </div>
      <SummaryCards totalBudget={10000} totalSpent={4500} />
      <div className="flex flex-row gap-4">
        <div className="basis-2/3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Expenses</h2>
          {/* Expenses list or chart can go here */}
        </div>
        <div className="basis-1/3 rounded-2xl shadow-sm border border-slate-900">
          {/* Category list or chart can go here */}
          <CategoryList
            expenses={expensesData}
            categories={categoriesData}
            onOpenAddCategoryModal={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
