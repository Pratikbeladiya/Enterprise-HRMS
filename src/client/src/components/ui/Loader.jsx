import React from "react";
import { Loader2 } from "lucide-react";

export const Loader = ({ fullPage = false, text = "Loading..." }) => {
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 border border-slate-100">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-sm font-semibold text-slate-700">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 gap-3 text-slate-500">
      <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};