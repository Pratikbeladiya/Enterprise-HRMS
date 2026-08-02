function EmployeeCard({ employee }) {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-lg font-semibold">
        {employee.name}
      </h2>

      <p className="text-gray-500">
        {employee.designation}
      </p>

      <p className="mt-2 text-blue-600">
        {employee.department}
      </p>
    </div>
  );
}

export default EmployeeCard;