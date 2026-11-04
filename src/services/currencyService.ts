// src/services/expenseService.ts
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { UserSettings } from "../types";

const DEFAULT_SETTINGS: UserSettings = {
  currencyCode: "USD",
  currencySymbol: "$",
};

// Fetch user currency (defaults to USD if not set yet)
export const getUserSettings = async (
  userId: string,
): Promise<UserSettings> => {
  const settingsRef = doc(db, "userSettings", userId);
  const snap = await getDoc(settingsRef);

  if (snap.exists()) {
    return snap.data() as UserSettings;
  }

  return DEFAULT_SETTINGS;
};

// Update user currency in Firestore
export const updateUserSettings = async (
  userId: string,
  settings: UserSettings,
): Promise<void> => {
  const settingsRef = doc(db, "userSettings", userId);
  await setDoc(settingsRef, settings, { merge: true });
};
