"use client";

import { useTheme } from "../context/ThemeContext";

export default function BackButton() {
  const { isDark } = useTheme();

  return (
    <button
      onClick={() => window.history.back()}
      className={` flex items-center gap-3 rounded-md px-6 py-2.5 text-sm shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        isDark
          ? "bg-slate-800 text-white hover:bg-slate-700"
          : "bg-white text-slate-900 hover:bg-slate-100"
      }`}
    >
      <span className="text-lg">←</span>
      <span>Back</span>
    </button>
  );
}

