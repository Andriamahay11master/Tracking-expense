import React, { useState } from "react";

const AddBudgetModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddBudget: (budget: number) => Promise<void>;
}> = ({ isOpen, onClose, onAddBudget }) => {
  const [budget, setBudget] = useState<number>(0);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budget) return;

    try {
      await onAddBudget(budget);
      setBudget(0);
      onClose();
    } catch (error) {
      console.error("Failed to save budget:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Add Budget</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter budget amount"
            value={budget}
            onChange={(e) => setBudget(parseFloat(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;
