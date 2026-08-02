import EmployeeTable from "../../components/employees/EmployeeTable";

function EmployeeList() {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add Employee
        </button>
      </div>

      <EmployeeTable />
    </div>
  );
}

export default EmployeeList;