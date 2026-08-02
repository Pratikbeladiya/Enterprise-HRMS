import React, { useEffect, useState } from "react";
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/departmentService";
import { getAllEmployees } from "../services/employeeService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { TextArea } from "../components/ui/TextArea";
import { Select } from "../components/ui/Select";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Badge } from "../components/ui/Badge";
import { Loader } from "../components/ui/Loader";
import { SearchBar } from "../components/ui/SearchBar";
import {
  Building2,
  MapPin,
  Users,
  UserCheck,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

export const Departments = () => {
  const { user } = useAuth();
  const isHR = user?.role === "HR" || user?.role === "Admin";
  const { showSuccess, showError } = useToast();
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentDept, setCurrentDept] = useState(null);
  const [formData, setFormData] = useState({
    departmentName: "",
    description: "",
    location: "",
    manager: "",
  });

  const fetchDepartmentsData = async () => {
    setLoading(true);
    try {
      const res = await getAllDepartments();
      if (res.success && res.data) {
        setDepartments(res.data.departments || []);
      }
    } catch (err) {
      showError("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeesData = async () => {
    try {
      const res = await getAllEmployees({ limit: 100 });
      if (res.success && res.data) {
        setEmployees(res.data.employees || []);
      }
    } catch (err) {
      console.error("Failed to load employees for manager select:", err);
    }
  };

  useEffect(() => {
    fetchDepartmentsData();
    fetchEmployeesData();
  }, []);

  const handleOpenAddModal = () => {
    if (!isHR) return;
    setCurrentDept(null);
    setFormData({
      departmentName: "",
      description: "",
      location: "",
      manager: "",
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (dept) => {
    if (!isHR) return;
    setCurrentDept(dept);
    setFormData({
      departmentName: dept.departmentName || "",
      description: dept.description || "",
      location: dept.location || "",
      manager: dept.manager?._id || dept.manager || "",
    });
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (dept) => {
    if (!isHR) return;
    setCurrentDept(dept);
    setIsDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isHR) return;
    if (!formData.departmentName || !formData.description || !formData.location) {
      showError("Department name, description, and location are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        manager: formData.manager || null,
      };

      if (currentDept) {
        const res = await updateDepartment(currentDept._id, payload);
        if (res.success) {
          showSuccess("Department updated successfully");
          setIsFormModalOpen(false);
          fetchDepartmentsData();
        }
      } else {
        const res = await createDepartment(payload);
        if (res.success) {
          showSuccess("Department created successfully");
          setIsFormModalOpen(false);
          fetchDepartmentsData();
        }
      }
    } catch (err) {
      showError(err.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!currentDept || !isHR) return;
    setIsSubmitting(true);
    try {
      const res = await deleteDepartment(currentDept._id);
      if (res.success) {
        showSuccess("Department deleted successfully");
        setIsDeleteModalOpen(false);
        fetchDepartmentsData();
      }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete department");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredDepts = departments.filter(
    (d) =>
      d.departmentName.toLowerCase().includes(search.toLowerCase()) ||
      d.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Departments Directory</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-normal">
            Organize departments, locations, and assigned managers
          </p>
        </div>
        {isHR && (
          <Button variant="primary" icon={Plus} onClick={handleOpenAddModal}>
            Add Department
          </Button>
        )}
      </div>

      <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800/80 shadow-xl">
        <SearchBar
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search department name or location..."
          className="w-full sm:w-80"
        />
      </div>

      {loading ? (
        <Loader text="Loading department records..." />
      ) : filteredDepts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((dept) => (
            <Card key={dept._id} className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle>{dept.departmentName}</CardTitle>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5 font-normal">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" /> {dept.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardBody className="space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
                    {dept.description}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 font-normal">
                      <UserCheck className="w-4 h-4 text-indigo-400" />
                      <span>Manager:</span>
                    </div>
                    <span className="font-semibold text-white">
                      {dept.manager
                        ? `${dept.manager.firstName} ${dept.manager.lastName}`
                        : "Unassigned"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400 font-normal">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>Staff Count:</span>
                    </div>
                    <Badge variant="primary">{dept.employeeCount || 0} Members</Badge>
                  </div>
                </CardBody>
              </div>

              {isHR && (
                <CardFooter>
                  <div className="flex items-center justify-end gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={Edit2}
                      onClick={() => handleOpenEditModal(dept)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={Trash2}
                      onClick={() => handleOpenDeleteModal(dept)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 p-12 text-center shadow-xl">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h4 className="text-base font-bold text-white">No departments found</h4>
          <p className="text-xs text-slate-400 mt-1 font-normal">
            Create a department unit to structure your organization.
          </p>
        </div>
      )}

      {isHR && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          title={currentDept ? "Edit Department" : "Create New Department"}
          subtitle="Specify details for operational unit"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Department Name"
              name="departmentName"
              placeholder="Engineering, Finance, HR"
              value={formData.departmentName}
              onChange={handleChange}
              required
            />

            <Input
              label="Location"
              name="location"
              placeholder="Building A, 4th Floor / Remote"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <Select
              label="Department Manager"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              placeholder="Select Manager (Optional)"
              options={employees.map((e) => ({
                label: `${e.firstName} ${e.lastName} (${e.designation})`,
                value: e._id,
              }))}
            />

            <TextArea
              label="Description"
              name="description"
              rows={3}
              placeholder="Brief overview of department responsibilities..."
              value={formData.description}
              onChange={handleChange}
              required
            />

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button
                variant="outline"
                onClick={() => setIsFormModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>
                {currentDept ? "Update Department" : "Create Department"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {isHR && (
        <ConfirmDialog
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Department"
          message={`Are you sure you want to delete ${currentDept?.departmentName}?`}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};
