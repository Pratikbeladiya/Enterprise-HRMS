import React, { forwardRef } from "react";

export const Select = forwardRef(
  (
    {
      label,
      error,
      options = [],
      placeholder = "Select option",
      className = "",
      containerClassName = "",
      required = false,
      children,
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
        <select
          ref={ref}
          className={`w-full text-sm rounded-2xl border bg-slate-900 text-white transition-all duration-200 focus:outline-none focus:ring-2 px-4 py-2.5 ${
            error
              ? "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20"
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error && <span className="text-xs text-rose-400 font-semibold">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";
