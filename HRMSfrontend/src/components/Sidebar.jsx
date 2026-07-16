export default function Sidebar() {
  const navItems = [
    { name: 'Overview', icon: '📊', active: true },
    { name: 'Employees', icon: '👥', active: false },
    { name: 'Leave Requests', icon: '📅', active: false },
    { name: 'Payroll & Reports', icon: '💵', active: false },
    { name: 'Settings', icon: '⚙️', active: false },
  ];

  return (
    <div className="flex h-full flex-col text-slate-300">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <h1 className="text-lg font-bold tracking-wider text-white">INFOTACT HRMS</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              item.active 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-800">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
}