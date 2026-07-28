import React, { useEffect, useState, useCallback } from "react";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import { getAllDepartments } from "../services/departmentService";
import { useToast } from "../context/ToastContext";
import { Table } from "../components/ui/Table";
import { Pagination } from "../components/ui/Pagination";
import { SearchBar } from "../components/ui/SearchBar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Badge } from "../components/ui/Badge";
import { Card, CardHeader, CardBody } from "../components/ui/Card";
import { formatDate, formatCurrency, formatDateForInput } from "../utils/formatters";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  LayoutGrid,
  List,
  Mail,
  Phone,
  Briefcase,
  UserCheck,
} from "lucide-react";

export const Employees = () => {
  const { showSuccess, showError } = useToast();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'

  // Pagination & Filtering
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected Employee & Form State
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [selectedForView, setSelectedForView] = useState(null);
  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Male",
    dateOfBirth: "",
    designation: "",
    salary: "",
    joiningDate: "",
    department: "",
    manager: "",
    isActive: true,
  });

  const fetchEmployeesList = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: viewMode === "grid" ? 9 : 8,
        search: search || undefined,
        department: selectedDept || undefined,
        isActive: selectedStatus !== "" ? selectedStatus : undefined,
      };
      const res = await getAllEmployees(params);
      if (res.success && res.data) {
        setEmployees(res.data.employees || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalEmployees(res.data.totalEmployees || 0);
      }
    } catch (err) {
      showError("Failed to fetch employees list");
    } finally {
      setLoading(false);
    }
  }, [page, search, selectedDept, selectedStatus, viewMode, showError]);

  const fetchDeptList = async () => {
    try {
      const res = await getAllDepartments();
      if (res.success && res.data) {
        setDepartments(res.data.departments || []);
      }
    } catch (err) {
      console.error("Failed to load departments:", err);
    }
  };

  useEffect(() => {
    fetchDeptList();
  }, []);

  useEffect(() => {
    fetchEmployeesList();
  }, [fetchEmployeesList]);

  // Open Form Modal for Create / Edit
  const handleOpenAddModal = () => {
    setCurrentEmployee(null);
    setFormData({
      employeeId: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "Male",
      dateOfBirth: "",
      designation: "",
      salary: "",
      joiningDate: formatDateForInput(new Date()),
      department: "",
      manager: "",
      isActive: true,
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setCurrentEmployee(emp);
    setFormData({
      employeeId: emp.employeeId || "",
      firstName: emp.firstName || "",
      lastName: emp.lastName || "",
      email: emp.email || "",
      phone: emp.phone || "",
      gender: emp.gender || "Male",
      dateOfBirth: formatDateForInput(emp.dateOfBirth),
      designation: emp.designation || "",
      salary: emp.salary || "",
      joiningDate: formatDateForInput(emp.joiningDate),
      department: emp.department?._id || emp.department || "",
      manager: emp.manager?._id || emp.manager || "",
      isActive: emp.isActive !== undefined ? emp.isActive : true,
    });
    setIsFormModalOpen(true);
  };

  const handleOpenViewModal = (emp) => {
    setSelectedForView(emp);
    setIsViewModalOpen(true);
  };

  const handleOpenDeleteModal = (emp) => {
    setCurrentEmployee(emp);
    setIsDeleteModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        salary: Number(formData.salary),
        department: formData.department || null,
        manager: formData.manager || null,
      };

      if (currentEmployee) {
        const res = await updateEmployee(currentEmployee._id, payload);
        if (res.success) {
          showSuccess("Employee updated successfully");
          setIsFormModalOpen(false);
          fetchEmployeesList();
        }
      } else {
        const res = await createEmployee(payload);
        if (res.success) {
          showSuccess("Employee created successfully");
          setIsFormModalOpen(false);
          fetchEmployeesList();
        }
      }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to save employee");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!currentEmployee) return;
    setIsSubmitting(true);
    try {
      const res = await deleteEmployee(currentEmployee._id);
      if (res.success) {
        showSuccess("Employee deleted successfully");
        setIsDeleteModalOpen(false);
        fetchEmployeesList();
      }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete employee");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Table Columns Definition
  const columns = [
    {
      header: "Employee",
      accessor: "firstName",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 font-extrabold flex items-center justify-center border border-indigo-500/30 text-sm shrink-0">
            {row.firstName?.charAt(0)}{row.lastName?.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-white leading-tight">
              {row.firstName} {row.lastName}
            </p>
            <p className="text-xs text-slate-400 font-normal">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Emp ID",
      accessor: "employeeId",
      render: (row) => (
        <span className="font-mono text-xs text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-xl">
          {row.employeeId}
        </span>
      ),
    },
    {
      header: "Designation",
      accessor: "designation",
      render: (row) => <span className="text-xs font-bold text-slate-200">{row.designation}</span>,
    },
    {
      header: "Department",
      accessor: "department",
      render: (row) => (
        <span className="text-xs text-slate-400 font-medium">
          {row.department?.departmentName || "N/A"}
        </span>
      ),
    },
    {
      header: "Salary",
      accessor: "salary",
      render: (row) => (
        <span className="text-xs font-extrabold text-emerald-400">
          {formatCurrency(row.salary)}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "isActive",
      render: (row) => (
        <Badge variant={row.isActive ? "success" : "danger"}>
          {row.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => handleOpenViewModal(row)}
            className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenEditModal(row)}
            className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            title="Edit Employee"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDeleteModal(row)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Delete Employee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Employee Directory</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage staff profiles, designations, salaries, and reporting units
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle Buttons */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === "table" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl text-xs font-bold transition-all ${
                viewMode === "grid" ? "bg-indigo-600 text-white shadow-md" : "text-slate-400 hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <Button variant="primary" icon={Plus} onClick={handleOpenAddModal}>
            Add Employee
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800/80 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Search name, email, or designation..."
          className="w-full sm:w-80"
        />

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Select
            placeholder="All Departments"
            value={selectedDept}
            onChange={(e) => {
              setSelectedDept(e.target.value);
              setPage(1);
            }}
            options={departments.map((d) => ({
              label: d.departmentName,
              value: d._id,
            }))}
            containerClassName="w-full sm:w-48"
          />

          <Select
            placeholder="All Status"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            options={[
              { label: "Active Only", value: "true" },
              { label: "Inactive Only", value: "false" },
            ]}
            containerClassName="w-full sm:w-36"
          />
        </div>
      </div>

      {/* Content Rendering: Table or Grid */}
      {viewMode === "table" ? (
        <Table
          columns={columns}
          data={employees}
          isLoading={loading}
          emptyMessage="No employees found"
          emptyDescription="Try adjusting search or filters to locate employee records."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <Card key={emp._id} className="relative group">
              <CardBody className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
                      {emp.firstName?.charAt(0)}{emp.lastName?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-base leading-tight">
                        {emp.firstName} {emp.lastName}
                      </h4>
                      <p className="text-xs text-indigo-400 font-semibold mt-0.5">{emp.designation}</p>
                    </div>
                  </div>
                  <Badge variant={emp.isActive ? "success" : "danger"}>
                    {emp.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">ID:</span>
                    <span className="font-mono text-white font-bold">{emp.employeeId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Department:</span>
                    <span className="font-bold text-white">{emp.department?.departmentName || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Salary:</span>
                    <span className="font-extrabold text-emerald-400">{formatCurrency(emp.salary)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenViewModal(emp)}
                    className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(emp)}
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(emp)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalRecords={totalEmployees}
        onPageChange={(p) => setPage(p)}
      />

      {/* Add / Edit Employee Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={currentEmployee ? "Edit Employee Record" : "Add New Employee"}
        subtitle="Fill in required staff record information"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSubmitForm} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleFormChange}
              required
            />
            <Input
              label="First Name"
              name="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={handleFormChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleFormChange}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
              required
            />
            <Input
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleFormChange}
              required
            />
            <Input
              label="Joining Date"
              name="joiningDate"
              type="date"
              value={formData.joiningDate}
              onChange={handleFormChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Designation"
              name="designation"
              placeholder="Software Engineer"
              value={formData.designation}
              onChange={handleFormChange}
              required
            />
            <Input
              label="Monthly Salary (₹)"
              name="salary"
              type="number"
              placeholder="65000"
              value={formData.salary}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleFormChange}
              placeholder="Select Department"
              options={departments.map((d) => ({
                label: d.departmentName,
                value: d._id,
              }))}
            />
            <Select
              label="Reporting Manager"
              name="manager"
              value={formData.manager}
              onChange={handleFormChange}
              placeholder="None (Top Level)"
              options={employees
                .filter((e) => e._id !== currentEmployee?._id)
                .map((e) => ({
                  label: `${e.firstName} ${e.lastName}`,
                  value: e._id,
                }))}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleFormChange}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-800"
            />
            <label htmlFor="isActive" className="text-xs font-bold text-slate-300">
              Active Employee Status
            </label>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={() => setIsFormModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              {currentEmployee ? "Save Changes" : "Create Employee"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Employee Detail Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Employee Profile Details"
        maxWidth="max-w-xl"
      >
        {selectedForView && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                {selectedForView.firstName?.charAt(0)}
                {selectedForView.lastName?.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {selectedForView.firstName} {selectedForView.lastName}
                </h3>
                <p className="text-xs font-bold text-indigo-400 mt-0.5">
                  {selectedForView.designation}
                </p>
                <div className="mt-2">
                  <Badge variant={selectedForView.isActive ? "success" : "danger"}>
                    {selectedForView.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase">Employee ID</span>
                <p className="font-mono text-white font-bold">{selectedForView.employeeId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase">Department</span>
                <p className="text-white font-bold">
                  {selectedForView.department?.departmentName || "N/A"}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase">Email</span>
                <p className="text-slate-300 font-medium">{selectedForView.email}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase">Phone</span>
                <p className="text-slate-300 font-medium">{selectedForView.phone}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase">Gender</span>
                <p className="text-slate-300 font-medium">{selectedForView.gender}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase">Date of Birth</span>
                <p className="text-slate-300 font-medium">{formatDate(selectedForView.dateOfBirth)}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase">Joining Date</span>
                <p className="text-slate-300 font-medium">{formatDate(selectedForView.joiningDate)}</p>
              </div>
              <div className="space-y-1">
                <span className="text-slate-400 font-bold uppercase">Monthly Salary</span>
                <p className="text-emerald-400 font-black text-sm">
                  {formatCurrency(selectedForView.salary)}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee Record"
        message={`Are you sure you want to delete ${currentEmployee?.firstName} ${currentEmployee?.lastName}? This action cannot be undone.`}
        isLoading={isSubmitting}
      />
    </div>
  );
};
