import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Navbar = ({ onMobileMenuClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageDetails = (pathname) => {
    switch (pathname) {
      case "/dashboard":
        return { title: "Executive Dashboard", subtitle: "Real-time workforce & payroll analytics" };
      case "/employees":
        return { title: "Employee Directory", subtitle: "Manage staff profiles & records" };
      case "/departments":
        return { title: "Department Units", subtitle: "Organizational structures & managers" };
      case "/attendance":
        return { title: "Attendance Tracking", subtitle: "Daily check-ins, check-outs & hours" };
      case "/leave":
        return { title: "Leave Approvals", subtitle: "Process employee leave applications" };
      case "/payroll":
        return { title: "Payroll & Compensation", subtitle: "Salary disbursement & pay slips" };
      case "/announcements":
        return { title: "Announcements & Notices", subtitle: "Company-wide updates & urgent alerts" };
      case "/recruitment":
        return { title: "Recruitment & Talent Acquisition", subtitle: "Job requisitions & candidate pipeline" };
      case "/projects":
        return { title: "Project Deliverables & Tracking", subtitle: "Projects, milestones & team allocations" };
      default:
        return { title: "HRMS Enterprise", subtitle: "Automation System" };
    }
  };

  const pageDetails = getPageDetails(location.pathname);

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between shadow-lg">
      {/* Left side: Hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            {pageDetails.title}
          </h1>
          <p className="text-xs text-slate-400 font-normal hidden sm:block">
            {pageDetails.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: User Menu */}
      <div className="flex items-center gap-3">

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-2xl hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-800"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-semibold text-xs shadow-md">
              {user?.username?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-white leading-tight">
                {user?.username || "User Profile"}
              </p>
              <p className="text-[10px] text-slate-400 leading-tight font-normal">
                {user?.role || "Employee"}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-slate-800">
                <p className="text-sm font-semibold text-white">{user?.username}</p>
                <p className="text-xs text-slate-400 truncate font-normal">{user?.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold uppercase tracking-wider border border-indigo-500/30">
                  <ShieldCheck className="w-3 h-3 text-indigo-400" /> {user?.role || "Employee"}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full px-4 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
