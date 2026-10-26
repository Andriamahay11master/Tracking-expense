// src/components/AddCategoryModal.tsx
import React, { useState } from "react";
import { NewCategory } from "../../types";
import {
  X,
  Tag,
  DollarSign,
  Palette,
} from "lucide-react";
import { CATEGORY_ICONS } from "../category/categoryIcons";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: NewCategory) => Promise<void>;
}

const PRESET_COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Rose
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#EC4899", // Pink
  "#64748B", // Slate
];

const PRELIST_ICON = Object.entries(CATEGORY_ICONS).filter(
  ([name]) => name !== "Film",
).map(([name, icon]) => ({ name, icon }));

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAddCategory,
}) => {
  const [name, setName] = useState<string>("");
  const [monthlyBudget, setMonthlyBudget] = useState<string>("");
  const [color, setColor] = useState<string>(PRESET_COLORS[0]);
  const [icon, setIcon] = useState<string>("House");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !monthlyBudget) return;

    try {
      setIsSubmitting(true);
      await onAddCategory({
        name,
        monthlyBudget: parseFloat(monthlyBudget),
        color,
        icon,
      });

      // Reset form & close
      setName("");
      setMonthlyBudget("");
      setColor(PRESET_COLORS[0]);
      setIcon("House");
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.error("Failed to save category:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-slate-800 w-full max-w-md rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-500 bg-slate-700/50">
          <h3 className="font-bold text-white text-lg">Create Category</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Category Name
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Dining Out"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-900 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Monthly Budget */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Monthly Budget ($)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="500.00"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-900 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Color Picker Swatches */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Badge Color
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map((presetColor) => (
                <button
                  type="button"
                  key={presetColor}
                  onClick={() => setColor(presetColor)}
                  className={`w-7 h-7 rounded-full border-2 transition ${
                    color === presetColor
                      ? "border-white scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: presetColor }}
                />
              ))}

              {/* Native Color Picker Input */}
              <label className="relative cursor-pointer">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="sr-only"
                />
                <div
                  className="w-7 h-7 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-500 hover:border-slate-500 transition"
                  title="Custom Color"
                >
                  <Palette className="w-3.5 h-3.5" />
                </div>
              </label>
            </div>
          </div>

          {/*Icon category*/}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Icon Category
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRELIST_ICON.map((item) => {
                return (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setIcon(item.name)}
                    className={`w-7 h-7 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-500 hover:border-slate-500 transition ${
                      icon === item.name
                        ? "border-white scale-110"
                        : "border-transparent"
                    }`}
                  >
                    {React.createElement(item.icon, {
                      className: "w-4 h-4 text-white",
                    })}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md transition disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
