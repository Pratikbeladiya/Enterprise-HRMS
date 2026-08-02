import React from "react";

export const Card = ({ children, className = "", onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-900/90 border border-slate-800/80 rounded-3xl shadow-xl hover:border-slate-700/80 transition-all duration-300 overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`p-5 sm:p-6 border-b border-slate-800/80 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-base font-extrabold text-white tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardBody = ({ children, className = "" }) => (
  <div className={`p-5 sm:p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`p-4 sm:p-5 bg-slate-950/40 border-t border-slate-800/80 flex items-center justify-between ${className}`}>
    {children}
  </div>
);