import React from "react";
import { useAuth } from "../../context/AuthContext";
import { SummaryCards } from "../cards/SummaryCards";
import { Plus, LogOutIcon } from "lucide-react";
import { CategoryList } from "../category/CategoryList";
import { TransactionList } from "../transaction/TransactionList";
import { AddExpenseModal } from "../modal/AddExpenseModal";
import { AddCategoryModal } from "../modal/AddCategoryModal";
import { ExpensePieChart } from "../charts/ExpensePieChart";
import { DailyBarChart } from "../charts/DailyBarChart";
import { Category, Expense, NewCategory, NewExpense } from "../../types";
import { addCategory, getCategories } from "../../services/categoryService";
import {
  addExpense,
  getMonthlyExpenses,
  getTotalExpensesForMonth,
} from "../../services/expenseService";
import AddBudgetModal from "../modal/AddBudgetModal";
import { addBudget, getLastBudget } from "../../services/budgetService";

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
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [totalExpenses, setTotalExpenses] = React.useState(0);
  const monthlyExpenses = expenses.filter((expense) =>
    expense.date.startsWith(`${selectedMonth}-`),
  );
  const { user, loginWithGoogle, logout } = useAuth();
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] =
    React.useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] =
    React.useState(false);
  const [isChangeBudgetModalOpen, setIsChangeBudgetModalOpen] =
    React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [budget, setBudget] = React.useState<number | null>(null);
  const userId = user?.uid;
  const defaultBudget = budget ? budget : 5000;

  React.useEffect(() => {
    if (!userId) {
      setCategories([]);
      setExpenses([]);
      setTotalExpenses(0);
      setBudget(null);
      return;
    }

    let isActive = true;
    const loadCategories = async () => {
      try {
        const userCategories = await getCategories(userId);
        if (isActive) setCategories(userCategories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    void loadCategories();
    const loadExpenses = async () => {
      try {
        const [userExpenses, total] = await Promise.all([
          getMonthlyExpenses(userId, selectedMonth),
          getTotalExpensesForMonth(userId, selectedMonth),
        ]);
        if (isActive) {
          setExpenses(userExpenses);
          setTotalExpenses(total);
        }
      } catch (error) {
        console.error("Failed to load expenses:", error);
      }
    };
    void loadExpenses();
    const loadBudget = async () => {
      try {
        const lastBudget = await getLastBudget(userId);
        if (isActive) {
          setBudget(lastBudget ? parseFloat(lastBudget.budgetMonthly) : null);
        }
      } catch (error) {
        console.error("Failed to load budget:", error);
      }
    };
    void loadBudget();
    return () => {
      isActive = false;
    };
  }, [userId, selectedMonth]);

  const handleAddCategory = async (newCategory: NewCategory) => {
    if (!userId) {
      throw new Error("You must be signed in to add a category.");
    }

    const id = await addCategory(userId, newCategory);
    setCategories((currentCategories) => [
      ...currentCategories,
      { ...newCategory, id, userId },
    ]);
  };

  const handleAddExpense = async (newExpense: NewExpense) => {
    if (!userId) {
      throw new Error("You must be signed in to add an expense.");
    }

    const id = await addExpense(userId, newExpense);
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { ...newExpense, id, userId },
    ]);
  };

  const handleAddBudget = async (budget: number) => {
    if (!userId) {
      throw new Error("You must be signed in to set a budget.");
    }
    const budgetString = budget.toString();
    await addBudget(userId, { budgetMonthly: budgetString });
    setBudget(budget);
  };

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
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between py-4">
        <div className="md:basis-1/2">
          <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
        </div>
        <div className="flex flex-col md:flex-row items-start md:justify-end gap-2 md:basis-1/2 ">
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
      <div className="flex flex-row py-4 items-center">
        <button
          className="px-4 py-2 bg-violet-900 text-white font-semibold rounded-md flex items-center gap-2 hover:bg-violet-800 mr-2"
          onClick={() => setIsChangeBudgetModalOpen(true)}
        >
          <Plus /> Change Budget
        </button>
      </div>
      <SummaryCards totalBudget={defaultBudget} totalSpent={totalExpenses} />
      <div className="flex flex-row gap-4 py-4">
        <div className="basis-2/3">
          <DailyBarChart
            expenses={monthlyExpenses}
            currentMonth={selectedMonth}
          />
        </div>
        <div className="basis-1/3">
          <ExpensePieChart categories={categories} expenses={monthlyExpenses} />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="basis-2/3">
          {/* Expenses list or chart can go here */}
          <TransactionList
            expenses={monthlyExpenses}
            categories={categories}
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
            expenses={monthlyExpenses}
            categories={categories}
            onOpenAddCategoryModal={() => setIsAddCategoryModalOpen(true)}
          />
        </div>
      </div>

      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        categories={categories}
        onAddExpense={handleAddExpense}
      />

      <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onAddCategory={handleAddCategory}
      />

      <AddBudgetModal
        isOpen={isChangeBudgetModalOpen}
        onClose={() => setIsChangeBudgetModalOpen(false)}
        onAddBudget={handleAddBudget}
      />
    </div>
  );
};

export default MainDashboard;
