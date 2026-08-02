import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardSummary } from "../services/dashboardService";
import { getAttendanceSummary } from "../services/attendanceService";
import { getLeaveSummary } from "../services/leaveService";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardHeader, CardTitle, CardBody } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Loader } from "../components/ui/Loader";
import { formatCurrency } from "../utils/formatters";
import {
  Users,
  Building2,
  UserCheck,
  Wallet,
  Plus,
  TrendingUp,
  PieChart as PieIcon,
  DollarSign,
  Activity,
} from "lucide-react";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'departments' | 'financials'
  const [hoveredDept, setHoveredDept] = useState(null);
  const [summaryData, setSummaryData] = useState({
    employeeStats: { totalEmployees: 0, activeEmployees: 0, inactiveEmployees: 0 },
    salaryStats: { totalSalary: 0, averageSalary: 0, highestSalary: 0, lowestSalary: 0 },
    departmentStats: [],
  });
  const [attendanceSummary, setAttendanceSummary] = useState([]);
  const [leaveSummary, setLeaveSummary] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [sumRes, attRes, leaveRes] = await Promise.allSettled([
        getDashboardSummary(),
        getAttendanceSummary(),
        getLeaveSummary(),
      ]);

      if (sumRes.status === "fulfilled" && sumRes.value?.success) {
        setSummaryData(sumRes.value.data);
      }
      if (attRes.status === "fulfilled" && attRes.value?.success) {
        setAttendanceSummary(attRes.value.data || []);
      }
      if (leaveRes.status === "fulfilled" && leaveRes.value?.success) {
        setLeaveSummary(leaveRes.value.data || []);
      }
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading Enterprise Dashboard..." />;
  }

  const { employeeStats, salaryStats, departmentStats } = summaryData;

  const colors = [
    { name: "Indigo", stroke: "#6366f1", fill: "rgba(99, 102, 241, 0.2)", bg: "bg-indigo-500", text: "text-indigo-400" },
    { name: "Emerald", stroke: "#10b981", fill: "rgba(16, 185, 129, 0.2)", bg: "bg-emerald-500", text: "text-emerald-400" },
    { name: "Amber", stroke: "#f59e0b", fill: "rgba(245, 158, 11, 0.2)", bg: "bg-amber-500", text: "text-amber-400" },
    { name: "Rose", stroke: "#f43f5e", fill: "rgba(244, 63, 94, 0.2)", bg: "bg-rose-500", text: "text-rose-400" },
    { name: "Purple", stroke: "#a855f7", fill: "rgba(168, 85, 247, 0.2)", bg: "bg-purple-500", text: "text-purple-400" },
    { name: "Cyan", stroke: "#06b6d4", fill: "rgba(6, 182, 212, 0.2)", bg: "bg-cyan-500", text: "text-cyan-400" },
  ];

  const getDeptColor = (index) => colors[index % colors.length];

  const totalDeptEmployees = departmentStats.reduce((sum, d) => sum + (d.employeeCount || 0), 0) || 1;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  const donutSegments = departmentStats.map((dept, idx) => {
    const percent = (dept.employeeCount || 0) / totalDeptEmployees;
    const strokeLength = percent * circumference;
    const strokeOffset = circumference - strokeLength + (accumulatedPercent * circumference);
    accumulatedPercent -= percent;
    return {
      ...dept,
      percent,
      strokeLength,
      strokeOffset,
      color: getDeptColor(idx),
    };
  });

  const chartHeight = 180;
  const chartWidth = 500;
  const maxVal = Math.max(...departmentStats.map((d) => d.employeeCount || 0), 5);
  const chartPoints = departmentStats.map((dept, idx) => {
    const x = 40 + (idx * (chartWidth - 80) / (Math.max(departmentStats.length - 1, 1)));
    const y = chartHeight - 30 - ((dept.employeeCount || 0) * (chartHeight - 60) / maxVal);
    return { x, y, name: dept.departmentName, value: dept.employeeCount };
  });

  const linePath = chartPoints.reduce((acc, p, idx) => {
    if (idx === 0) return `M ${p.x} ${p.y}`;
    const prev = chartPoints[idx - 1];
    const cpX1 = prev.x + (p.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (p.x - prev.x) / 2;
    const cpY2 = p.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p.x} ${p.y}`;
  }, "");

  const areaPath = chartPoints.length > 0
    ? `${linePath} L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - 20} L ${chartPoints[0].x} ${chartHeight - 20} Z`
    : "";

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white border border-slate-800/80 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/20 backdrop-blur-xs">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> HR Analytics Hub
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Enterprise Dashboard
            </h2>
            <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              Consolidated employee directory, department insights, active attendance logs, and automated payroll summaries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/employees"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-all duration-200 shadow-md active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 text-indigo-600" /> Add Employee
            </Link>
            <Link
              to="/payroll"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-xs hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 shadow-lg shadow-indigo-600/30 active:scale-[0.98]"
            >
              <Wallet className="w-4 h-4" /> Process Payroll
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === "overview"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Overview & Stats
        </button>
        <button
          onClick={() => setActiveTab("departments")}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === "departments"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Department Analytics
        </button>
        <button
          onClick={() => setActiveTab("financials")}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === "financials"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Payroll & Financials
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Workforce"
              value={employeeStats?.totalEmployees || 0}
              subtitle="Registered members"
              icon={Users}
              iconBg="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
            />
            <StatCard
              title="Active Staff"
              value={employeeStats?.activeEmployees || 0}
              subtitle={`${employeeStats?.inactiveEmployees || 0} Inactive`}
              icon={UserCheck}
              iconBg="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              trend={`${
                employeeStats?.totalEmployees > 0
                  ? Math.round(
                      ((employeeStats?.activeEmployees || 0) /
                        employeeStats.totalEmployees) *
                        100
                    )
                  : 0
              }% Active`}
              trendType="up"
            />
            <StatCard
              title="Departments"
              value={departmentStats?.length || 0}
              subtitle="Active business units"
              icon={Building2}
              iconBg="bg-purple-500/15 text-purple-400 border border-purple-500/30"
            />
            <StatCard
              title="Monthly Budget"
              value={formatCurrency(salaryStats?.totalSalary || 0)}
              subtitle={`Avg: ${formatCurrency(salaryStats?.averageSalary || 0)}`}
              icon={Wallet}
              iconBg="bg-amber-500/15 text-amber-400 border border-amber-500/30"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div>
                  <CardTitle>Department Headcount Curve</CardTitle>
                  <p className="text-xs text-slate-400 mt-1">Personnel count curve mapped across units</p>
                </div>
              </CardHeader>
              <CardBody>
                {chartPoints.length > 0 ? (
                  <div className="relative">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto overflow-visible">
                      <line x1="40" y1="30" x2={chartWidth - 40} y2="30" stroke="#1e293b" strokeWidth="1" />
                      <line x1="40" y1="75" x2={chartWidth - 40} y2="75" stroke="#1e293b" strokeWidth="1" />
                      <line x1="40" y1="120" x2={chartWidth - 40} y2="120" stroke="#1e293b" strokeWidth="1" />
                      <line x1="40" y1="160" x2={chartWidth - 40} y2="160" stroke="#334155" strokeWidth="1.5" />

                      <path d={areaPath} fill="rgba(99, 102, 241, 0.15)" />
                      <path d={linePath} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />

                      {chartPoints.map((p, idx) => (
                        <g key={idx} className="group cursor-pointer">
                          <circle cx={p.x} cy={p.y} r="5" fill="#0f172a" stroke="#6366f1" strokeWidth="3" />
                          <text x={p.x} y={p.y - 12} textAnchor="middle" className="text-[10px] font-bold fill-white">
                            {p.value}
                          </text>
                          <text x={p.x} y={chartHeight - 4} textAnchor="middle" className="text-[9px] font-semibold fill-slate-400">
                            {p.name.length > 10 ? `${p.name.substring(0, 8)}...` : p.name}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-xs">
                    <Activity className="w-8 h-8 mb-2 text-slate-500" />
                    <span>No statistical data found to map curve</span>
                  </div>
                )}
              </CardBody>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Attendance Summary</CardTitle>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="grid grid-cols-3 gap-2">
                    {["Present", "Absent", "Leave"].map((status) => {
                      const value = attendanceSummary.find((a) => a.status === status)?.total || 0;
                      const colorsMap = {
                        Present: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                        Absent: "bg-rose-500/10 text-rose-400 border-rose-500/20",
                        Leave: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                      };
                      return (
                        <div key={status} className={`p-3 rounded-2xl border text-center ${colorsMap[status]}`}>
                          <p className="text-[10px] uppercase font-bold tracking-wider">{status}</p>
                          <p className="text-lg font-black mt-1">{value}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Leave Requests</CardTitle>
                </CardHeader>
                <CardBody className="pt-0 space-y-3">
                  {leaveSummary.length > 0 ? (
                    leaveSummary.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          <span className="font-semibold text-slate-300">{item.status} Status</span>
                        </div>
                        <span className="font-bold text-white">{item.totalRequests} Requests</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 text-center">No leave requests registered.</p>
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Department Analytics Tab */}
      {activeTab === "departments" && (
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Department Headcount Distribution</CardTitle>
              <p className="text-xs text-slate-400 mt-1">Detailed breakdown of organization units</p>
            </div>
          </CardHeader>
          <CardBody>
            {departmentStats.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex justify-center relative">
                  <svg width="220" height="220" viewBox="0 0 160 160" className="transform -rotate-90">
                    <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#1e293b" strokeWidth="16" />
                    {donutSegments.map((seg, idx) => (
                      <circle
                        key={idx}
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="transparent"
                        stroke={seg.color.stroke}
                        strokeWidth={hoveredDept === seg.departmentName ? "22" : "16"}
                        strokeDasharray={circumference}
                        strokeDashoffset={seg.strokeOffset}
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredDept(seg.departmentName)}
                        onMouseLeave={() => setHoveredDept(null)}
                      />
                    ))}
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    {hoveredDept ? (
                      <>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Headcount</span>
                        <span className="text-2xl font-black text-white">
                          {departmentStats.find((d) => d.departmentName === hoveredDept)?.employeeCount || 0}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 max-w-[100px] text-center truncate">{hoveredDept}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Staff</span>
                        <span className="text-2xl font-black text-indigo-400">{totalDeptEmployees}</span>
                        <span className="text-[10px] font-bold text-slate-400">Across Units</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3.5">
                  {donutSegments.map((seg, idx) => {
                    const percentageValue = Math.round(seg.percent * 100);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                          hoveredDept === seg.departmentName
                            ? "bg-slate-800 border-indigo-500/50 translate-x-1"
                            : "bg-slate-950/40 border-slate-800"
                        }`}
                        onMouseEnter={() => setHoveredDept(seg.departmentName)}
                        onMouseLeave={() => setHoveredDept(null)}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-3.5 h-3.5 rounded-lg ${seg.color.bg}`} />
                          <span className="text-sm font-bold text-slate-200">{seg.departmentName}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-white">{seg.employeeCount} Members</span>
                          <span className="text-xs text-slate-400 ml-2">({percentageValue}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">
                <PieIcon className="w-12 h-12 mx-auto mb-2 text-slate-500" />
                <p>No department headcount details present.</p>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* Financials Tab */}
      {activeTab === "financials" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Salary & Compensation Metrics</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Highest Salary</span>
                  <p className="text-lg font-black text-emerald-400 mt-1">{formatCurrency(salaryStats?.highestSalary || 0)}</p>
                </div>
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Lowest Salary</span>
                  <p className="text-lg font-black text-amber-400 mt-1">{formatCurrency(salaryStats?.lowestSalary || 0)}</p>
                </div>
              </div>

              <div className="p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400">Total Monthly Payroll</span>
                  <p className="text-2xl font-black text-white mt-0.5">{formatCurrency(salaryStats?.totalSalary || 0)}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Staff Allocation by Unit</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              {departmentStats.length > 0 ? (
                departmentStats.map((dept, idx) => {
                  const percent = Math.round(((dept.employeeCount || 0) / totalDeptEmployees) * 100);
                  const color = getDeptColor(idx);
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>{dept.departmentName}</span>
                        <span>{percent}% Headcount</span>
                      </div>
                      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%`, backgroundColor: color.stroke }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400 text-center">No department information present.</p>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};