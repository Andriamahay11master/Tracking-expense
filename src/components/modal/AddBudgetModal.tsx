import { DollarSign, X } from "lucide-react";
import React, { useState } from "react";

const AddBudgetModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddBudget: (budget: number) => Promise<void>;
}> = ({ isOpen, onClose, onAddBudget }) => {
  const [budget, setBudget] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;

    try {
      setIsSubmitting(true);
      await onAddBudget(budget);
      setBudget(0);
      onClose();
    } catch (error) {
      setSubmitError("Failed to save budget. Please try again.");
      setIsSubmitting(false);
      console.error("Failed to save budget:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-slate-800 w-full max-w-md rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-500 bg-slate-700/50">
          <h3 className="font-bold text-white text-lg">Add New Budget</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/*Budget Field*/}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Budget ($)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="0.00"
                value={budget}
                onChange={(e) => setBudget(parseFloat(e.target.value))}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 text-white border border-slate-900 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-500">
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
              {isSubmitting ? "Saving..." : "Add Budget"}
            </button>
          </div>

          {/* Error Message */}
          {submitError && <p className="text-red-500 mt-2">{submitError}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;
