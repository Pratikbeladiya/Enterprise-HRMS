import React, { forwardRef } from "react";

export const TextArea = forwardRef(
  (
    {
      label,
      error,
      rows = 3,
      className = "",
      containerClassName = "",
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {label} {required && <span className="text-rose-400">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full text-sm rounded-2xl border bg-slate-900/90 text-white placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 px-4 py-2.5 ${
            error
              ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-rose-400 font-semibold">{error}</span>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
