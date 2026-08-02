function DepartmentCard({ department }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h2 className="text-xl font-semibold">
        {department.departmentName}
      </h2>

      <p className="text-gray-500 mt-2">
        {department.description}
      </p>

      <p className="mt-3 text-blue-600">
        Manager: {department.manager}
      </p>
    </div>
  );
}

export default DepartmentCard;