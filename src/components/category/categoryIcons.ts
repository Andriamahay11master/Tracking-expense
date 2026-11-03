import {
  Car,
  Coffee,
  Film,
  HeartPulse,
  House,
  ShoppingBag,
  Smartphone,
  Globe,
  Groceries,
} from "lucide-react";

export const CATEGORY_ICONS = {
  House,
  Shopping: ShoppingBag,
  Car,
  Health: HeartPulse,
  Coffee,
  Entertainment: Film,
  Film,
  Credit: Smartphone,
  Data: Globe,
  Groceries,
} as const;
