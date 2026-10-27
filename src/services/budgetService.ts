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
import { Budget, NewBudget } from "../types";

// Collection Reference
const budgetsCol = collection(db, "budgets");

// Helper to convert Firestore doc to Budget object
const budgetFromDoc = (
  docSnap: QueryDocumentSnapshot<DocumentData>,
): Budget => ({
  id: docSnap.id,
  ...(docSnap.data() as Omit<Budget, "id">),
});

// 1.Add Budget
export const addBudget = async (
  userId: string,
  budget: NewBudget,
): Promise<string> => {
  const docRef = await addDoc(budgetsCol, {
    userId,
    ...budget,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// 2. Get last Budget for a specific user
export const getLastBudget = async (userId: string): Promise<Budget | null> => {
  const q = query(budgetsCol, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return budgetFromDoc(lastDoc);
};

// 3. Delete Budget
export const deleteBudget = async (budgetId: string): Promise<void> => {
  await deleteDoc(doc(budgetsCol, budgetId));
};
