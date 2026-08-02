import React from "react";
import { FolderOpen } from "lucide-react";

export const Table = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = "No records found",
  emptyDescription = "There are no data items to display at this moment.",
}) => {
  if (isLoading) {
    return (
      <div className="w-full bg-slate-900/90 rounded-3xl border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/40">
          <div className="h-4 bg-slate-800 rounded-full w-1/4 animate-pulse" />
        </div>
        <div className="divide-y divide-slate-800/80 p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex items-center justify-between gap-4 py-2.5">
              <div className="h-4 bg-slate-800 rounded-full w-1/3 animate-pulse" />
              <div className="h-4 bg-slate-800 rounded-full w-1/4 animate-pulse" />
              <div className="h-4 bg-slate-800 rounded-full w-1/5 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-slate-900/90 rounded-3xl border border-slate-800/80 p-12 text-center shadow-xl">
        <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-indigo-500/20 shadow-md">
          <FolderOpen className="w-7 h-7" />
        </div>
        <h4 className="text-base font-bold text-white">{emptyMessage}</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900/90 rounded-3xl border border-slate-800/80 overflow-x-auto shadow-xl">
      <table className="w-full text-left text-sm text-slate-300 border-collapse">
        <thead className="bg-slate-950/60 text-[11px] uppercase font-bold text-slate-400 border-b border-slate-800/80 tracking-wider">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                className={`py-4 px-5 ${col.headerClassName || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {data.map((row, rowIdx) => (
            <tr
              key={row._id || row.id || rowIdx}
              className="hover:bg-slate-800/40 transition-colors duration-150"
            >
              {columns.map((col, colIdx) => (
                <td
                  key={col.key || colIdx}
                  className={`py-4 px-5 text-slate-200 font-medium ${col.cellClassName || ""}`}
                >
                  {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
