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
import { Expense, NewExpense } from "../types";

// Collection Reference
const expensesCol = collection(db, "expenses");

// Helper to convert Firestore doc to Expense object
const expenseFromDoc = (
  docSnap: QueryDocumentSnapshot<DocumentData>,
): Expense => ({
  id: docSnap.id,
  ...(docSnap.data() as Omit<Expense, "id">),
});

// 1. Add Expense
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

// 2. Get Expenses for a specific user and month (monthString: "YYYY-MM")
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

// 3. Delete Expense
export const deleteExpense = async (expenseId: string): Promise<void> => {
  const expenseDocRef = doc(db, "expenses", expenseId);
  await deleteDoc(expenseDocRef);
};
