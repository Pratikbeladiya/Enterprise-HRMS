import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Clock,
  CalendarDays,
  CircleDollarSign,
  Megaphone,
  Briefcase,
  FolderKanban,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Premium corporate SVG logo mark — building + shield + checkmark
const HRMSLogo = ({ size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sidebarLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1" />
        <stop offset="1" stopColor="#4338ca" />
      </linearGradient>
    </defs>
    {/* Rounded background */}
    <rect width="40" height="40" rx="10" fill="url(#sidebarLogoGrad)" />
    {/* Building columns */}
    <rect x="7"  y="16" width="4" height="13" rx="1" fill="white" fillOpacity="0.85" />
    <rect x="13" y="12" width="4" height="17" rx="1" fill="white" />
    <rect x="19" y="16" width="4" height="13" rx="1" fill="white" fillOpacity="0.85" />
    {/* Base */}
    <rect x="6" y="28" width="19" height="2" rx="1" fill="white" fillOpacity="0.5" />
    {/* Shield */}
    <path
      d="M30.5 10.5 L36 13.5 L36 20 C36 24.5 30.5 28 30.5 28 C30.5 28 25 24.5 25 20 L25 13.5 Z"
      fill="white"
      fillOpacity="0.15"
      stroke="white"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Checkmark in shield */}
    <path
      d="M28 20 L30 22.5 L34 17.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Dashboard",     path: "/dashboard",     icon: LayoutDashboard },
    { label: "Employees",     path: "/employees",     icon: Users },
    { label: "Departments",   path: "/departments",   icon: Building2 },
    { label: "Attendance",    path: "/attendance",    icon: Clock },
    { label: "Leaves",        path: "/leave",         icon: CalendarDays },
    { label: "Payroll",       path: "/payroll",       icon: CircleDollarSign },
    { label: "Announcements", path: "/announcements", icon: Megaphone },
    { label: "Recruitment",   path: "/recruitment",   icon: Briefcase },
    { label: "Projects",      path: "/projects",      icon: FolderKanban },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 bg-slate-900/95 backdrop-blur-xl text-slate-300 flex flex-col justify-between border-r border-slate-800/80 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Header Logo */}
        <div>
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3 overflow-hidden">
              {/* SVG Corporate Logo Mark */}
              <div className="shrink-0 shadow-lg shadow-indigo-600/20 rounded-[10px]">
                <HRMSLogo size={36} />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-white tracking-tight text-sm">
                    Enterprise HRMS
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                    Workforce Platform
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 mt-2 overflow-y-auto max-h-[calc(100vh-140px)]">
            {!isCollapsed && (
              <p className="px-3.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Main Navigation
              </p>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30 font-semibold"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 font-medium"
                    } ${isCollapsed ? "justify-center px-0" : ""}`
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          {!isCollapsed && user && (
            <div className="mb-2 px-3 py-2 rounded-2xl bg-slate-800/50 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold text-xs shadow-md shrink-0">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{user.username}</p>
                <span className="inline-block text-[10px] text-indigo-400 font-medium uppercase tracking-wider">
                  {user.role || "Employee"}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={logout}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors ${
              isCollapsed ? "justify-center px-0" : ""
            }`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
