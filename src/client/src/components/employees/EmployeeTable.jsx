function EmployeeTable() {
  return (
    <table className="w-full bg-white rounded-lg shadow">
      <thead>
        <tr className="bg-slate-100">
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Designation</th>
          <th className="p-3 text-left">Department</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="p-3">John Doe</td>
          <td className="p-3">Software Engineer</td>
          <td className="p-3">IT</td>
        </tr>
      </tbody>
    </table>
  );
}

export default EmployeeTable;