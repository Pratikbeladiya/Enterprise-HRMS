function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold">Enterprise HRMS</h1>

      <nav className="mt-8 space-y-4">
        <p className="cursor-pointer hover:text-blue-400">Dashboard</p>
        <p className="cursor-pointer hover:text-blue-400">Employees</p>
        <p className="cursor-pointer hover:text-blue-400">Departments</p>
        <p className="cursor-pointer hover:text-blue-400">Attendance</p>
        <p className="cursor-pointer hover:text-blue-400">Payroll</p>
        <p className="cursor-pointer hover:text-blue-400">Leave</p>
      </nav>
    </aside>
  );
}

export default Sidebar;