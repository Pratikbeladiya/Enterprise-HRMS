import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, UserCheck, Calendar, FileText, CheckSquare, Sun, Moon, Search, 
  Plus, Briefcase, Award, TrendingUp, 
  ChevronRight, ChevronLeft, ArrowUpRight, DollarSign, Menu, X, LogOut, Trash2, CheckCircle, XCircle, Download, Clock
} from 'lucide-react';
import Login from './Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const [isCollapsed, setIsCollapsed] = useState(false); 

  // ---------------------------------------------------------
  // LOCALSTORAGE PERSISTENT APP STATE
  // ---------------------------------------------------------
  
  // Employees State
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('hrise_employees');
    return saved ? JSON.parse(saved) : [
      { id: 'EI-0123', name: 'Cameron Williamson', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav', joiningDate: '2024-08-12' },
      { id: 'EI-0124', name: 'Guy Hawkins', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav', joiningDate: '2024-09-11' },
      { id: 'EI-0125', name: 'Brooklyn Simmons', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav', joiningDate: '2024-09-11' },
      { id: 'EI-0126', name: 'Albert Flores', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav', joiningDate: '2024-08-10' },
      { id: 'EI-0173', name: 'Arlene McCoy', role: 'SDE - Level 2', dept: 'IT and Infrastructure', manager: 'Kailash Yadav', joiningDate: '2024-08-10' }
    ];
  });

  // Payroll State
  const [payrolls, setPayrolls] = useState(() => {
    const saved = localStorage.getItem('hrise_payrolls');
    return saved ? JSON.parse(saved) : [
      { id: 'EI-0123', name: 'Cameron Williamson', baseSalary: 120000, bonus: 15000, deductions: 5000, status: 'Paid', month: 'July 2026' },
      { id: 'EI-0124', name: 'Guy Hawkins', baseSalary: 115000, bonus: 10000, deductions: 4500, status: 'Paid', month: 'July 2026' },
      { id: 'EI-0125', name: 'Brooklyn Simmons', baseSalary: 125000, bonus: 20000, deductions: 6000, status: 'Pending', month: 'July 2026' },
      { id: 'EI-0126', name: 'Albert Flores', baseSalary: 110000, bonus: 8000, deductions: 4000, status: 'Processing', month: 'July 2026' },
      { id: 'EI-0173', name: 'Arlene McCoy', baseSalary: 130000, bonus: 25000, deductions: 7000, status: 'Paid', month: 'July 2026' }
    ];
  });

  // Attendance State
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('hrise_attendance');
    return saved ? JSON.parse(saved) : [
      { id: 'EI-0123', name: 'Cameron Williamson', status: 'Present', time: '09:15 AM' },
      { id: 'EI-0124', name: 'Guy Hawkins', status: 'Present', time: '09:30 AM' },
      { id: 'EI-0125', name: 'Brooklyn Simmons', status: 'On Leave', time: '-' },
      { id: 'EI-0126', name: 'Albert Flores', status: 'Sick Leave', time: '-' },
      { id: 'EI-0173', name: 'Arlene McCoy', status: 'Present', time: '09:05 AM' }
    ];
  });

  // Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('hrise_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Migrate server infrastructure', assignee: 'Cameron Williamson', status: 'In Progress', priority: 'High', dueDate: '2026-07-30' },
      { id: 2, title: 'Design onboarding wireframes', assignee: 'Albert Flores', status: 'Completed', priority: 'Medium', dueDate: '2026-07-25' },
      { id: 3, title: 'Quarterly financial audit', assignee: 'Arlene McCoy', status: 'Pending', priority: 'High', dueDate: '2026-08-05' }
    ];
  });

  // Leaves State
  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('hrise_leaves');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Aman G.', type: 'Sick', dates: '12th Dec - 15th Dec 2026', status: 'Pending' },
      { id: 2, name: 'Guy Hawkins', type: 'Casual', dates: '20th Dec - 22nd Dec 2026', status: 'Approved' }
    ];
  });

  // Teams State
  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('hrise_teams');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'IT and Infrastructure', lead: 'Kailash Yadav', description: 'Core system architecture, cloud deployment, and network security.', color: 'bg-indigo-500' },
      { id: 2, name: 'Human Resources', lead: 'Pratik Beladiya', description: 'Talent acquisition, employee onboarding, payroll, and culture.', color: 'bg-violet-500' },
      { id: 3, name: 'Finance and Auditing', lead: 'Arlene McCoy', description: 'Budgeting, quarterly audits, expense tracking, and accounting.', color: 'bg-amber-500' }
    ];
  });

  // Employee Tab Local States
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState('');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('');
  const [newEmpDept, setNewEmpDept] = useState('');
  const [newEmpManager, setNewEmpManager] = useState('');


  // Payroll Tab Local States
  const [showAddPayrollModal, setShowAddPayrollModal] = useState(false);
  const [payrollEmpId, setPayrollEmpId] = useState('');
  const [payrollBase, setPayrollBase] = useState('');
  const [payrollBonus, setPayrollBonus] = useState('');
  const [payrollDeductions, setPayrollDeductions] = useState('');
  const [payrollMonth, setPayrollMonth] = useState('July 2026');

  // Team Tab Local States
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamLead, setNewTeamLead] = useState('');
  const [newTeamDesc, setNewTeamDesc] = useState('');

  // Leaves Tab Local States
  const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
  const [leaveEmployeeName, setLeaveEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('Sick');
  const [leaveDates, setLeaveDates] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  // Tasks Tab Local States
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskFilter, setTaskFilter] = useState('All');

  // Sync state changes with localStorage
  useEffect(() => { localStorage.setItem('hrise_employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('hrise_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('hrise_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('hrise_leaves', JSON.stringify(leaves)); }, [leaves]);
  useEffect(() => { localStorage.setItem('hrise_teams', JSON.stringify(teams)); }, [teams]);

  // Sync Payroll state changes with localStorage
  useEffect(() => { localStorage.setItem('hrise_payrolls', JSON.stringify(payrolls)); }, [payrolls]);


  // Check persisted session on load
  useEffect(() => {
    const active = localStorage.getItem('hrise_current_user');
    if (active) {
      setCurrentUser(JSON.parse(active));
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Dark Mode globally
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('hrise_current_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('Dashboard');
  };

  // Employee Handlers
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmp = {
      id: `EI-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newEmpName,
      role: newEmpRole || 'SDE - Level 1',
      dept: newEmpDept || 'IT and Infrastructure',
      manager: newEmpManager || 'Kailash Yadav',
      joiningDate: new Date().toISOString().split('T')[0]
    };
    setEmployees([...employees, newEmp]);
    setAttendance([...attendance, { id: newEmp.id, name: newEmp.name, status: 'Present', time: '09:00 AM' }]);

    setNewEmpName('');
    setNewEmpRole('');
    setNewEmpDept('');
    setNewEmpManager('');
    setShowAddEmployeeModal(false);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setAttendance(attendance.filter(att => att.id !== id));
  };

  // Team Handlers
  const handleAddTeam = (e) => {
    e.preventDefault();
    const colors = ['bg-indigo-500', 'bg-violet-500', 'bg-amber-500', 'bg-emerald-500', 'bg-rose-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newTeam = {
      id: Date.now(),
      name: newTeamName,
      lead: newTeamLead || 'Unassigned',
      description: newTeamDesc || 'Department workspace for collaborative operations.',
      color: randomColor
    };
    setTeams([...teams, newTeam]);
    setNewTeamName('');
    setNewTeamLead('');
    setNewTeamDesc('');
    setShowAddTeamModal(false);
  };

  const handleDeleteTeam = (id) => {
    setTeams(teams.filter(t => t.id !== id));
  };

  // Leave Handlers
  const handleAddLeave = (e) => {
    e.preventDefault();
    const newLeave = {
      id: Date.now(),
      name: leaveEmployeeName || currentUser?.name || 'Staff Member',
      type: leaveType,
      dates: leaveDates,
      reason: leaveReason || 'Personal time off',
      status: 'Pending'
    };
    setLeaves([...leaves, newLeave]);
    setLeaveEmployeeName('');
    setLeaveDates('');
    setLeaveReason('');
    setShowAddLeaveModal(false);
  };

  const handleUpdateLeaveStatus = (id, newStatus) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLeave = (id) => {
    setLeaves(leaves.filter(l => l.id !== id));
  };

  // Task Handlers
  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      assignee: taskAssignee || employees[0]?.name || 'Unassigned',
      status: 'In Progress',
      priority: taskPriority,
      dueDate: taskDueDate || new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
    setTaskTitle('');
    setTaskAssignee('');
    setTaskDueDate('');
    setShowAddTaskModal(false);
  };

  const handleToggleTaskStatus = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'Completed' ? 'In Progress' : 'Completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // If user is NOT authenticated, show the Login screen
  if (!isAuthenticated) {
    return <Login onLogin={handleLoginSuccess} />;
  }

  // Helper to render active tab content
  const renderContent = () => {
    if (activeTab === 'Dashboard') {
      const totalInOffice = attendance.filter(a => a.status === 'Present').length;
      const totalOnLeave = attendance.filter(a => a.status === 'On Leave').length;
      const totalSick = attendance.filter(a => a.status === 'Sick Leave').length;

      return (
        <>
          {/* DASHBOARD LEFT CONTENT GRID */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Top Analytics Mini Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Employee</span>
                  <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{employees.length}</h3>
                  <span className="text-[11px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md font-medium inline-block mt-2">Active Directory</span>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl"><Users size={22} /></div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Active Tasks</span>
                  <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{tasks.filter(t => t.status !== 'Completed').length}</h3>
                  <span className="text-[11px] text-violet-500 bg-violet-50 dark:bg-violet-950/50 px-2 py-0.5 rounded-md font-medium inline-block mt-2">In Progress / Pending</span>
                </div>
                <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-xl"><CheckSquare size={22} /></div>
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
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{totalInOffice}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                    <span className="text-xs text-slate-400 block">On leave</span>
                    <span className="text-lg font-bold text-amber-500">{totalOnLeave}</span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                    <span className="text-xs text-slate-400 block">Sick leave</span>
                    <span className="text-lg font-bold text-rose-500">{totalSick}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2">
                <h4 className="font-semibold text-sm mb-3">Task Overview</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Completed Tasks</span>
                      <span>{Math.round((tasks.filter(t => t.status === 'Completed').length / (tasks.length || 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${(tasks.filter(t => t.status === 'Completed').length / (tasks.length || 1)) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Pending Review</span>
                      <span>{tasks.filter(t => t.status !== 'Completed').length} Items</span>
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
                      <span className="text-base font-bold">{teams.length} Units</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  {teams.slice(0, 4).map((team, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 truncate">
                      <span className={`w-2 h-2 rounded-full ${team.color}`}></span> {team.name}
                    </div>
                  ))}
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
                    {employees.slice(0, 3).map((emp, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="p-4 text-slate-400">{emp.joiningDate}</td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">{emp.id}</td>
                        <td className="p-4 font-semibold text-slate-900 dark:text-white">{emp.name}</td>
                        <td className="p-4 text-slate-500 dark:text-slate-400">{emp.role}</td>
                        <td className="p-4 text-right"><span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">On board</span></td>
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
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-slate-500 font-bold">Today</span>
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
                <button onClick={() => setActiveTab('Leaves')} className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {leaves.map((leave, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">{leave.name.slice(0, 2).toUpperCase()}</div>
                      <div>
                        <h5 className="text-xs font-semibold">{leave.name}</h5>
                        <p className="text-[10px] text-slate-400">{leave.dates}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 font-bold rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">{leave.type}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      );
    } 
    
    if (activeTab === 'Employee') {
      const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(employeeSearchQuery.toLowerCase()) || 
        emp.role.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(employeeSearchQuery.toLowerCase())
      );

      return (
        <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                value={employeeSearchQuery}
                onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                placeholder="Search for employees..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button onClick={() => setShowAddEmployeeModal(true)} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-sm">
                <Plus size={14} /> Add new employee
              </button>
            </div>
          </div>

          {showAddEmployeeModal && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Add New Employee</h3>
                  <button onClick={() => setShowAddEmployeeModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>
                <form onSubmit={handleAddEmployee} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Full Name</label>
                    <input type="text" required value={newEmpName} onChange={(e) => setNewEmpName(e.target.value)} placeholder="Jane Doe" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Role / Designation</label>
                    <input type="text" required value={newEmpRole} onChange={(e) => setNewEmpRole(e.target.value)} placeholder="SDE - Level 1" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Department / Team</label>
                    <select value={newEmpDept} onChange={(e) => setNewEmpDept(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100">
                      {teams.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Manager</label>
                    <input type="text" required value={newEmpManager} onChange={(e) => setNewEmpManager(e.target.value)} placeholder="Kailash Yadav" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddEmployeeModal(false)} className="px-4 py-2 border rounded-xl text-xs font-semibold">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500">Save Employee</button>
                  </div>
                </form>
              </div>
            </div>
          )}

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
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                {filteredEmployees.length > 0 ? filteredEmployees.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-slate-400">{row.joiningDate}</td>
                    <td className="p-4 font-mono text-slate-500">{row.id}</td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">{row.name}</td>
                    <td className="p-4"><span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-semibold text-[10px]">{row.role}</span></td>
                    <td className="p-4 text-slate-500">{row.dept}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{row.manager}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDeleteEmployee(row.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors" title="Remove Employee">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === 'Team') {
      return (
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Organization Teams</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage functional departments, leads, and division units</p>
            </div>
            <button onClick={() => setShowAddTeamModal(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-sm">
              <Plus size={14} /> Create New Team
            </button>
          </div>

          {showAddTeamModal && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Create Department Team</h3>
                  <button onClick={() => setShowAddTeamModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>
                <form onSubmit={handleAddTeam} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Team / Department Name</label>
                    <input type="text" required value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)} placeholder="e.g. Marketing & Growth" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Team Lead</label>
                    <input type="text" required value={newTeamLead} onChange={(e) => setNewTeamLead(e.target.value)} placeholder="e.g. Esther Howard" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Description</label>
                    <textarea required value={newTeamDesc} onChange={(e) => setNewTeamDesc(e.target.value)} placeholder="Brief summary of department responsibilities..." rows="3" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"></textarea>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddTeamModal(false)} className="px-4 py-2 border rounded-xl text-xs font-semibold">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500">Save Team</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => {
              const memberCount = employees.filter(emp => emp.dept === team.name).length;
              return (
                <div key={team.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-full h-1.5 ${team.color}`}></div>
                  
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${team.color}`}></div>
                        <h4 className="font-bold text-base text-slate-900 dark:text-white">{team.name}</h4>
                      </div>
                      <button onClick={() => handleDeleteTeam(team.id)} className="text-slate-400 hover:text-rose-500 transition-colors" title="Delete Team">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{team.description}</p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Team Lead:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{team.lead}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Assigned Members:</span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold">{memberCount} Staff</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (activeTab === 'Leaves') {
      return (
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Leave Management</h3>
              <p className="text-xs text-slate-400 mt-0.5">Submit time-off requests, monitor balances, and review statuses</p>
            </div>
            <button onClick={() => setShowAddLeaveModal(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-sm">
              <Plus size={14} /> Request New Leave
            </button>
          </div>

          {showAddLeaveModal && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">New Leave Application</h3>
                  <button onClick={() => setShowAddLeaveModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>
                <form onSubmit={handleAddLeave} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Employee Name</label>
                    <select value={leaveEmployeeName} onChange={(e) => setLeaveEmployeeName(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100">
                      <option value="">Select Employee...</option>
                      {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Leave Type</label>
                    <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100">
                      <option value="Sick">Sick Leave</option>
                      <option value="Casual">Casual Leave</option>
                      <option value="Earned">Earned Leave</option>
                      <option value="Maternity / Paternity">Maternity / Paternity</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Duration / Dates</label>
                    <input type="text" required value={leaveDates} onChange={(e) => setLeaveDates(e.target.value)} placeholder="e.g. 15th Dec - 18th Dec 2026" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Reason</label>
                    <textarea value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} placeholder="Reason for leave application..." rows="3" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100"></textarea>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddLeaveModal(false)} className="px-4 py-2 border rounded-xl text-xs font-semibold">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500">Submit Application</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-semibold text-sm">All Leave Applications</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="p-4">Applicant Name</th>
                    <th className="p-4">Leave Type</th>
                    <th className="p-4">Dates</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                  {leaves.length > 0 ? leaves.map((leave) => (
                    <tr key={leave.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-semibold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                          {leave.name.slice(0, 2).toUpperCase()}
                        </div>
                        {leave.name}
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300 font-medium">
                          {leave.type}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{leave.dates}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' :
                          leave.status === 'Rejected' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' :
                          'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-1">
                        <button onClick={() => handleUpdateLeaveStatus(leave.id, 'Approved')} className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                        <button onClick={() => handleUpdateLeaveStatus(leave.id, 'Rejected')} className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors" title="Reject">
                          <XCircle size={16} />
                        </button>
                        <button onClick={() => handleDeleteLeave(leave.id)} className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors" title="Delete Request">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-slate-400">No leave requests found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Tasks') {
      const filteredTasks = tasks.filter(task => {
        if (taskFilter === 'All') return true;
        return task.status === taskFilter;
      });

      return (
        <div className="xl:col-span-4 space-y-6">
          {/* Header Action Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Workspace Task Management</h3>
              <p className="text-xs text-slate-400 mt-0.5">Assign projects, monitor milestones, and track execution status</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <select 
                value={taskFilter} 
                onChange={(e) => setTaskFilter(e.target.value)}
                className="px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium outline-none text-slate-800 dark:text-slate-100 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={() => setShowAddTaskModal(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-sm whitespace-nowrap">
                <Plus size={14} /> New Task
              </button>
            </div>
          </div>

          {/* Add Task Modal */}
          {showAddTaskModal && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Assign New Workspace Task</h3>
                  <button onClick={() => setShowAddTaskModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                </div>
                <form onSubmit={handleAddTask} className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Task Title / Description</label>
                    <input type="text" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="e.g. Implement OAuth Security Patch" className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-100" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Assignee</label>
                    <select value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100">
                      <option value="">Select Employee...</option>
                      {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Priority</label>
                    <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100">
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Due Date</label>
                    <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-xl text-xs dark:bg-slate-800 dark:border-slate-700 outline-none text-slate-800 dark:text-slate-100" />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowAddTaskModal(false)} className="px-4 py-2 border rounded-xl text-xs font-semibold">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500">Create Task</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Tasks Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="p-4">Task Description</th>
                    <th className="p-4">Assignee</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-300">
                  {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-semibold text-slate-900 dark:text-white max-w-xs truncate">{task.title}</td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">{task.assignee}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          task.priority === 'High' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400' :
                          task.priority === 'Medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 flex items-center gap-1"><Clock size={12} /> {task.dueDate || 'No Date'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          task.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' :
                          task.status === 'In Progress' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' :
                          'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => handleToggleTaskStatus(task.id)} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-[11px] font-semibold transition-colors">
                          Toggle Status
                        </button>
                        <button onClick={() => handleDeleteTask(task.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors inline-block" title="Delete Task">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="p-8 text-center text-slate-400">No tasks found matching filter criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Reports') {
      const handleExportReport = () => {
        const reportData = {
          generatedAt: new Date().toISOString(),
          totalEmployees: employees.length,
          totalTeams: teams.length,
          attendanceOverview: attendance,
          tasksSummary: tasks,
          leavesSummary: leaves
        };
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `HRise_Analytics_Report_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
      };

      return (
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Organizational Reports & Analytics</h3>
              <p className="text-xs text-slate-400 mt-0.5">Comprehensive performance reviews, staff metrics, and logs</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleExportReport} className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors shadow-sm">
                <Download size={14} /> Export JSON Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Total Headcount</span>
              <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{employees.length} Staff</h3>
              <span className="text-[11px] text-emerald-500 mt-2 block font-medium">100% Active Profiles</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Attendance Rate</span>
              <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
                {Math.round((attendance.filter(a => a.status === 'Present').length / (attendance.length || 1)) * 100)}%
              </h3>
              <span className="text-[11px] text-indigo-500 mt-2 block font-medium">Based on daily check-ins</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Task Completion</span>
              <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">
                {Math.round((tasks.filter(t => t.status === 'Completed').length / (tasks.length || 1)) * 100)}%
              </h3>
              <span className="text-[11px] text-violet-500 mt-2 block font-medium">Workspace efficiency</span>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Active Departments</span>
              <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{teams.length} Units</h3>
              <span className="text-[11px] text-amber-500 mt-2 block font-medium">Functional divisions</span>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'Attendance') {
      const handleStatusChange = (id, newStatus) => {
        setAttendance(attendance.map(item => item.id === id ? { ...item, status: newStatus } : item));
      };

      return (
        <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Daily Attendance Management</h3>
              <p className="text-xs text-slate-400 mt-0.5">Real-time attendance status and clock tracking</p>
            </div>
            <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-xl font-bold">Total Staff: {attendance.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-medium uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4">Employee ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Check-in Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {attendance.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="p-4 font-mono text-slate-500">{record.id}</td>
                    <td className="p-4 font-semibold text-slate-900 dark:text-white">{record.name}</td>
                    <td className="p-4 text-slate-500">{record.time}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        record.status === 'Present' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400' :
                        record.status === 'On Leave' ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400' :
                        'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select 
                        value={record.status}
                        onChange={(e) => handleStatusChange(record.id, e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs outline-none cursor-pointer text-slate-800 dark:text-slate-100"
                      >
                        <option value="Present">Present</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen flex font-sans antialiased transition-colors duration-200">
      
      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full'} 
        lg:translate-x-0 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
        
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex items-center justify-center absolute -right-3.5 top-9 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm z-50 transition-transform"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div>
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
        
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeTab === 'Dashboard' ? `Hello ${currentUser?.name?.split(' ')[0] || 'User'},` : activeTab}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {activeTab === 'Dashboard' ? 'Lets get you going today.' : `Manage your organization's ${activeTab.toLowerCase()} entries.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
            >
              {darkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} />}
              <span className="hidden md:inline">{darkMode ? 'Light mode' : 'Dark mode'}</span>
            </button>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <img 
                src="https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?q=80&w=687&auto=format&fit=crop" 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
              />
              <div className="hidden md:block text-left mr-2">
                <h4 className="text-sm font-semibold leading-tight">{currentUser?.name || 'User'}</h4>
                <span className="text-[11px] text-slate-400">{currentUser?.email || 'name@company.com'}</span>
              </div>

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

        <main className="p-4 lg:p-8 flex-1 grid grid-cols-1 xl:grid-cols-4 gap-6">
          {renderContent()}
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

    </div>
  );
}