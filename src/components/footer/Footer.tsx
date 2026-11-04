export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer
      className={`max-w-7xl w-full mx-auto px-6 py-6 text-center text-xs text-slate-500 border-t border-slate-800/80 z-10 ${className}`}
    >
      © 2026 SpendSmart. Built with React, Vite, and Firebase by{" "}
      <span className="text-slate-300 font-medium">
        IRIMANANA Henikaja Andriamahay
      </span>
    </footer>
  );
};
