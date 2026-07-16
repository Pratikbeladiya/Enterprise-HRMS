export default function DataTable() {
  // Mock data representing what would come from your React Query/Redux state
  const requests = [
    { id: 'REQ-101', employee: 'Sarah Jenkins', dept: 'Engineering', type: 'Annual', dates: 'Oct 12 - Oct 15', status: 'Pending' },
    { id: 'REQ-102', employee: 'Marcus Doe', dept: 'Marketing', type: 'Sick', dates: 'Oct 09 - Oct 10', status: 'Approved' },
    { id: 'REQ-103', employee: 'Emily Chen', dept: 'Sales', type: 'Annual', dates: 'Nov 01 - Nov 05', status: 'Rejected' },
    { id: 'REQ-104', employee: 'David Smith', dept: 'Engineering', type: 'Parental', dates: 'Dec 01 - Mar 01', status: 'Pending' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
      Approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
      Rejected: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    };
    
    return (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Leave Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Dates</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-slate-900">{req.employee}</div>
                  <div className="text-sm text-slate-500">{req.dept}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {req.type}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {req.dates}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {getStatusBadge(req.status)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4 transition-colors">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}