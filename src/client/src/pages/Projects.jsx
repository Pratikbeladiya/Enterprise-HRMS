import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Modal } from "../components/ui/Modal";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { SearchBar } from "../components/ui/SearchBar";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatCurrency, formatDate } from "../utils/formatters";
import { getAllProjects, createProject, updateProject, deleteProject } from "../services/projectService";
import {
  FolderKanban,
  CheckCircle2,
  Plus,
  DollarSign,
  Trash2,
  Edit2,
  CheckSquare,
} from "lucide-react";

export const Projects = () => {
  const { user } = useAuth();
  const isHR = user?.role === "HR" || user?.role === "Admin";
  const { showSuccess, showError } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    name: "", client: "", manager: "", teamSize: 4,
    budget: 500000, status: "In Progress", priority: "Medium", dueDate: "2026-12-31",
  });

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllProjects();
      if (res.success && res.data) setProjects(res.data.projects || []);
    } catch (err) { showError("Failed to load projects"); }
    finally { setLoading(false); }
  }, [showError]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleOpenAdd = () => {
    if (!isHR) return;
    setCurrentProject(null);
    setFormData({ name: "", client: "", manager: user?.username || "", teamSize: 4, budget: 500000, status: "In Progress", priority: "Medium", dueDate: "2026-12-31" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prj) => {
    if (!isHR) return;
    setCurrentProject(prj);
    setFormData({ name: prj.name, client: prj.client, manager: prj.manager, teamSize: prj.teamSize, budget: prj.budget, status: prj.status, priority: prj.priority, dueDate: prj.dueDate?.split("T")[0] || prj.dueDate });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!isHR) return;
    try {
      const res = await deleteProject(id);
      if (res.success) { showSuccess("Project deleted successfully"); fetchProjects(); }
    } catch (err) { showError(err.response?.data?.message || "Failed to delete project"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isHR) return;
    if (!formData.name || !formData.client) { showError("Project name and client are required"); return; }
    setIsSubmitting(true);
    try {
      if (currentProject) {
        const res = await updateProject(currentProject._id, formData);
        if (res.success) { showSuccess("Project updated successfully!"); }
      } else {
        const res = await createProject({ ...formData, progress: 0, completedTasks: 0, totalTasks: 10 });
        if (res.success) { showSuccess("New project created!"); }
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) { showError(err.response?.data?.message || "Operation failed"); }
    finally { setIsSubmitting(false); }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const activeProjectsCount = projects.filter((p) => p.status === "In Progress").length;
  const completedProjectsCount = projects.filter((p) => p.status === "Completed").length;
  const totalBudgetAllocated = projects.reduce((acc, p) => acc + (p.budget || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Project Management</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-normal">
            Track enterprise project deliverables, team allocations, deadlines & budgets
          </p>
        </div>
        {isHR && (
          <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
            New Project
          </Button>
        )}
      </div>

      {isHR && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <StatCard
            title="Active Projects"
            value={activeProjectsCount}
            subtitle="Currently in execution"
            icon={FolderKanban}
            iconBg="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
          />

          <StatCard
            title="Completed"
            value={completedProjectsCount}
            subtitle="Successfully delivered"
            icon={CheckCircle2}
            iconBg="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          />

          <StatCard
            title="Total Budget"
            value={formatCurrency(totalBudgetAllocated)}
            subtitle="Allocated project capital"
            icon={DollarSign}
            iconBg="bg-amber-500/15 text-amber-400 border border-amber-500/30"
          />

          <StatCard
            title="Deliverables"
            value={projects.reduce((sum, p) => sum + p.completedTasks, 0)}
            subtitle="Tasks completed"
            icon={CheckSquare}
            iconBg="bg-purple-500/15 text-purple-400 border border-purple-500/30"
          />
        </div>
      )}

      <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800/80 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search project name or client..."
          className="w-full sm:w-80"
        />

        <Select
          placeholder="All Statuses"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { label: "In Progress", value: "In Progress" },
            { label: "Completed", value: "Completed" },
            { label: "Planning", value: "Planning" },
          ]}
          containerClassName="w-full sm:w-44"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((prj) => (
          <Card key={prj._id} className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400">{prj.id}</span>
                    <Badge variant={prj.status === "Completed" ? "success" : "primary"}>
                      {prj.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold text-white mt-1">
                    {prj.name}
                  </CardTitle>
                  <p className="text-xs text-indigo-400 font-semibold">{prj.client}</p>
                </div>
              </CardHeader>

              <CardBody className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>Execution Progress</span>
                    <span className="text-indigo-400">{prj.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
                      style={{ width: `${prj.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Project Manager:</span>
                    <span className="font-semibold text-white">{prj.manager}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Tasks Completed:</span>
                    <span className="font-semibold text-white">
                      {prj.completedTasks} / {prj.totalTasks}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Budget:</span>
                    <span className="font-bold text-emerald-400">{formatCurrency(prj.budget)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Target Deadline:</span>
                    <span className="font-mono text-slate-200">{formatDate(prj.dueDate)}</span>
                  </div>
                </div>
              </CardBody>
            </div>

            {isHR && (
              <CardFooter>
                <div className="flex items-center justify-end gap-2 w-full">
                  <Button variant="outline" size="sm" icon={Edit2} onClick={() => handleOpenEdit(prj)}>Edit</Button>
                  <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(prj._id)}>Delete</Button>
                </div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>

      {isHR && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentProject ? "Edit Project" : "Create New Project"}
          subtitle="Specify project parameters, lead manager & budget allocation"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Project Name"
              name="name"
              placeholder="Core Banking Migration"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Input
              label="Client / Business Sector"
              name="client"
              placeholder="FinTech Corp"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Project Manager"
                name="manager"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                required
              />
              <Input
                label="Budget (₹)"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Project Status"
                name="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                options={[
                  { label: "In Progress", value: "In Progress" },
                  { label: "Completed", value: "Completed" },
                  { label: "Planning", value: "Planning" },
                ]}
                required
              />
              <Input
                label="Target Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {currentProject ? "Save Project Changes" : "Create Project"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
