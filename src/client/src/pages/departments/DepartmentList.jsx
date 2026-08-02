import DepartmentCard from "../../components/departments/DepartmentCard";

function DepartmentList() {
  const departments = [
    {
      departmentName: "IT",
      description: "Software Development Team",
      manager: "John Doe",
    },
    {
      departmentName: "HR",
      description: "Human Resource Team",
      manager: "Jane Smith",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Departments
        </h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Add Department
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {departments.map((department, index) => (
          <DepartmentCard
            key={index}
            department={department}
          />
        ))}
      </div>
    </div>
  );
}

export default DepartmentList;