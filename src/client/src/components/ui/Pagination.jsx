import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-1 text-xs text-slate-500">
      <div>
        Showing page <span className="font-semibold text-slate-900">{currentPage}</span> of{" "}
        <span className="font-semibold text-slate-900">{totalPages}</span>
        {totalRecords > 0 && (
          <span>
            {" "}
            ({totalRecords} total record{totalRecords !== 1 ? "s" : ""})
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={ChevronLeft}
        >
          Previous
        </Button>

        {/* Page indicators */}
        <div className="flex items-center gap-1 px-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            // Show first, last, current, and adjacent pages
            if (
              p === 1 ||
              p === totalPages ||
              Math.abs(p - currentPage) <= 1
            ) {
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                    p === currentPage
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {p}
                </button>
              );
            }
            if (p === 2 && currentPage > 3) {
              return <span key={p} className="px-1 text-slate-400">...</span>;
            }
            if (p === totalPages - 1 && currentPage < totalPages - 2) {
              return <span key={p} className="px-1 text-slate-400">...</span>;
            }
            return null;
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next <ChevronRight className="w-4 h-4 ml-1 inline" />
        </Button>
      </div>
    </div>
  );
};
