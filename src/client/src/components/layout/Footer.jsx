import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Globe, Share2, Mail } from "lucide-react";

// Reuse the same SVG logo from Sidebar
const HRMSLogo = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1" />
        <stop offset="1" stopColor="#4338ca" />
      </linearGradient>
    </defs>
    <rect width="40" height="40" rx="10" fill="url(#footerLogoGrad)" />
    <rect x="7"  y="16" width="4" height="13" rx="1" fill="white" fillOpacity="0.85" />
    <rect x="13" y="12" width="4" height="17" rx="1" fill="white" />
    <rect x="19" y="16" width="4" height="13" rx="1" fill="white" fillOpacity="0.85" />
    <rect x="6" y="28" width="19" height="2" rx="1" fill="white" fillOpacity="0.5" />
    <path
      d="M30.5 10.5 L36 13.5 L36 20 C36 24.5 30.5 28 30.5 28 C30.5 28 25 24.5 25 20 L25 13.5 Z"
      fill="white" fillOpacity="0.15"
      stroke="white" strokeWidth="1.2" strokeLinejoin="round"
    />
    <path
      d="M28 20 L30 22.5 L34 17.5"
      stroke="white" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

const footerLinks = [
  { label: "Dashboard",     to: "/dashboard" },
  { label: "Employees",     to: "/employees" },
  { label: "Attendance",    to: "/attendance" },
  { label: "Payroll",       to: "/payroll" },
  { label: "Recruitment",   to: "/recruitment" },
  { label: "Projects",      to: "/projects" },
];

export const Footer = () => (
  <footer className="bg-slate-900/90 border-t border-slate-800/60 backdrop-blur-xl">
    {/* Main row */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <HRMSLogo size={28} />
          <div>
            <p className="text-sm font-bold text-white leading-tight tracking-tight">Enterprise HRMS</p>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide">Workforce Platform</p>
          </div>
        </div>

        {/* Quick Links */}
        <nav className="flex flex-wrap gap-x-5 gap-y-1.5">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs text-slate-400 hover:text-indigo-400 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Social + version */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
            title="LinkedIn"
          >
            <Globe className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
            title="Social"
          >
            <Share2 className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:hr@enterprise.com"
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
            title="Contact HR"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
          <span className="ml-1 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-400">
            v2.4.0
          </span>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>© {new Date().getFullYear()} Enterprise HRMS. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Use</span>
          <span className="flex items-center gap-1 text-emerald-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            All Systems Operational
          </span>
        </div>
      </div>
    </div>
  </footer>
);
