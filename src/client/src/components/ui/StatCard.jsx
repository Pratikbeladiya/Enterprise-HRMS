import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
  trend,
  trendType = "up",
  className = "",
}) => {
  return (
    <div className={`relative overflow-hidden bg-slate-900/90 border border-slate-800/80 rounded-3xl p-5 sm:p-6 shadow-xl hover:border-slate-700/80 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group ${className}`}>
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3.5 rounded-2xl ${iconBg} shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10 font-normal">
          {subtitle && <span className="truncate">{subtitle}</span>}
          {trend && (
            <span
              className={`inline-flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded-full text-xs ${
                trendType === "up"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
              }`}
            >
              {trendType === "up" ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
