import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div className="flex flex-1 min-h-screen">
        {/* Navigation Sidebar */}
        <Sidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col justify-between min-w-0 transition-all duration-300 ${
            isCollapsed ? "lg:ml-20" : "lg:ml-64"
          }`}
        >
          <div>
            <Navbar onMobileMenuClick={() => setIsMobileOpen(true)} />

            <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
              <Outlet />
            </main>
          </div>

          {/* Professional Enterprise Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};
