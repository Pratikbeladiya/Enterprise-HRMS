// import API from "../services/api.js"; // Added the .js extension explicitly
import DataTable from '../components/DataTable';

export default function Dashboard() {
  const stats = [
    { label: 'Total Employees', value: '142', trend: '+4 this month' },
    { label: 'Pending Leaves', value: '12', trend: 'Requires action' },
    { label: 'Next Payroll Run', value: 'Oct 31', trend: 'In 5 days' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
        <p className="mt-1 text-sm text-slate-500">Manage employee directories, leave approvals, and payroll operations.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-2 text-xs font-medium text-blue-600">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Data Table Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Recent Leave Requests</h3>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
            View All
          </button>
        </div>
        <DataTable />
      </div>
    </div>
  );
}