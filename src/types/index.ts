export interface Category {
  id?: string;
  userId: string;
  name: string;
  color: string;
  icon?: string;
  monthlyBudget: number;
  createdAt?: Date;
}

export interface Expense {
  id?: string;
  userId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string; // ISO string format: "YYYY-MM-DD"
  createdAt?: Date;
}

export type NewExpense = Omit<Expense, "id" | "userId" | "createdAt">;
export type NewCategory = Omit<Category, "id" | "userId" | "createdAt">;
