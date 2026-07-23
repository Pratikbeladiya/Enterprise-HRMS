import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, UserCheck, Calendar, FileText, 
  Settings, CheckSquare, Sun, Moon, Search, Filter, 
  Plus, MoreVertical, Briefcase, Award, TrendingUp, 
  ChevronRight, ChevronLeft, ArrowUpRight, Menu, X, Hammer, LogOut
} from 'lucide-react';
import Login from './Login'; // Importing the Login component

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Dashboard UI States
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [isColl

  
  const [isCollapsed, setIsCollapsed] = useState(false); 

  // Handle Dark Mode globally
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('Dashboard'); // Reset to default view on next login
  };

  // If user is NOT authenticated, show the Login screen
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // Helper to render active tab content
  const renderContent = () => {
    if (activeTab === 'Dashboard') {
      return (
        <>
          {/* DASHBOARD LEFT CONTENT GRID */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Top Analytics Mini Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Employee</span>
                  <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">12,097</h3>
                  <span className="text-[11px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md font-medium inline-block mt-2">↑ 12% vs last month</span>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl"><Users size={22} /></div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">New Employee</span>
                  <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">08</h3>
                  <span className="text-[11px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md font-medium inline-block mt-2">↑ 10% vs last week</span>
                </div>
                <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl"><Plus size={22} /></div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Salary (INR)</span>
                  <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">23,875 <span className="text-xs text-slate-400 font-normal">LPA</span></h3>
                  <span className="text-[11px] text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md font-medium inline-block mt-2">↓ 4% vs last quarter</span>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl"><TrendingUp size={22} /></div>
              </div>
            </div>

            {/* Attendance Stats & Task Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-1">
                <h4 className="font-semibold text-sm mb-4">Attendance Status</h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                    <span className="text-xs text-slate-400 block">In office</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">49</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                    <span className="text-xs text-slate-400 block">On leave</span>
                    <span className="text-lg font-bold text-amber-500">05</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                    <span className="text-xs text-slate-400 block">Sick leave</span>
                    <span className="text-lg font-bold text-rose-500">02</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2">
                <h4 className="font-semibold text-sm mb-3">Task Overview</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Ongoing Projects</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Interview Reviews</span>
                      <span>87%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payroll Chart & Department Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-sm">Payroll Overview</h4>
                  <span className="text-xs text-slate-400">Est. Total: <b className="text-slate-700 dark:text-slate-200">₹48,890,578</b></span>
                </div>
                <div className="h-40 flex items-end justify-between pt-4 px-2 gap-2">
                  {[40, 55, 45, 60, 80, 75, 90, 65, 85, 95, 70, 80].map((height, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <div className="w-full bg-indigo-100 dark:bg-indigo-950/40 rounded-t-md relative group h-full flex items-end">
                        <div className="w-full bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-md" style={{ height: `${height}%` }}></div>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <h4 className="font-semibold text-sm mb-2">Department Structure</h4>
                <div className="flex items-center justify-center py-2">
                  <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-8 border-indigo-600 border-r-violet-500 border-b-amber-400">
                    <div className="text-center">
                      <span className="text-xs text-slate-400 block">Total</span>
                      <span className="text-base font-bold">5 Depts</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-600"></span> Sales 52%</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500"></span> HR 22%</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Finance 16%</div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Others 10%</div>
                </div>
              </div>
            </div>

            {/* Bottom Row Table: Recent Joiners */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h4 className="font-semibold text-sm">Recent Onboarded Employees</h4>
                <button onClick={() => setActiveTab('Employee')} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
                  View directory <ChevronRight size={14} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                      <th className="p-4">Joining Date</th>
                      <th className="p-4">Employee ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Role</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                    {[
                      { date: '12-08-24', id: 'EI-0123', name: 'Esther Howard', role: 'SDE - Level 2', status: 'On board', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' },
                      { date: '10-08-24', id: 'EI-0675', name: 'Albert Flores', role: 'UI/UX - Level 2', status: 'On board', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' },
                      { date: '09-08-24', id: 'EI-0875', name: 'Kristin Watson', role: 'SDE - Level 1', status: 'Trainee', color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400' }
                    ].map((emp, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="p-4 text-slate-400">{emp.date}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{emp.id}</td>
                        <td className="p-4 font-semibold text-slate-900 dark:text-white">{emp.name}</td>
                        <td className="p-4 text-slate-500 dark:text-slate-400">{emp.role}</td>
                        <td className="p-4 text-right"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${emp.color}`}>{emp.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* DASHBOARD RIGHT SIDEBAR PANEL */}
          <div className="space-y-6">
            
            {/* Calendar Mini-Widget */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Calendar</span>
                <span className="text-[11px] text-slate-400 font-medium">November, 2026</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold">
                {['M','T','W','T','F','S','S'].map((d, i) => <div key={i} className="text-slate-400 py-1">{d}</div>)}
                {Array.from({ length: 28 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`py-1.5 rounded-lg transition-colors cursor-pointer ${
                      i === 11 ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">Upcoming Schedule</h4>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-500 font-bold">3 Today</span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-violet-50/60 dark:bg-violet-950/20 border-l-4 border-violet-500 rounded-xl flex items-start justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">SDE_Round 2</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Interview • 10:00 AM - 11:30 AM</p>
                  </div>
                  <ArrowUpRight size={14} className="text-violet-500" />
                </div>

                <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/20 border-l-4 border-indigo-500 rounded-xl flex items-start justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">UI/UX Interview_Round 2</h5>
                    <p className="text-[10px] text-slate-400 mt-0.5">Interview • 02:00 PM - 03:00 PM</p>
                  </div>
                  <ArrowUpRight size={14} className="text-indigo-500" />
                </div>
              </div>
            </div>

            {/* Leave Requests Box */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-sm">Leave Requests</h4>
                <button className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">AM</div>
                    <div>
                      <h5 className="text-xs font-semibold">Aman G.</h5>
                      <p className="text-[10px] text-slate-400">12th Dec - 15th Dec 2024</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 font-bold rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">Sick</span>
                </div>
              </div>
            </div>

          </div>
        </>
      );
    } 
    
    if (activeTab === 'Employee') {
      return (
        <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          {/* Search / Filter Sub Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search for employees..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 transition-colors">
                <Filter size={14} /> Filter
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-sm">
                <Plus size={14} /> Add new
              </button>
            </div>
          </div>

          {/* Directory Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4">Joining Date</th>
                  <th className="p-4">Employee ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Manager</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                {[
                  { date: '12-08-24', id: 'EI-0123', name: 'Cameron Williamson', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav' },
                  { date: '11-09-24', id: 'EI-0124', name: 'Guy Hawkins', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav' },
                  { date: '11-09-24', id: 'EI-0125', name: 'Brooklyn Simmons', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav' },
                  { date: '10-08-24', id: 'EI-0126', name: 'Albert Flores', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav' },
                  { date: '10-08-24', id: 'EI-0173', name: 'Arlene McCoy', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-slate-400">{row.date}</td>
                    <td className="p-4 font-mono text-slate-500">{row.id}</td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">{row.name}</td>
                    <td className="p-4"><span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-semibold text-[10px]">{row.role}</span></td>
                    <td className="p-4 text-slate-500">{row.dept}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{row.manager}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default Fallback for other tabs
    return (
      <div className="xl:col-span-4 flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 text-indigo-500 rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-slate-100 dark:border-slate-700">
          <Hammer size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{activeTab} Module</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          The <b>{activeTab}</b> dashboard is currently under development. Check back soon for updates and new features.
        </p>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen flex font-sans antialiased transition-colors duration-200">
      
      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full'} 
        lg:translate-x-0 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
        
        {/* Collapse Toggle Button (Desktop only) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex items-center justify-center absolute -right-3.5 top-9 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm z-50 transition-transform"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div>
          {/* Logo */}
          <div className={`flex items-center mb-8 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/30 flex-shrink-0">
                <Award size={24} />
              </div>
              {!isCollapsed && <span className="text-xl font-bold tracking-wider text-indigo-600 dark:text-indigo-400 transition-opacity">HRise</span>}
            </div>
            {!isCollapsed && (
              <button className="lg:hidden text-slate-500" onClick={() => setSidebarOpen(false)}>
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {[
              { name: 'Dashboard', icon: LayoutDashboard },
              { name: 'Attendance', icon: UserCheck },
              { name: 'Employee', icon: Users },
              { name: 'Team', icon: Briefcase },
              { name: 'Leaves', icon: Calendar },
              { name: 'Reports', icon: FileText },
              { name: 'Tasks', icon: CheckSquare },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  title={isCollapsed ? item.name : ''}
                  onClick={() => { setActiveTab(item.name); setSidebarOpen(false); }}
                  className={`flex items-center rounded-xl text-sm font-medium transition-all w-full
                    ${isCollapsed ? 'justify-center p-3' : 'justify-start gap-3 px-4 py-3'}
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Upgrade Banner Promo (Hides when collapsed) */}
        {!isCollapsed && (
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-4 rounded-2xl text-white relative overflow-hidden hidden lg:block transition-opacity">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <h4 className="font-semibold text-sm mb-1">Be a pro at using our platform</h4>
            <p className="text-xs text-indigo-100 mb-3 font-light">Watch our video guides and tutorials.</p>
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm hover:bg-indigo-50 transition-colors w-full">
              Watch now
            </button>
          </div>
        )}
      </aside>

      {/* MAIN CONTAINER */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        
        {/* TOP HEADER NAV */}
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeTab === 'Dashboard' ? 'Hello Sharon,' : activeTab}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {activeTab === 'Dashboard' ? 'Lets get you going today.' : `Manage your organization's ${activeTab.toLowerCase()} entries.`}
              </p>
            </div>
          </div>

          {/* Profile, Dark Mode Theme Switcher & Logout */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              {darkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
              <span className="hidden md:inline">{darkMode ? 'Light mode' : 'Dark mode'}</span>
            </button>

            {/* Profile Section */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <img 
                src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Pratik Beladiya" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div className="hidden md:block text-left mr-2">
                <h4 className="text-sm font-semibold leading-tight">Pratik</h4>
                <span className="text-[11px] text-slate-400">pratikbeladiya@gmail.com</span>
              </div>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                title="Logout"
                className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* MAIN WRAPPER CONTENT */}
        <main className="p-4 lg:p-8 flex-1 grid grid-cols-1 xl:grid-cols-4 gap-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
}
