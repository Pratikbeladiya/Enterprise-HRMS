import React, { useEffect, useState, useCallback } from "react";
import {
  getAllLeaves,
  applyLeave,
  approveLeave,
  rejectLeave,
  deleteLeave,
  getLeaveSummary,
} from "../services/leaveService";
import { getAllEmployees } from "../services/employeeService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Table } from "../components/ui/Table";
import { Pagination } from "../components/ui/Pagination";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { TextArea } from "../components/ui/TextArea";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { formatDate, formatDateForInput } from "../utils/formatters";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Trash2,
} from "lucide-react";

export const Leave = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionType, setActionType] = useState("approve");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentLeave, setCurrentLeave] = useState(null);
  const [applyFormData, setApplyFormData] = useState({
    employee: "",
    leaveType: "Casual",
    startDate: formatDateForInput(new Date()),
    endDate: formatDateForInput(new Date()),
    totalDays: 1,
    reason: "",
  });
  const [actionRemarks, setActionRemarks] = useState("");

  const fetchLeavesList = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 8,
        status: statusFilter || undefined,
        leaveType: typeFilter || undefined,
      };
      const [leaveRes, sumRes] = await Promise.all([
        getAllLeaves(params),
        getLeaveSummary(),
      ]);

      if (leaveRes.success && leaveRes.data) {
        setLeaves(leaveRes.data.leaves || []);
        setTotalPages(leaveRes.data.totalPages || 1);
        setTotalRecords(leaveRes.data.totalRecords || 0);
      }
      if (sumRes.success && sumRes.data) {
        setSummary(sumRes.data || []);
      }
    } catch (err) {
      showError("Failed to fetch leave requests");
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, typeFilter, showError]);

  const fetchEmployeesData = async () => {
    try {
      const res = await getAllEmployees({ limit: 100 });
      if (res.success && res.data) {
        setEmployees(res.data.employees || []);
      }
    } catch (err) {
      console.error("Failed to load employees:", err);
    }
  };

  useEffect(() => {
    fetchLeavesList();
    fetchEmployeesData();
  }, [fetchLeavesList]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...applyFormData, [name]: value };

    if (updated.startDate && updated.endDate) {
      const s = new Date(updated.startDate);
      const eDate = new Date(updated.endDate);
      if (eDate >= s) {
        const diffTime = Math.abs(eDate - s);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        updated.totalDays = diffDays;
      }
    }

    setApplyFormData(updated);
  };

  const handleOpenApplyModal = () => {
    setApplyFormData({
      employee: user?.id || (employees[0]?._id || ""),
      leaveType: "Casual",
      startDate: formatDateForInput(new Date()),
      endDate: formatDateForInput(new Date()),
      totalDays: 1,
      reason: "",
    });
    setIsApplyModalOpen(true);
  };

  const handleOpenActionModal = (leave, type) => {
    setCurrentLeave(leave);
    setActionType(type);
    setActionRemarks("");
    setIsActionModalOpen(true);
  };

  const handleOpenDeleteModal = (leave) => {
    setCurrentLeave(leave);
    setIsDeleteModalOpen(true);
  };

  const handleSubmitApply = async (e) => {
    e.preventDefault();
    const { employee, leaveType, startDate, endDate, totalDays, reason } = applyFormData;
    if (!employee || !leaveType || !startDate || !endDate || !reason) {
      showError("All fields are required for leave application");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await applyLeave({
        ...applyFormData,
        totalDays: Number(totalDays),
      });
      if (res.success) {
        showSuccess("Leave request submitted successfully!");
        setIsApplyModalOpen(false);
        fetchLeavesList();
      }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to submit leave");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitAction = async (e) => {
    e.preventDefault();
    if (!currentLeave) return;

    setIsSubmitting(true);
    try {
      const payload = {
        approvedBy: user?.id || null,
        remarks: actionRemarks,
      };

      const res =
        actionType === "approve"
          ? await approveLeave(currentLeave._id, payload)
          : await rejectLeave(currentLeave._id, payload);

      if (res.success) {
        showSuccess(`Leave request ${actionType === "approve" ? "approved" : "rejected"}`);
        setIsActionModalOpen(false);
        fetchLeavesList();
      }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to update leave status");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!currentLeave) return;
    setIsSubmitting(true);
    try {
      const res = await deleteLeave(currentLeave._id);
      if (res.success) {
        showSuccess("Leave record deleted");
        setIsDeleteModalOpen(false);
        fetchLeavesList();
      }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete leave");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSummaryCount = (status) => {
    const item = summary.find((s) => s.status === status);
    return item ? item.totalRequests : 0;
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
            {row.employee?.designation || row.employee?.employeeId || "Staff"}
          </p>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "leaveType",
      render: (row) => (
        <Badge variant="purple" size="sm">
          {row.leaveType}
        </Badge>
      ),
    },
    {
      header: "Duration",
      accessor: "startDate",
      render: (row) => (
        <div className="text-xs">
          <p className="font-semibold text-slate-300">
            {formatDate(row.startDate)} - {formatDate(row.endDate)}
          </p>
          <p className="text-slate-400 font-bold">{row.totalDays} Day(s)</p>
        </div>
      ),
    },
    {
      header: "Reason",
      accessor: "reason",
      render: (row) => (
        <span className="text-xs text-slate-300 line-clamp-1 max-w-xs" title={row.reason}>
          {row.reason}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Badge
          variant={
            row.status === "Approved"
              ? "success"
              : row.status === "Pending"
              ? "warning"
              : "danger"
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
        <div className="flex items-center justify-end gap-1">
          {row.status === "Pending" && (
            <>
              <button
                onClick={() => handleOpenActionModal(row, "approve")}
                className="p-2 rounded-xl text-emerald-400 hover:bg-slate-800 transition-colors"
                title="Approve Leave"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleOpenActionModal(row, "reject")}
                className="p-2 rounded-xl text-rose-400 hover:bg-slate-800 transition-colors"
                title="Reject Leave"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => handleOpenDeleteModal(row)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Delete Record"
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
          <h2 className="text-xl font-black text-white">Leave Approvals & Applications</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Submit, track, and approve employee leave requests
          </p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleOpenApplyModal}>
          Apply Leave
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Pending Approvals"
          value={getSummaryCount("Pending")}
          subtitle="Awaiting manager review"
          icon={Clock}
          iconBg="bg-amber-500/15 text-amber-400 border border-amber-500/30"
        />

        <StatCard
          title="Approved Leaves"
          value={getSummaryCount("Approved")}
          subtitle="Confirmed leave requests"
          icon={CheckCircle2}
          iconBg="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
        />

        <StatCard
          title="Rejected Requests"
          value={getSummaryCount("Rejected")}
          subtitle="Declined leave requests"
          icon={XCircle}
          iconBg="bg-rose-500/15 text-rose-400 border border-rose-500/30"
        />
      </div>

      <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800/80 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Select
            placeholder="All Statuses"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            options={[
              { label: "Pending", value: "Pending" },
              { label: "Approved", value: "Approved" },
              { label: "Rejected", value: "Rejected" },
            ]}
            containerClassName="w-full sm:w-40"
          />

          <Select
            placeholder="All Leave Types"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            options={[
              { label: "Casual", value: "Casual" },
              { label: "Sick", value: "Sick" },
              { label: "Paid", value: "Paid" },
              { label: "Unpaid", value: "Unpaid" },
            ]}
            containerClassName="w-full sm:w-40"
          />
        </div>
      </div>

      <Table
        columns={columns}
        data={leaves}
        isLoading={loading}
        emptyMessage="No leave records found"
        emptyDescription="No leave applications match the selected criteria."
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        totalRecords={totalRecords}
        onPageChange={(p) => setPage(p)}
      />

      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Apply for Leave"
        subtitle="Submit a formal leave request for approval"
      >
        <form onSubmit={handleSubmitApply} className="space-y-4">
          <Select
            label="Select Employee"
            name="employee"
            value={applyFormData.employee}
            onChange={handleDateChange}
            placeholder="Select Employee"
            options={employees.map((e) => ({
              label: `${e.firstName} ${e.lastName} (${e.employeeId})`,
              value: e._id,
            }))}
            required
          />

          <Select
            label="Leave Type"
            name="leaveType"
            value={applyFormData.leaveType}
            onChange={handleDateChange}
            options={[
              { label: "Casual Leave", value: "Casual" },
              { label: "Sick Leave", value: "Sick" },
              { label: "Paid Leave", value: "Paid" },
              { label: "Unpaid Leave", value: "Unpaid" },
            ]}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Start Date"
              name="startDate"
              type="date"
              value={applyFormData.startDate}
              onChange={handleDateChange}
              required
            />
            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={applyFormData.endDate}
              onChange={handleDateChange}
              required
            />
            <Input
              label="Total Days"
              name="totalDays"
              type="number"
              value={applyFormData.totalDays}
              onChange={handleDateChange}
              required
            />
          </div>

          <TextArea
            label="Reason for Leave"
            name="reason"
            rows={3}
            placeholder="Provide detail for taking leave..."
            value={applyFormData.reason}
            onChange={handleDateChange}
            required
          />

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={() => setIsApplyModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title={`${actionType === "approve" ? "Approve" : "Reject"} Leave Request`}
        subtitle={`Confirm action for ${currentLeave?.employee?.firstName}'s leave request`}
      >
        <form onSubmit={handleSubmitAction} className="space-y-4">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-1 text-slate-300">
            <p>
              <span className="font-bold text-white">Type:</span> {currentLeave?.leaveType} Leave
            </p>
            <p>
              <span className="font-bold text-white">Duration:</span>{" "}
              {formatDate(currentLeave?.startDate)} - {formatDate(currentLeave?.endDate)} (
              {currentLeave?.totalDays} days)
            </p>
            <p>
              <span className="font-bold text-white">Reason:</span> {currentLeave?.reason}
            </p>
          </div>

          <TextArea
            label="Approver Remarks (Optional)"
            name="remarks"
            rows={3}
            placeholder="Add comments regarding this decision..."
            value={actionRemarks}
            onChange={(e) => setActionRemarks(e.target.value)}
          />

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              variant="outline"
              onClick={() => setIsActionModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={actionType === "approve" ? "success" : "danger"}
              isLoading={isSubmitting}
            >
              Confirm {actionType === "approve" ? "Approval" : "Rejection"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Leave Request"
        message="Are you sure you want to remove this leave record?"
        isLoading={isSubmitting}
      />
    </div>
  );
};
