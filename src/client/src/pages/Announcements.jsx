import React, { useState, useEffect, useCallback } from "react";
import { Card, CardBody } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { TextArea } from "../components/ui/TextArea";
import { Modal } from "../components/ui/Modal";
import { Badge } from "../components/ui/Badge";
import { StatCard } from "../components/ui/StatCard";
import { SearchBar } from "../components/ui/SearchBar";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatDate } from "../utils/formatters";
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "../services/announcementService";
import {
  Megaphone,
  Pin,
  Plus,
  AlertTriangle,
  Bell,
  Eye,
  Trash2,
  Edit2,
  Calendar,
  Users,
  Tag,
} from "lucide-react";

export const Announcements = () => {
  const { user } = useAuth();
  const isHR = user?.role === "HR" || user?.role === "Admin";
  const { showSuccess, showError } = useToast();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [announcements, setAnnouncements] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "Company Update",
    priority: "Normal",
    targetAudience: "All Employees",
    isPinned: false,
    content: "",
  });

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllAnnouncements();
      if (res.success && res.data) setAnnouncements(res.data.announcements || []);
    } catch (err) {
      showError("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => { fetchAnnouncements(); }, [fetchAnnouncements]);

  const handleOpenAdd = () => {
    if (!isHR) return;
    setCurrentNotice(null);
    setFormData({ title: "", category: "Company Update", priority: "Normal", targetAudience: "All Employees", isPinned: false, content: "" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ann) => {
    if (!isHR) return;
    setCurrentNotice(ann);
    setFormData({ title: ann.title, category: ann.category, priority: ann.priority, targetAudience: ann.targetAudience, isPinned: ann.isPinned, content: ann.content });
    setIsModalOpen(true);
  };

  const handleOpenView = (ann) => { setSelectedNotice(ann); setIsViewModalOpen(true); };

  const handleDelete = async (id) => {
    if (!isHR) return;
    try {
      const res = await deleteAnnouncement(id);
      if (res.success) { showSuccess("Announcement deleted successfully"); fetchAnnouncements(); }
    } catch (err) { showError(err.response?.data?.message || "Failed to delete"); }
  };

  const handleTogglePin = async (ann) => {
    if (!isHR) return;
    try {
      const res = await updateAnnouncement(ann._id, { isPinned: !ann.isPinned });
      if (res.success) { showSuccess("Pin status updated"); fetchAnnouncements(); }
    } catch (err) { showError("Failed to update pin status"); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isHR) return;
    if (!formData.title || !formData.content) { showError("Please enter title and notice body"); return; }
    setIsSubmitting(true);
    try {
      if (currentNotice) {
        const res = await updateAnnouncement(currentNotice._id, formData);
        if (res.success) { showSuccess("Announcement updated successfully"); }
      } else {
        const res = await createAnnouncement({ ...formData, author: user?.username || "HR Admin" });
        if (res.success) { showSuccess("New announcement published successfully"); }
      }
      setIsModalOpen(false);
      fetchAnnouncements();
    } catch (err) { showError(err.response?.data?.message || "Operation failed"); }
    finally { setIsSubmitting(false); }
  };

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? a.category === selectedCategory : true;
    const matchesPriority = selectedPriority ? a.priority === selectedPriority : true;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const urgentCount = announcements.filter((a) => a.priority === "Urgent").length;
  const pinnedCount = announcements.filter((a) => a.isPinned).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Announcements & Notices</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-normal">
            Broadcast official company updates, policy changes, and urgent alerts
          </p>
        </div>
        {isHR && (
          <Button variant="primary" icon={Plus} onClick={handleOpenAdd}>
            Publish Announcement
          </Button>
        )}
      </div>

      {isHR && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            title="Total Published"
            value={announcements.length}
            subtitle="Active announcements"
            icon={Megaphone}
            iconBg="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
          />

          <StatCard
            title="Pinned Notices"
            value={pinnedCount}
            subtitle="Important notice highlights"
            icon={Pin}
            iconBg="bg-amber-500/15 text-amber-400 border border-amber-500/30"
          />

          <StatCard
            title="Urgent Alerts"
            value={urgentCount}
            subtitle="High priority broadcasts"
            icon={AlertTriangle}
            iconBg="bg-rose-500/15 text-rose-400 border border-rose-500/30"
          />
        </div>
      )}

      <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800/80 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <SearchBar
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search announcements..."
          className="w-full sm:w-80"
        />

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Select
            placeholder="All Categories"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { label: "Policy Update", value: "Policy Update" },
              { label: "Company Event", value: "Company Event" },
              { label: "IT Maintenance", value: "IT Maintenance" },
              { label: "Company Update", value: "Company Update" },
            ]}
            containerClassName="w-full sm:w-44"
          />

          <Select
            placeholder="All Priorities"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            options={[
              { label: "Urgent", value: "Urgent" },
              { label: "High", value: "High" },
              { label: "Normal", value: "Normal" },
            ]}
            containerClassName="w-full sm:w-40"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((ann) => (
            <Card key={ann._id} className={`relative transition-all duration-300 ${ann.isPinned ? "border-indigo-500/40 bg-slate-900" : ""}`}>
              <CardBody className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {ann.isPinned && (
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shrink-0">
                        <Pin className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {ann.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400 font-normal">
                        <span className="flex items-center gap-1 font-semibold">
                          <Tag className="w-3.5 h-3.5 text-indigo-400" /> {ann.category}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold">
                          <Users className="w-3.5 h-3.5 text-slate-400" /> {ann.targetAudience}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400 font-mono">
                          <Calendar className="w-3.5 h-3.5" /> {formatDate(ann.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant={
                        ann.priority === "Urgent"
                          ? "danger"
                          : ann.priority === "High"
                          ? "warning"
                          : "primary"
                      }
                    >
                      {ann.priority}
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
                  {ann.content}
                </p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Author: <strong className="text-white font-semibold">{ann.author}</strong></span>

                  <div className="flex items-center gap-2">
                    {isHR && (
                      <button
                        onClick={() => handleTogglePin(ann)}
                        className={`p-2 rounded-xl transition-colors ${
                          ann.isPinned
                            ? "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                        title={ann.isPinned ? "Unpin Notice" : "Pin Notice"}
                      >
                        <Pin className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleOpenView(ann)}
                      className="p-2 rounded-xl text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                      title="View Full Notice"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {isHR && (
                      <>
                        <button
                          onClick={() => handleOpenEdit(ann)}
                          className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                          title="Edit Notice"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ann._id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title="Delete Notice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800/80 p-12 text-center shadow-xl">
            <Bell className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <h4 className="text-base font-bold text-white">No announcements found</h4>
            <p className="text-xs text-slate-400 mt-1 font-normal">Publish an official company notice to inform staff.</p>
          </div>
        )}
      </div>

      {isHR && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentNotice ? "Edit Announcement" : "Publish Announcement"}
          subtitle="Broadcast important company news or policy updates"
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Announcement Title"
              name="title"
              placeholder="e.g. Annual HR Performance Review"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                options={[
                  { label: "Company Update", value: "Company Update" },
                  { label: "Policy Update", value: "Policy Update" },
                  { label: "Company Event", value: "Company Event" },
                  { label: "IT Maintenance", value: "IT Maintenance" },
                ]}
                required
              />
              <Select
                label="Priority Level"
                name="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                options={[
                  { label: "Normal", value: "Normal" },
                  { label: "High", value: "High" },
                  { label: "Urgent", value: "Urgent" },
                ]}
                required
              />
            </div>

            <Select
              label="Target Audience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              options={[
                { label: "All Employees", value: "All Employees" },
                { label: "Engineering & IT", value: "Engineering & IT" },
                { label: "HR & Operations", value: "HR & Operations" },
                { label: "Finance Team", value: "Finance Team" },
              ]}
              required
            />

            <TextArea
              label="Announcement Content"
              name="content"
              rows={4}
              placeholder="Write clear details for the announcement..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isPinned"
                checked={formData.isPinned}
                onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-800"
              />
              <label htmlFor="isPinned" className="text-xs font-semibold text-slate-300">
                Pin to Top of Dashboard Feed
              </label>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {currentNotice ? "Save Changes" : "Publish Announcement"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Notice Announcement Details"
        maxWidth="max-w-xl"
      >
        {selectedNotice && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">{selectedNotice.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-normal">
                  Published by {selectedNotice.author} on {formatDate(selectedNotice.publishedDate)}
                </p>
              </div>
              <Badge
                variant={
                  selectedNotice.priority === "Urgent"
                    ? "danger"
                    : selectedNotice.priority === "High"
                    ? "warning"
                    : "primary"
                }
              >
                {selectedNotice.priority}
              </Badge>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 leading-relaxed whitespace-pre-line font-normal">
              {selectedNotice.content}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
