import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold">
            Enterprise HRMS Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Welcome to the HR Management System.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;