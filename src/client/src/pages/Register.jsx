import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { User, Mail, Phone, Lock, Building, ArrowRight, Eye, EyeOff, ShieldCheck, CheckCircle2 } from "lucide-react";

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contactNumber: "",
    password: "",
    role: "Employee",
    department: "Engineering",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || isCooldown) return;

    const { username, email, contactNumber, password, role, department } = formData;
    if (!username || !email || !contactNumber || !password || !role || !department) {
      showError("All fields are required for registration");
      return;
    }

    setLoading(true);
    setIsCooldown(true);

    try {
      const res = await register({
        ...formData,
        contactNumber: Number(contactNumber),
      });
      if (res?.success) {
        showSuccess("Registration successful! You can now sign in.");
        navigate("/login");
      } else {
        showError(res?.message || "Registration failed");
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Registration request failed. Please check your data or try again.";
      showError(msg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsCooldown(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-slate-900/90 border border-slate-800/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Left Side: Corporate Info */}
        <div className="p-8 sm:p-10 bg-gradient-to-b from-indigo-950/60 to-slate-950/80 border-r border-slate-800/80 flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                H
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">HRMS Portal</h3>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Register Account</span>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <h2 className="text-2xl font-black text-white leading-tight">
                Join Your Enterprise HR Network
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Create your staff or management profile to log attendance, apply for leaves, and view payroll details.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant Account Provisioning</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-role Support (Employee, HR, Admin)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secure Data Partitioning</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 relative z-10 flex items-center justify-between text-[11px] text-slate-400">
            <span>© 2026 HRMS Enterprise</span>
            <span className="flex items-center gap-1 text-indigo-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO 27001 Certified
            </span>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white tracking-tight">Create Account</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your details to set up your user credentials
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Username"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  icon={User}
                  required
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Contact Phone"
                  name="contactNumber"
                  type="number"
                  placeholder="9876543210"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  icon={Phone}
                  required
                />

                <div className="relative">
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    icon={Lock}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-[38px] text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="User Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={[
                    { label: "Employee", value: "Employee" },
                    { label: "HR Manager", value: "HR" },
                    { label: "Administrator", value: "Admin" },
                  ]}
                  required
                />
                <Input
                  label="Department"
                  name="department"
                  placeholder="e.g. Engineering"
                  value={formData.department}
                  onChange={handleChange}
                  icon={Building}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 mt-2"
                isLoading={loading}
                disabled={isCooldown}
              >
                Complete Registration <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};