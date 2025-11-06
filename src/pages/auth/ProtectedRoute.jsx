// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // No token → redirect to login
    if (!token) {
      navigate("/auth/login", { replace: true });
      return;
    }

    // Has token but on auth pages → redirect to dashboard
    if (token && location.pathname.includes("/auth")) {
      navigate("/", { replace: true });
      return;
    }

    setLoading(false);
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
}
