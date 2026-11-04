// src/context/CurrencyContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import {
  getUserSettings,
  updateUserSettings,
} from "../services/currencyService";
import { CurrencyOption, SUPPORTED_CURRENCIES, UserSettings } from "../types";

interface CurrencyContextType {
  currency: UserSettings;
  formatAmount: (amount: number) => string;
  changeCurrency: (newCurrency: CurrencyOption) => Promise<void>;
  loadingSettings: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [currency, setCurrency] = useState<UserSettings>({
    currencyCode: "USD",
    currencySymbol: "$",
  });
  const [loadingSettings, setLoadingSettings] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      setCurrency({ currencyCode: "USD", currencySymbol: "$" });
      setLoadingSettings(false);
      return;
    }

    // Load saved currency from Firestore on login
    getUserSettings(user.uid)
      .then((settings) => setCurrency(settings))
      .catch((err) => console.error("Error loading currency settings:", err))
      .finally(() => setLoadingSettings(false));
  }, [user]);

  const changeCurrency = async (option: CurrencyOption) => {
    const newSettings: UserSettings = {
      currencyCode: option.code,
      currencySymbol: option.symbol,
    };
    setCurrency(newSettings);

    if (user) {
      await updateUserSettings(user.uid, newSettings);
    }
  };

  // Helper function to format numbers with current symbol (e.g., "$100.00" or "Ar 100.00")
  const formatAmount = (amount: number): string => {
    return `${currency.currencySymbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, formatAmount, changeCurrency, loadingSettings }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
