// src/services/expenseService.ts
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category, Expense, NewCategory, NewExpense } from "../types";

// Collection References
const categoriesCol = collection(db, "categories");
const expensesCol = collection(db, "expenses");

// Helper to convert Firestore doc to Category object
const categoryFromDoc = (
  docSnap: QueryDocumentSnapshot<DocumentData>,
): Category => ({
  id: docSnap.id,
  ...(docSnap.data() as Omit<Category, "id">),
});

// Helper to convert Firestore doc to Expense object
const expenseFromDoc = (
  docSnap: QueryDocumentSnapshot<DocumentData>,
): Expense => ({
  id: docSnap.id,
  ...(docSnap.data() as Omit<Expense, "id">),
});

// 1. Add Category
export const addCategory = async (
  userId: string,
  category: NewCategory,
): Promise<string> => {
  const docRef = await addDoc(categoriesCol, {
    userId,
    ...category,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// 2. Fetch User Categories
export const getCategories = async (userId: string): Promise<Category[]> => {
  const q = query(categoriesCol, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(categoryFromDoc);
};

// 3. Add Expense
export const addExpense = async (
  userId: string,
  expense: NewExpense,
): Promise<string> => {
  const docRef = await addDoc(expensesCol, {
    userId,
    ...expense,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// 4. Get Expenses for a specific user and month (monthString: "YYYY-MM")
export const getMonthlyExpenses = async (
  userId: string,
  monthString: string,
): Promise<Expense[]> => {
  const q = query(expensesCol, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);

  // Filter expenses matching the YYYY-MM date string prefix
  return querySnapshot.docs
    .map(expenseFromDoc)
    .filter((exp) => exp.date.startsWith(monthString));
};

// 5. Delete Expense
export const deleteExpense = async (expenseId: string): Promise<void> => {
  const expenseDocRef = doc(db, "expenses", expenseId);
  await deleteDoc(expenseDocRef);
};
