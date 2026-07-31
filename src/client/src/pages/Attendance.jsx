import React, { useEffect, useState, useCallback } from "react";
import {
  getAllAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceSummary,
} from "../services/attendanceService";
import { getAllEmployees } from "../services/employeeService";
import { useToast } from "../context/ToastContext";
import { Table } from "../components/ui/Table";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { formatDate, formatDateForInput } from "../utils/formatters";
import {
  CheckCircle,
  XCircle,
  Calendar,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

export const Attendance = () => {
  const { showSuccess, showError } = useToast();
  const [attendanceList, setAttendanceList] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);
  const [formData, setFormData] = useState({
    employee: "",
    date: formatDateForInput(new Date()),
    checkIn: "09:00",
    checkOut: "17:00",
    status: "Present",
    workingHours: 8,
    remarks: "",
  });

  const fetchAttendanceData = useCallback(async () => {
    setLoading(true);
    try {
      const [attRes, sumRes] = await Promise.all([
        getAllAttendance(),
        getAttendanceSummary(),
      ]);

      if (attRes.success && attRes.data) {
        setAttendanceList(attRes.data.attendance || []);
      }
      if (sumRes.success && sumRes.data) {
        setSummary(sumRes.data || []);
      }
    } catch (err) {
      showError("Failed to fetch attendance logs");
    } finally {
      setLoading(false);
    }
  }, [showError]);

  const fetchEmployeesData = async () => {
    try {
      const res = await getAllEmployees({ limit: 100 });
      if (res.success && res.data) {
        setEmployees(res.data.employees || []);
      }
    } catch (err) {
      console.error("Failed to load employees for dropdown:", err);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
    fetchEmployeesData();
  }, [fetchAttendanceData]);

  const handleOpenAddModal = () => {
    setCurrentRecord(null);
    setFormData({
      employee: "",
      date: formatDateForInput(new Date()),
      checkIn: "09:00",
      checkOut: "17:00",
      status: "Present",
      workingHours: 8,
      remarks: "",
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (rec) => {
    setCurrentRecord(rec);
    setFormData({
      employee: rec.employee?._id || rec.employee || "",
      date: formatDateForInput(rec.date),
      checkIn: rec.checkIn || "09:00",
      checkOut: rec.checkOut || "",
      status: rec.status || "Present",
      workingHours: rec.workingHours || 0,
      remarks: rec.remarks || "",
    });
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (rec) => {
    setCurrentRecord(rec);
    setIsDeleteModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employee || !formData.date || !formData.checkIn) {
      showError("Employee, date, and check-in time are required");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        workingHours: Number(formData.workingHours || 0),
      };

      if (currentRecord) {
        const res = await updateAttendance(currentRecord._id, payload);
        if (res.success) {
          showSuccess("Attendance updated successfully");
          setIsFormModalOpen(false);
          fetchAttendanceData();
        }
      } else {
        const res = await createAttendance(payload);
        if (res.success) {
          showSuccess("Attendance logged successfully");
          setIsFormModalOpen(false);
          fetchAttendanceData();
        }
      }
    } catch (err) {
      showError(err.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!currentRecord) return;
    setIsSubmitting(true);
    try {
      const res = await deleteAttendance(currentRecord._id);
      if (res.success) {
        showSuccess("Attendance record deleted");
        setIsDeleteModalOpen(false);
        fetchAttendanceData();
      }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete attendance");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCountByStatus = (st) => {
    const item = summary.find((s) => s.status === st);
    return item ? item.total : 0;
  };

  const columns = [
    {
      header: "Employee",
      accessor: "employee",
      render: (row) => (
        <div>
          <p className="font-bold text-white leading-tight">
            {row.employee?.firstName} {row.employee?.lastName}
          </p>
          <p className="text-xs text-slate-400 font-mono">
            {row.employee?.employeeId || "N/A"}
          </p>
        </div>
      ),
    },
    {
      header: "Date",
      accessor: "date",
      render: (row) => (
        <span className="text-xs font-semibold text-slate-300">
          {formatDate(row.date)}
        </span>
      ),
    },
    {
      header: "Check In",
      accessor: "checkIn",
      render: (row) => (
        <span className="text-xs font-mono font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700/60">
          {row.checkIn || "--:--"}
        </span>
      ),
    },
    {
      header: "Check Out",
      accessor: "checkOut",
      render: (row) => (
        <span className="text-xs font-mono font-bold text-slate-200 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700/60">
          {row.checkOut || "--:--"}
        </span>
      ),
    },
    {
      header: "Hours",
      accessor: "workingHours",
      render: (row) => (
        <span className="text-xs font-black text-indigo-400">
          {row.workingHours || 0} hrs
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Badge
          variant={
            row.status === "Present"
              ? "success"
              : row.status === "Absent"
              ? "danger"
              : "warning"
          }
        >
          {row.status}
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
            onClick={() => handleOpenEditModal(row)}
            className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
            title="Edit Log"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDeleteModal(row)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Delete Log"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Attendance Tracking</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track check-ins, check-outs, working hours, and present/absent logs
          </p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleOpenAddModal}>
          Log Attendance
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Present Today"
          value={getCountByStatus("Present")}
          subtitle="On time & logged"
          icon={CheckCircle}
          iconBg="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
        />

        <StatCard
          title="Absent"
          value={getCountByStatus("Absent")}
          subtitle="Unexcused absence"
          icon={XCircle}
          iconBg="bg-rose-500/15 text-rose-400 border border-rose-500/30"
        />

        <StatCard
          title="On Leave"
          value={getCountByStatus("Leave")}
          subtitle="Approved leave"
          icon={Calendar}
          iconBg="bg-amber-500/15 text-amber-400 border border-amber-500/30"
        />
      </div>

      <Table
        columns={columns}
        data={attendanceList}
        isLoading={loading}
        emptyMessage="No attendance logs found"
        emptyDescription="Start logging daily employee check-ins to view attendance records."
      />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={currentRecord ? "Edit Attendance Log" : "Log Attendance"}
        subtitle="Specify date, times, and status for employee attendance"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Select Employee"
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            placeholder="Select Employee"
            options={employees.map((e) => ({
              label: `${e.firstName} ${e.lastName} (${e.employeeId})`,
              value: e._id,
            }))}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <Select
              label="Attendance Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { label: "Present", value: "Present" },
                { label: "Absent", value: "Absent" },
                { label: "Leave", value: "Leave" },
              ]}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Check-In Time"
              name="checkIn"
              type="time"
              value={formData.checkIn}
              onChange={handleChange}
              required
            />
            <Input
              label="Check-Out Time"
              name="checkOut"
              type="time"
              value={formData.checkOut}
              onChange={handleChange}
            />
            <Input
              label="Working Hours"
              name="workingHours"
              type="number"
              value={formData.workingHours}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Remarks (Optional)"
            name="remarks"
            placeholder="e.g. Late entry, Work from home"
            value={formData.remarks}
            onChange={handleChange}
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
              {currentRecord ? "Update Log" : "Save Attendance"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Attendance Log"
        message="Are you sure you want to remove this attendance record?"
        isLoading={isSubmitting}
      />
    </div>
  );
};
