import React from "react";

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const variants = {
    default: "bg-slate-800/80 text-slate-300 border-slate-700/60",
    primary: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    info: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px] font-bold",
    md: "px-2.5 py-1 text-xs font-bold",
    lg: "px-3 py-1 text-sm font-bold",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border tracking-wider uppercase backdrop-blur-xs ${variants[variant] || variants.default} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};