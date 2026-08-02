import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">
        Enterprise HRMS
      </h1>

      <nav className="space-y-4">
        <Link to="/dashboard" className="block hover:text-blue-400">
          Dashboard
        </Link>

        <Link to="/employees" className="block hover:text-blue-400">
          Employees
        </Link>

        <Link to="/departments" className="block hover:text-blue-400">
          Departments
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;