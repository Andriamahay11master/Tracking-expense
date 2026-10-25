import React from "react";
import { useAuth } from "../../context/AuthContext";
import { SummaryCards } from "../cards/SummaryCards";
import { Plus, LogOutIcon } from "lucide-react";
import { CategoryList } from "../category/CategoryList";
import expensesData from "../../data/expenses_data";
import categoriesData from "../../data/category_data";
import { TransactionList } from "../transaction/TransactionList";
import { AddExpenseModal } from "../modal/AddExpenseModal";
import { AddCategoryModal } from "../modal/AddCategoryModal";
import { ExpensePieChart } from "../charts/ExpensePieChart";
import { DailyBarChart } from "../charts/DailyBarChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();

const MainDashboard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = React.useState(
    `${currentYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
  );
  const monthlyExpenses = expensesData.filter((expense) =>
    expense.date.startsWith(`${selectedMonth}-`),
  );
  const { user, loginWithGoogle, logout } = useAuth();
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    React.useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] =
    React.useState(false);

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
          <button
            className="px-4 py-2 bg-violet-900 text-white font-semibold rounded-md flex items-center gap-2 hover:bg-violet-800 mr-2"
            onClick={() => setIsAddExpenseModalOpen(true)}
          >
            <Plus /> Add Expense
          </button>
          {/* filter by month and year */}
          <select
            className="px-3 py-2 bg-slate-800 text-white rounded-md focus:outline-none mr-2"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
            }}
          >
            {months.map((month, index) => {
              const monthValue = `${currentYear}-${String(index + 1).padStart(2, "0")}`;
              return (
                <option key={monthValue} value={monthValue}>
                  {month} {currentYear}
                </option>
              );
            })}
          </select>
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
      <div className="flex flex-row gap-4 py-4">
        <div className="basis-2/3">
          <DailyBarChart
            expenses={monthlyExpenses}
            currentMonth={selectedMonth}
          />
        </div>
        <div className="basis-1/3">
          <ExpensePieChart
            categories={categoriesData}
            expenses={monthlyExpenses}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="basis-2/3">
          {/* Expenses list or chart can go here */}
          <TransactionList
            expenses={expensesData}
            categories={categoriesData}
            onEditExpense={(expenseId: string) => {
              // Implement edit logic here
              console.log(`Edit expense with ID: ${expenseId}`);
            }}
            onDeleteExpense={async (expenseId: string) => {
              // Implement deletion logic here
              console.log(`Delete expense with ID: ${expenseId}`);
            }}
          />
        </div>
        <div className="basis-1/3">
          {/* Category list or chart can go here */}
          <CategoryList
            expenses={expensesData}
            categories={categoriesData}
            onOpenAddCategoryModal={() => setIsAddCategoryModalOpen(true)}
          />
        </div>
      </div>

      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        categories={categoriesData}
        onAddExpense={async (newExpense) => {
          // Implement add expense logic here
          console.log("Adding new expense:", newExpense);
        }}
      />

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={async (newCategory) => {
          // Implement add category logic here
          console.log("Adding new category:", newCategory);
        }}
      />
    </div>
  );
};

export default MainDashboard;
