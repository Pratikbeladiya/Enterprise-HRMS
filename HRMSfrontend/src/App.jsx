import { useState } from 'react';
import OnboardingForm from './features/OnboardingForm';
import useDarkMode from './hooks/useDarkMode.js';

export default function App() {
  const [currentView, setCurrentView] = useState('Dashboard'); // 'Dashboard' | 'Onboarding'
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  
  // Initialize our custom dark mode hook
  const { theme, toggleTheme } = useDarkMode();

  // Mock Request state to demonstrate interactivity
  const [requestCounts, setRequestCounts] = useState({
    profileUpdate: 9,
    businessTrip: 5,
    vacation: 4,
    sickLeave: 3,
    other: 12
  });

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert('Data exported successfully as CSV/PDF! (Mock Event)');
    }, 1200);
  };

  return (
    <div className="flex h-screen bg-[#f4f6fa] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 overflow-hidden transition-colors duration-200">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 dark:bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0b46e4] text-white/90 transition-transform duration-300 md:static md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-3 px-6 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#0b46e4] font-black text-lg shadow-sm">
            ⬢
          </div>
          <span className="text-lg font-bold tracking-tight text-white">HRMS</span>
        </div>

        {/* Sidebar Search */}
        <div className="px-4 py-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-white/60">🔍</span>
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full rounded-lg bg-white/10 py-1.5 pl-9 pr-3 text-xs text-white placeholder:text-white/50 border border-white/5 focus:outline-none focus:ring-1 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-0.5 px-3 py-2 text-sm font-medium">
          <button 
            onClick={() => { setCurrentView('Dashboard'); setIsSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${currentView === 'Dashboard' ? 'bg-white/15 text-white font-semibold' : 'hover:bg-white/5'}`}
          >
            <span>🏠</span> Home
          </button>
          <button 
            onClick={() => { setCurrentView('Dashboard'); setIsSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${currentView === 'Dashboard' ? 'bg-white/20 text-white font-semibold' : 'hover:bg-white/5'}`}
          >
            <span>📊</span> Dashboard
          </button>
          <button 
            onClick={() => { setCurrentView('Onboarding'); setIsSidebarOpen(false); }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${currentView === 'Onboarding' ? 'bg-white/20 text-white font-semibold' : 'hover:bg-white/5'}`}
          >
            <span>👤+</span> Onboard Team
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors">
            <span>📥</span> Inbox
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors">
            <span>📁</span> Projects
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-white/5 transition-colors">
            <span>🏛️</span> Organization
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10 space-y-1 text-xs text-white/70">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/5">
            <span>💬</span> Support
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/5">
            <span>⚙️</span> Settings
          </button>
          
          {/* User Account Info */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10 px-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-slate-300 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" alt="Alexandra" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white">Alexandra</p>
                <p className="text-[10px] text-white/50">alexandra@ui.com</p>
              </div>
            </div>
            <button className="text-white/60 hover:text-white">🚪</button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex flex-1 flex-col overflow-hidden">
        
        {/* ================= HEADER ================= */}
        <header className="flex h-16 items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-6 shrink-0 transition-colors duration-200">
          {/* Left Breadcrumbs */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-slate-500 hover:text-slate-700 dark:text-slate-300"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
              <span>🏠</span>
              <span>›</span>
              <span>Dashboard</span>
              <span>›</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">Overview</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 flex-1 justify-end max-w-2xl">
            {/* Dark Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
              title="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-xs">🔍</span>
              <input 
                type="text" 
                placeholder="Search employees or actions" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-1.5 pl-9 pr-3 text-xs text-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
              🎛️ Filter
            </button>
            <button 
              onClick={handleExport}
              disabled={exporting}
              className="rounded-lg bg-[#0b46e4] px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-600 transition-colors disabled:opacity-75"
            >
              {exporting ? 'Processing...' : '📥 Export'}
            </button>
          </div>
        </header>

        {/* ================= VIEW CONTAINER ================= */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-6 bg-[#f4f6fa] dark:bg-slate-950 transition-colors duration-200">
          {currentView === 'Dashboard' ? (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Heading */}
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
              </div>

              {/* ================= METRIC CARDS ROW ================= */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                
                {/* Metric Card 1 */}
                <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Total employees</p>
                      <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">678</h3>
                      <p className="text-[11px] font-semibold text-emerald-500 mt-1">↑ 30% <span className="text-slate-400 dark:text-slate-500 font-normal">last month</span></p>
                    </div>
                    {/* Sparkline Visual */}
                    <svg className="w-20 h-10 text-emerald-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M0 25 Q15 20, 30 15 T60 10 T90 2 T100 5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <button onClick={() => setCurrentView('Onboarding')} className="text-xs font-semibold text-blue-600 dark:text-blue-400 text-left mt-4 hover:underline">View Employees →</button>
                </div>

                {/* Metric Card 2 */}
                <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Number of leaves</p>
                      <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">23</h3>
                      <p className="text-[11px] font-semibold text-rose-500 mt-1">↓ 10% <span className="text-slate-400 dark:text-slate-500 font-normal">last month</span></p>
                    </div>
                    {/* Sparkline Red */}
                    <svg className="w-20 h-10 text-rose-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M0 5 Q20 8, 40 22 T70 18 T100 25" strokeLinecap="round" />
                    </svg>
                  </div>
                  <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 text-left mt-4 hover:underline">View Leaves →</button>
                </div>

                {/* Metric Card 3 */}
                <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">New Employees</p>
                      <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">31</h3>
                      <p className="text-[11px] font-semibold text-emerald-500 mt-1">↑ 13% <span className="text-slate-400 dark:text-slate-500 font-normal">last month</span></p>
                    </div>
                    {/* Sparkline Green */}
                    <svg className="w-20 h-10 text-emerald-500" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M0 25 Q15 15, 30 20 T60 8 T90 2 T100 5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <button className="text-xs font-semibold text-blue-600 dark:text-blue-400 text-left mt-4 hover:underline">View Reports →</button>
                </div>
              </div>

              {/* ================= MIDDLE GRID ROW (Working format + Job statistics) ================= */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                
                {/* Donut Chart Component: Working Format */}
                <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Working format</h3>
                    <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600">•••</button>
                  </div>
                  <div className="relative flex justify-center py-6">
                    {/* SVG Donut */}
                    <svg className="w-40 h-40" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.915" fill="transparent" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} strokeWidth="3.2" />
                      {/* On-site slice */}
                      <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#93c5fd" strokeWidth="3.2" strokeDasharray="30 70" strokeDashoffset="25" />
                      {/* Hybrid slice */}
                      <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#1d4ed8" strokeWidth="3.2" strokeDasharray="50 50" strokeDashoffset="-5" />
                      {/* Remote slice */}
                      <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="3.2" strokeDasharray="20 80" strokeDashoffset="-55" />
                    </svg>
                    {/* Inner Central text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-semibold">Total</span>
                      <span className="text-xl font-bold text-slate-800 dark:text-white">388</span>
                    </div>
                  </div>
                  <div className="flex justify-around text-xs mt-4">
                    <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300"><span className="h-2 w-2 rounded-full bg-[#1d4ed8]" /> Hybrid</span>
                    <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300"><span className="h-2 w-2 rounded-full bg-[#3b82f6]" /> Remote</span>
                    <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300"><span className="h-2 w-2 rounded-full bg-[#93c5fd]" /> On-site</span>
                  </div>
                </div>

                {/* Stacked Bar Chart Card: Job Statistics */}
                <div className="lg:col-span-2 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Job statistics</h3>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-300" /> Job view</span>
                      <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600" /> Job applied</span>
                      <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600">•••</button>
                    </div>
                  </div>

                  {/* SVG Stacked Bar Chart */}
                  <div className="h-44 w-full flex items-end justify-between gap-1 pt-4 text-[10px] text-slate-400">
                    {[
                      { m: 'Jan', view: 40, apply: 40 }, { m: 'Feb', view: 55, apply: 40 },
                      { m: 'Mar', view: 30, apply: 30 }, { m: 'Apr', view: 45, apply: 40 },
                      { m: 'May', view: 35, apply: 30 }, { m: 'Jun', view: 50, apply: 40 },
                      { m: 'Jul', view: 40, apply: 35 }, { m: 'Aug', view: 48, apply: 36 },
                      { m: 'Sep', view: 42, apply: 38 }, { m: 'Oct', view: 50, apply: 40 },
                      { m: 'Nov', view: 54, apply: 42 }, { m: 'Dec', view: 38, apply: 48 }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                        <div className="w-full max-w-3 bg-slate-100 dark:bg-slate-800 rounded-t-sm flex flex-col justify-end overflow-hidden h-36 transition-colors">
                          {/* Stack Applied */}
                          <div className="bg-blue-600 w-full" style={{ height: `${item.apply}%` }} />
                          {/* Stack Viewed */}
                          <div className="bg-blue-300 dark:bg-blue-400/70 w-full" style={{ height: `${item.view}%` }} />
                        </div>
                        <span className="mt-2 block font-medium dark:text-slate-400">{item.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ================= BOTTOM GRID ROW (Training Line Chart + Requests List) ================= */}
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                
                {/* Advanced Line Chart: Training Costs */}
                <div className="lg:col-span-2 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Training costs by training years and duration of training</h3>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#1d4ed8]" /> Net Costs</span>
                      <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-300" /> Returns</span>
                    </div>
                  </div>

                  {/* Dual Line SVG Chart */}
                  <div className="relative h-44 w-full">
                    <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="25" x2="500" y2="25" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} strokeWidth="1" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} strokeWidth="1" />
                      <line x1="0" y1="125" x2="500" y2="125" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} strokeWidth="1" />

                      {/* Net Costs Line */}
                      <path d="M 0 110 Q 50 40, 100 80 T 200 45 T 300 95 T 400 65 T 500 120" fill="none" stroke="#1d4ed8" strokeWidth="2.5" />
                      {/* Returns Line */}
                      <path d="M 0 140 Q 50 110, 100 120 T 200 85 T 300 125 T 400 95 T 500 145" fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="3" />
                    </svg>
                    
                    {/* Bottom Months axis */}
                    <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-2">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Request Lists Panel */}
                <div className="rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Requests</h3>
                    <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600">•••</button>
                  </div>
                  
                  {/* Interactive Lists using border dividers */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1 flex flex-col justify-center">
                    {[
                      { label: 'Profile Update', count: requestCounts.profileUpdate, icon: '👤', key: 'profileUpdate' },
                      { label: 'Business Trip', count: requestCounts.businessTrip, icon: '💼', key: 'businessTrip' },
                      { label: 'Vacation', count: requestCounts.vacation, icon: '🌴', key: 'vacation' },
                      { label: 'Sick Leave', count: requestCounts.sickLeave, icon: '🤒', key: 'sickLeave' },
                      { label: 'Other', count: requestCounts.other, icon: '📌', key: 'other' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="text-sm bg-slate-50 dark:bg-slate-800 h-8 w-8 rounded-lg flex items-center justify-center border border-slate-100 dark:border-slate-700">{item.icon}</span>
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white pr-1">{item.count.toString().padStart(2, '0')}</span>
                          <button 
                            onClick={() => setRequestCounts(prev => ({ ...prev, [item.key]: Math.max(0, prev[item.key] - 1) }))}
                            className="h-5 w-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] rounded flex items-center justify-center font-bold text-slate-500 dark:text-slate-400"
                            title="Resolve Action Item"
                          >
                            ✓
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <OnboardingForm setCurrentView={setCurrentView} />
          )}
        </main>
      </div>
    </div>
  );
}