// src/components/LandingHero.tsx
import React from "react";
import {
  Wallet,
  TrendingUp,
  PieChart,
  ShieldCheck,
  ArrowRight,
  BellRing,
} from "lucide-react";

interface LandingHeroProps {
  loginWithGoogle: () => Promise<void>;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  loginWithGoogle,
}) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <Wallet className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            SpendSmart
          </span>
        </div>
        <button
          onClick={loginWithGoogle}
          className="text-sm font-semibold px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition"
        >
          Sign In
        </button>
      </header>

      {/* Hero Body */}
      <main className="max-w-7xl w-full mx-auto px-6 py-12 lg:py-20 z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Value Proposition */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase">
            <TrendingUp className="w-3.5 h-3.5" /> Real-time Monthly Budget
            Tracker
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Take full control of your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
              monthly spending.
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Organize expenses by category, track budget progress in real time,
            and receive instant alert warnings before you overspend. Simple,
            clear, and completely secure.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={loginWithGoogle}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold text-base rounded-2xl shadow-xl shadow-indigo-600/25 hover:bg-indigo-500 active:scale-95 transition-all"
            >
              {/* Google G Logo SVG */}
              <svg
                className="w-5 h-5 bg-white rounded-full p-0.5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Get Started with Google
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Key Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 text-indigo-400 rounded-lg">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-200">
                  Category Analytics
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Visual charts for every expense
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 text-amber-400 rounded-lg">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-200">
                  Budget Alerts
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Warnings at 85% & 100% spending
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-800 text-emerald-400 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-200">
                  Cloud Sync
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time sync via Firestore
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preview Card UI Mockup */}
        <div className="lg:col-span-5 relative">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 p-6 rounded-3xl shadow-2xl space-y-5 transform hover:-translate-y-1 transition duration-300">
            <div className="flex justify-between items-center pb-4 border-b border-slate-700/60">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Monthly Overview
                </p>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  October 2026
                </h3>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
                On Track
              </span>
            </div>

            {/* Mock Budget Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Groceries & Dining</span>
                <span className="text-slate-400">$420 / $500</span>
              </div>
              <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[84%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Shopping & Tech</span>
                <span className="text-rose-400 font-bold">
                  $340 / $300 (Exceeded)
                </span>
              </div>
              <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full w-full" />
              </div>
            </div>

            {/* Mock Transaction item */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 mb-2">
                Recent Logs
              </p>
              <div className="flex justify-between items-center p-3 bg-slate-900/60 rounded-xl text-xs border border-slate-700/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-slate-200 font-medium">
                    Weekly Supermarket Run
                  </span>
                </div>
                <span className="text-white font-bold">$128.50</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto px-6 py-6 text-center text-xs text-slate-500 border-t border-slate-800/80 z-10">
        © 2026 SpendSmart. Built with React, Vite, and Firebase by{" "}
        <span className="text-slate-300 font-medium">
          IRIMANANA Henikaja Andriamahay
        </span>
      </footer>
    </div>
  );
};
