import React from "react";
import { useAuth } from "../../context/AuthContext";

const MainDashboard: React.FC = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <h1 className="text-3xl font-bold mb-4 text-slate-800">
          Expense Tracker
        </h1>
        <button
          onClick={loginWithGoogle}
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.displayName}</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded hover:bg-slate-300"
        >
          Sign Out
        </button>
      </div>
      <p className="text-slate-600">
        Your Auth Context and Firestore service are ready!
      </p>
    </div>
  );
};

export default MainDashboard;
