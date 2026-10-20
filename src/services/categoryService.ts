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

import { Category, NewCategory } from "../types";

// Collection References
const categoriesCol = collection(db, "categories");

// Helper to convert Firestore doc to Category object
const categoryFromDoc = (
  docSnap: QueryDocumentSnapshot<DocumentData>,
): Category => ({
  id: docSnap.id,
  ...(docSnap.data() as Omit<Category, "id">),
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

// 3. Delete Category
export const deleteCategory = async (categoryId: string): Promise<void> => {
  const categoryDocRef = doc(db, "categories", categoryId);
  await deleteDoc(categoryDocRef);
};
