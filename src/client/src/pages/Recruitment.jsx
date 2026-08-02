import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Modal } from "../components/ui/Modal";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { Table } from "../components/ui/Table";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatDate } from "../utils/formatters";
import { getAllJobs, createJob, deleteJob, getAllCandidates, createCandidate, updateCandidate } from "../services/recruitmentService";
import {
  Briefcase,
  UserCheck,
  CalendarCheck,
  Plus,
  Users,
  Trash2,
} from "lucide-react";

export const Recruitment = () => {
  const { user } = useAuth();
  const isHR = user?.role === "HR" || user?.role === "Admin";
  const { showSuccess, showError } = useToast();
  const [activeTab, setActiveTab] = useState("requisitions");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);

  const [jobFormData, setJobFormData] = useState({ title: "", department: "Engineering", location: "Hybrid", type: "Full-Time", experience: "3-5 Years", salaryRange: "", status: "Open" });
  const [candidateFormData, setCandidateFormData] = useState({ name: "", position: "", email: "", phone: "", stage: "Screening", matchScore: "90%" });

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [jobRes, candRes] = await Promise.all([getAllJobs(), getAllCandidates()]);
      if (jobRes.success && jobRes.data) setJobs(jobRes.data.jobs || []);
      if (candRes.success && candRes.data) setCandidates(candRes.data.candidates || []);
    } catch (err) { showError("Failed to load recruitment data"); }
    finally { setLoading(false); }
  }, [showError]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleOpenAddJob = () => {
    if (!isHR) return;
    setJobFormData({ title: "", department: "Engineering", location: "Hybrid", type: "Full-Time", experience: "3-5 Years", salaryRange: "", status: "Open" });
    setIsJobModalOpen(true);
  };

  const handleOpenAddCandidate = () => {
    if (!isHR) return;
    setCandidateFormData({ name: "", position: jobs[0]?.title || "", email: "", phone: "", stage: "Screening", matchScore: "90%" });
    setIsCandidateModalOpen(true);
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();
    if (!isHR) return;
    if (!jobFormData.title) { showError("Please enter requisition title"); return; }
    setIsSubmitting(true);
    try {
      const res = await createJob(jobFormData);
      if (res.success) { showSuccess("Job requisition created successfully!"); setIsJobModalOpen(false); fetchAll(); }
    } catch (err) { showError(err.response?.data?.message || "Failed to create job"); }
    finally { setIsSubmitting(false); }
  };

  const handleSubmitCandidate = async (e) => {
    e.preventDefault();
    if (!isHR) return;
    if (!candidateFormData.name || !candidateFormData.email) { showError("Name and email are required"); return; }
    setIsSubmitting(true);
    try {
      const res = await createCandidate(candidateFormData);
      if (res.success) { showSuccess("Candidate added to recruitment pipeline!"); setIsCandidateModalOpen(false); fetchAll(); }
    } catch (err) { showError(err.response?.data?.message || "Failed to add candidate"); }
    finally { setIsSubmitting(false); }
  };

  const handleStageChange = async (candidateId, newStage) => {
    if (!isHR) return;
    try {
      const res = await updateCandidate(candidateId, { stage: newStage });
      if (res.success) { showSuccess(`Stage updated to ${newStage}`); fetchAll(); }
    } catch (err) { showError("Failed to update stage"); }
  };

  const handleDeleteJob = async (id) => {
    if (!isHR) return;
    try {
      const res = await deleteJob(id);
      if (res.success) { showSuccess("Requisition deleted"); fetchAll(); }
    } catch (err) { showError("Failed to delete job"); }
  };

  const candidateColumns = [
    {
      header: "Candidate Name",
      accessor: "name",
      render: (row) => (
        <div>
          <p className="font-semibold text-white leading-tight">{row.name}</p>
          <p className="text-xs text-slate-400 font-mono">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Applied Position",
      accessor: "position",
      render: (row) => <span className="text-xs font-semibold text-slate-200">{row.position}</span>,
    },
    {
      header: "Match Rating",
      accessor: "matchScore",
      render: (row) => (
        <span className="font-semibold text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
          {row.matchScore} Match
        </span>
      ),
    },
    {
      header: "Pipeline Stage",
      accessor: "stage",
      render: (row) =>
        isHR ? (
          <Select
            value={row.stage}
            onChange={(e) => handleStageChange(row._id, e.target.value)}
            options={[
              { label: "Screening", value: "Screening" },
              { label: "Interview Scheduled", value: "Interview Scheduled" },
              { label: "Offer Extended", value: "Offer Extended" },
              { label: "Hired", value: "Hired" },
              { label: "Rejected", value: "Rejected" },
            ]}
            className="text-xs font-semibold py-1.5"
          />
        ) : (
          <Badge variant="primary">{row.stage}</Badge>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recruitment & Talent Acquisition</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-normal">
            Manage open job requisitions, candidate pipelines, and interview stages
          </p>
        </div>

        {isHR && (
          <div className="flex items-center gap-3">
            <Button variant="outline" icon={Users} onClick={handleOpenAddCandidate}>
              Add Candidate
            </Button>
            <Button variant="primary" icon={Plus} onClick={handleOpenAddJob}>
              Create Job Post
            </Button>
          </div>
        )}
      </div>

      {isHR && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <StatCard
            title="Open Requisitions"
            value={jobs.filter((j) => j.status === "Open").length}
            subtitle="Active job postings"
            icon={Briefcase}
            iconBg="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
          />

          <StatCard
            title="Total Candidates"
            value={candidates.length}
            subtitle="Applicants in pipeline"
            icon={Users}
            iconBg="bg-purple-500/15 text-purple-400 border border-purple-500/30"
          />

          <StatCard
            title="Interviews Set"
            value={candidates.filter((c) => c.stage === "Interview Scheduled").length}
            subtitle="Scheduled this week"
            icon={CalendarCheck}
            iconBg="bg-amber-500/15 text-amber-400 border border-amber-500/30"
          />

          <StatCard
            title="Hired Talent"
            value={candidates.filter((c) => c.stage === "Hired").length}
            subtitle="Successful hires"
            icon={UserCheck}
            iconBg="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          />
        </div>
      )}

      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab("requisitions")}
          className={`pb-4 px-6 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "requisitions"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Job Requisitions ({jobs.length})
        </button>
        <button
          onClick={() => setActiveTab("candidates")}
          className={`pb-4 px-6 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "candidates"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Candidate Pipeline ({candidates.length})
        </button>
      </div>

      {activeTab === "requisitions" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card key={job._id} className="flex flex-col justify-between">
              <div>
                <CardHeader>
                  <div className="space-y-1 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={job.status === "Open" ? "success" : "warning"}>
                        {job.status}
                      </Badge>
                      <span className="text-[11px] font-mono text-slate-400">{job.id}</span>
                    </div>
                    <CardTitle className="text-base font-bold mt-2 leading-snug">
                      {job.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardBody className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Department:</span>
                    <span className="font-semibold text-white">{job.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Location:</span>
                    <span className="font-semibold text-white">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Salary Range:</span>
                    <span className="font-bold text-emerald-400">{job.salaryRange}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="text-slate-400 font-medium">Applicants:</span>
                    <span className="font-bold text-indigo-400 text-sm">{job.applicantsCount} Applied</span>
                  </div>
                </CardBody>
              </div>

              {isHR && (
                <div className="p-4 bg-slate-950/40 border-t border-slate-800 flex items-center justify-end gap-2">
                  <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDeleteJob(job._id)}>
                    Delete
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {activeTab === "candidates" && (
        <Table
          columns={candidateColumns}
          data={candidates}
          emptyMessage="No candidates in pipeline"
        />
      )}

      {isHR && (
        <Modal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
          title="Create Job Requisition"
          subtitle="Post a new open position for recruitment"
        >
          <form onSubmit={handleSubmitJob} className="space-y-4">
            <Input
              label="Job Title"
              name="title"
              placeholder="e.g. Senior Backend Engineer"
              value={jobFormData.title}
              onChange={(e) => setJobFormData({ ...jobFormData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Department"
                name="department"
                value={jobFormData.department}
                onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                options={[
                  { label: "Engineering", value: "Engineering" },
                  { label: "Product & Design", value: "Product & Design" },
                  { label: "Human Resources", value: "Human Resources" },
                  { label: "Finance & Sales", value: "Finance & Sales" },
                ]}
                required
              />
              <Input
                label="Location"
                name="location"
                placeholder="Hybrid / Remote"
                value={jobFormData.location}
                onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Job Type"
                name="type"
                value={jobFormData.type}
                onChange={(e) => setJobFormData({ ...jobFormData, type: e.target.value })}
                options={[
                  { label: "Full-Time",   value: "Full-Time" },
                  { label: "Part-Time",   value: "Part-Time" },
                  { label: "Contract",    value: "Contract" },
                  { label: "Internship",  value: "Internship" },
                  { label: "Freelance",   value: "Freelance" },
                ]}
                required
              />
              <Select
                label="Experience Required"
                name="experience"
                value={jobFormData.experience}
                onChange={(e) => setJobFormData({ ...jobFormData, experience: e.target.value })}
                options={[
                  { label: "Fresher (0-1 Year)",  value: "Fresher" },
                  { label: "1-2 Years",            value: "1-2 Years" },
                  { label: "2-3 Years",            value: "2-3 Years" },
                  { label: "3-5 Years",            value: "3-5 Years" },
                  { label: "5-8 Years",            value: "5-8 Years" },
                  { label: "8+ Years",             value: "8+ Years" },
                ]}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Salary Budget Range"
                name="salaryRange"
                placeholder="₹15,00,000 - ₹20,00,000"
                value={jobFormData.salaryRange}
                onChange={(e) => setJobFormData({ ...jobFormData, salaryRange: e.target.value })}
                required
              />
              <Select
                label="Requisition Status"
                name="status"
                value={jobFormData.status}
                onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value })}
                options={[
                  { label: "Open",      value: "Open" },
                  { label: "In Review", value: "In Review" },
                  { label: "Closed",    value: "Closed" },
                ]}
                required
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="outline" onClick={() => setIsJobModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Post Requisition
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {isHR && (
        <Modal
          isOpen={isCandidateModalOpen}
          onClose={() => setIsCandidateModalOpen(false)}
          title="Add Applicant to Pipeline"
          subtitle="Log candidate details and initial evaluation stage"
        >
          <form onSubmit={handleSubmitCandidate} className="space-y-4">
            <Input
              label="Candidate Full Name"
              name="name"
              placeholder="John Smith"
              value={candidateFormData.name}
              onChange={(e) => setCandidateFormData({ ...candidateFormData, name: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={candidateFormData.email}
                onChange={(e) => setCandidateFormData({ ...candidateFormData, email: e.target.value })}
                required
              />
              <Input
                label="Contact Phone"
                name="phone"
                placeholder="+91 9876543210"
                value={candidateFormData.phone}
                onChange={(e) => setCandidateFormData({ ...candidateFormData, phone: e.target.value })}
                required
              />
            </div>

            <Select
              label="Applying Position"
              name="position"
              value={candidateFormData.position}
              onChange={(e) => setCandidateFormData({ ...candidateFormData, position: e.target.value })}
              options={jobs.map((j) => ({ label: j.title, value: j.title }))}
              required
            />

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="outline" onClick={() => setIsCandidateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Candidate
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
