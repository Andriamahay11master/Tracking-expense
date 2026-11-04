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

export interface Budget {
  id?: string;
  userId: string;
  budgetMonthly: string;
  createdAt?: Date;
}

export type NewExpense = Omit<Expense, "id" | "userId" | "createdAt">;
export type NewCategory = Omit<Category, "id" | "userId" | "createdAt">;
export type NewBudget = Omit<Budget, "id" | "userId" | "createdAt">;

export interface CurrencyOption {
  code: string; // e.g. "USD", "EUR", "MGA", "GBP"
  symbol: string; // e.g. "$", "€", "Ar", "£"
  label: string; // e.g. "USD ($) - US Dollar"
}

export interface UserSettings {
  currencyCode: string;
  currencySymbol: string;
}

export const SUPPORTED_CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", label: "USD ($) - US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR (€) - Euro" },
  { code: "MGA", symbol: "Ar", label: "MGA (Ar) - Malagasy Ariary" },
  { code: "MUR", symbol: "Rs", label: "MUR (Rs) - Mauritian Rupee" },
  { code: "GBP", symbol: "£", label: "GBP (£) - British Pound" },
  { code: "CAD", symbol: "CA$", label: "CAD ($) - Canadian Dollar" },
  { code: "JPY", symbol: "¥", label: "JPY (¥) - Japanese Yen" },
];
