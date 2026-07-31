import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Home } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-8xl font-extrabold text-indigo-500 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
        <p className="text-slate-400 text-sm">
          The requested page does not exist or you do not have permission to view it.
        </p>
        <div className="pt-4">
          <Link to="/dashboard">
            <Button variant="primary" icon={Home}>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
