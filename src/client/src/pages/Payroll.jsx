import React, { useEffect, useState, useCallback } from "react";
import {
  getAllPayrolls,
  getEmployeePayrollHistory,
  createPayroll,
  updatePayroll,
  deletePayroll,
  getPayrollDashboard,
} from "../services/payrollService";
import { getAllEmployees } from "../services/employeeService";
import { useAuth } from "../context/AuthContext";
import { useMyEmployee } from "../hooks/useMyEmployee";
import { useToast } from "../context/ToastContext";
import { Table } from "../components/ui/Table";
import { Pagination } from "../components/ui/Pagination";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { formatCurrency, formatDate, formatDateForInput } from "../utils/formatters";
import { CircleDollarSign, CheckCircle, Clock, Plus, Edit2, Trash2 } from "lucide-react";

export const Payroll = () => {
  const { user } = useAuth();
  const isHR = user?.role === "HR" || user?.role === "Admin";
  const { myEmployee, myEmployeeId, loading: empLoading } = useMyEmployee();
  const { showSuccess, showError } = useToast();

  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString());
  const [statusFilter, setStatusFilter] = useState("");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPayroll, setCurrentPayroll] = useState(null);

  const [formData, setFormData] = useState({
    employee: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    bonus: 0,
    paymentStatus: "Pending",
    paymentDate: "",
  });

  // ─── Fetch ────────────────────────────────────────────────────────────────────
  const fetchPayrollData = useCallback(async () => {
    setLoading(true);
    try {
      if (isHR) {
        const params = {
          page,
          limit: 8,
          month: monthFilter || undefined,
          year: yearFilter || undefined,
          paymentStatus: statusFilter || undefined,
        };
        const [payRes, dashRes] = await Promise.all([getAllPayrolls(params), getPayrollDashboard()]);
        if (payRes.success && payRes.data) {
          setPayrolls(payRes.data.payrolls || []);
          setTotalPages(payRes.data.totalPages || 1);
          setTotalRecords(payRes.data.totalRecords || 0);
        }
        if (dashRes.success && dashRes.data) setDashboardStats(dashRes.data || {});
      } else {
        // Employee: fetch ONLY own payroll history
        if (!myEmployeeId) {
          setPayrolls([]);
          setLoading(false);
          return;
        }
        const payRes = await getEmployeePayrollHistory(myEmployeeId);
        if (payRes.success && payRes.data) {
          // Backend returns { count, payrollHistory: [...] }
          let list = payRes.data.payrollHistory || payRes.data.payrolls || [];
          if (monthFilter) list = list.filter((p) => String(p.month) === String(monthFilter));
          if (yearFilter) list = list.filter((p) => String(p.year) === String(yearFilter));
          if (statusFilter) list = list.filter((p) => p.paymentStatus === statusFilter);
          setPayrolls(list);
          setTotalRecords(list.length);
        }
      }
    } catch (err) {
      showError("Failed to fetch payroll records");
    } finally {
      setLoading(false);
    }
  }, [page, monthFilter, yearFilter, statusFilter, showError, isHR, myEmployeeId]);

  useEffect(() => {
    if (!empLoading) fetchPayrollData();
  }, [fetchPayrollData, empLoading]);

  useEffect(() => {
    getAllEmployees({ limit: 200 }).then((res) => {
      if (res.success && res.data) setEmployees(res.data.employees || []);
    }).catch(() => {});
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  const handleEmployeeChange = (e) => {
    const empId = e.target.value;
    const selectedEmp = employees.find((emp) => emp._id === empId);
    setFormData((prev) => ({ ...prev, employee: empId, basicSalary: selectedEmp?.salary || prev.basicSalary }));
  };

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const calculatedNetSalary =
    Number(formData.basicSalary || 0) +
    Number(formData.allowances || 0) +
    Number(formData.bonus || 0) -
    Number(formData.deductions || 0);

  const handleOpenAddModal = () => {
    if (!isHR) return;
    setCurrentPayroll(null);
    setFormData({
      employee: employees[0]?._id || "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      basicSalary: employees[0]?.salary || 0,
      allowances: 0, deductions: 0, bonus: 0,
      paymentStatus: "Pending", paymentDate: "",
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    if (!isHR) return;
    setCurrentPayroll(p);
    setFormData({
      employee: p.employee?._id || p.employee || "",
      month: p.month || 1,
      year: p.year || new Date().getFullYear(),
      basicSalary: p.basicSalary || 0,
      allowances: p.allowances || 0,
      deductions: p.deductions || 0,
      bonus: p.bonus || 0,
      paymentStatus: p.paymentStatus || "Pending",
      paymentDate: formatDateForInput(p.paymentDate),
    });
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (p) => {
    if (!isHR) return;
    setCurrentPayroll(p);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isHR) return;
    if (!formData.employee || !formData.month || !formData.year) {
      showError("Employee, month, and year are required");
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        month: Number(formData.month),
        year: Number(formData.year),
        basicSalary: Number(formData.basicSalary),
        allowances: Number(formData.allowances || 0),
        deductions: Number(formData.deductions || 0),
        bonus: Number(formData.bonus || 0),
        paymentDate: (formData.paymentStatus === "Paid" && !formData.paymentDate)
          ? new Date().toISOString()
          : formData.paymentDate || null,
      };
      if (currentPayroll) {
        const res = await updatePayroll(currentPayroll._id, payload);
        if (res.success) { showSuccess("Payroll record updated"); setIsFormModalOpen(false); fetchPayrollData(); }
      } else {
        const res = await createPayroll(payload);
        if (res.success) { showSuccess("Payroll generated successfully"); setIsFormModalOpen(false); fetchPayrollData(); }
      }
    } catch (err) {
      showError(err.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!currentPayroll || !isHR) return;
    setIsSubmitting(true);
    try {
      const res = await deletePayroll(currentPayroll._id);
      if (res.success) { showSuccess("Payroll record deleted"); setIsDeleteModalOpen(false); fetchPayrollData(); }
    } catch (err) {
      showError(err.response?.data?.message || "Failed to delete payroll");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMonthName = (m) => ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m - 1] || m;

  // ─── Columns ──────────────────────────────────────────────────────────────────
  const columns = [
    ...(isHR ? [{
      header: "Employee",
      accessor: "employee",
      render: (row) => (
        <div>
          <p className="font-semibold text-white leading-tight">{row.employee?.firstName} {row.employee?.lastName}</p>
          <p className="text-xs text-slate-400 font-mono">{row.employee?.designation || row.employee?.employeeId || "Staff"}</p>
        </div>
      ),
    }] : []),
    {
      header: "Payroll Month",
      accessor: "month",
      render: (row) => (
        <span className="font-semibold text-xs text-slate-200 bg-slate-800 border border-slate-700/60 px-2.5 py-1 rounded-xl">
          {getMonthName(row.month)} {row.year}
        </span>
      ),
    },
    {
      header: "Basic Salary",
      accessor: "basicSalary",
      render: (row) => <span className="text-xs text-slate-300 font-medium">{formatCurrency(row.basicSalary)}</span>,
    },
    {
      header: "Allowances",
      accessor: "allowances",
      render: (row) => <span className="text-xs text-emerald-400 font-bold">+{formatCurrency(row.allowances || 0)}</span>,
    },
    {
      header: "Bonus",
      accessor: "bonus",
      render: (row) => <span className="text-xs text-indigo-400 font-bold">+{formatCurrency(row.bonus || 0)}</span>,
    },
    {
      header: "Deductions",
      accessor: "deductions",
      render: (row) => <span className="text-xs text-rose-400 font-bold">-{formatCurrency(row.deductions || 0)}</span>,
    },
    {
      header: "Net Salary",
      accessor: "netSalary",
      render: (row) => <span className="text-sm font-bold text-white">{formatCurrency(row.netSalary)}</span>,
    },
    {
      header: "Payment Status",
      accessor: "paymentStatus",
      render: (row) => <Badge variant={row.paymentStatus === "Paid" ? "success" : "warning"}>{row.paymentStatus}</Badge>,
    },
    {
      header: "Payment Date",
      accessor: "paymentDate",
      render: (row) => <span className="text-xs text-slate-400 font-mono">{row.paymentDate ? formatDate(row.paymentDate) : "--/--/----"}</span>,
    },
    ...(isHR ? [{
      header: "Actions",
      key: "actions",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <button onClick={() => handleOpenEditModal(row)} className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleOpenDeleteModal(row)} className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    }] : []),
  ];

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Payroll & Salary Payslips</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-normal">
            {isHR ? "Process monthly salary payments, bonuses, allowances & deductions" : "View your personal salary payouts and monthly payslip details"}
          </p>
        </div>
        {isHR && <Button variant="primary" icon={Plus} onClick={handleOpenAddModal}>Process Payroll</Button>}
      </div>

      {isHR && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="Total Salary Disbursed" value={formatCurrency(dashboardStats.totalSalaryPaid || 0)} subtitle={`Avg: ${formatCurrency(dashboardStats.averageSalary || 0)}`} icon={CircleDollarSign} iconBg="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" />
          <StatCard title="Paid Payrolls" value={dashboardStats.paidPayrolls || 0} subtitle="Completed payouts" icon={CheckCircle} iconBg="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30" />
          <StatCard title="Pending Payouts" value={dashboardStats.pendingPayrolls || 0} subtitle="Awaiting disbursement" icon={Clock} iconBg="bg-amber-500/15 text-amber-400 border border-amber-500/30" />
        </div>
      )}

      <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800/80 shadow-xl flex flex-wrap items-center gap-4">
        <Select placeholder="All Months" value={monthFilter}
          onChange={(e) => { setMonthFilter(e.target.value); setPage(1); }}
          options={[{label:"January",value:"1"},{label:"February",value:"2"},{label:"March",value:"3"},{label:"April",value:"4"},{label:"May",value:"5"},{label:"June",value:"6"},{label:"July",value:"7"},{label:"August",value:"8"},{label:"September",value:"9"},{label:"October",value:"10"},{label:"November",value:"11"},{label:"December",value:"12"}]}
          containerClassName="w-full sm:w-36" />
        <Select placeholder="Select Year" value={yearFilter}
          onChange={(e) => { setYearFilter(e.target.value); setPage(1); }}
          options={[{label:"2026",value:"2026"},{label:"2025",value:"2025"},{label:"2024",value:"2024"}]}
          containerClassName="w-full sm:w-32" />
        <Select placeholder="All Status" value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          options={[{label:"Paid",value:"Paid"},{label:"Pending",value:"Pending"}]}
          containerClassName="w-full sm:w-40" />
      </div>

      <Table
        columns={columns}
        data={payrolls}
        isLoading={loading || empLoading}
        emptyMessage="No payroll records found"
        emptyDescription={!isHR && !myEmployeeId ? "Your account is not linked to an employee profile. Ask HR to create your employee record." : "Salary details will appear here once processed by HR."}
      />

      {isHR && <Pagination currentPage={page} totalPages={totalPages} totalRecords={totalRecords} onPageChange={(p) => setPage(p)} />}

      {isHR && (
        <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} title={currentPayroll ? "Edit Payroll Record" : "Generate Payroll"} subtitle="Calculate net compensation for employee" maxWidth="max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select label="Select Employee" name="employee" value={formData.employee} onChange={handleEmployeeChange} placeholder="Select Employee"
              options={employees.map((e) => ({ label: `${e.firstName} ${e.lastName} (Basic: ₹${e.salary})`, value: e._id }))} required />

            <div className="grid grid-cols-2 gap-4">
              <Select label="Month" name="month" value={formData.month} onChange={handleChange}
                options={[{label:"January",value:1},{label:"February",value:2},{label:"March",value:3},{label:"April",value:4},{label:"May",value:5},{label:"June",value:6},{label:"July",value:7},{label:"August",value:8},{label:"September",value:9},{label:"October",value:10},{label:"November",value:11},{label:"December",value:12}]} required />
              <Input label="Year" name="year" type="number" value={formData.year} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Basic Salary (₹)" name="basicSalary" type="number" value={formData.basicSalary} onChange={handleChange} required />
              <Input label="Allowances (₹)" name="allowances" type="number" value={formData.allowances} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Bonus (₹)" name="bonus" type="number" value={formData.bonus} onChange={handleChange} />
              <Input label="Deductions (₹)" name="deductions" type="number" value={formData.deductions} onChange={handleChange} />
            </div>

            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400 uppercase">Calculated Net Salary:</span>
              <span className="text-xl font-bold text-white">{formatCurrency(calculatedNetSalary)}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select label="Payment Status" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}
                options={[{label:"Pending",value:"Pending"},{label:"Paid",value:"Paid"}]} required />
              <Input label="Payment Date" name="paymentDate" type="date" value={formData.paymentDate} onChange={handleChange} />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="outline" onClick={() => setIsFormModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>{currentPayroll ? "Update Record" : "Save Payroll"}</Button>
            </div>
          </form>
        </Modal>
      )}

      {isHR && (
        <ConfirmDialog isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} title="Delete Payroll Record" message="Are you sure you want to delete this payroll record?" isLoading={isSubmitting} />
      )}
    </div>
  );
};
