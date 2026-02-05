import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API } from "../../api.js";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState({ loading: true, ok: false });

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await fetch(API.checkAuth, { credentials: "include" });
        const data = await res.json();
        if (mounted) setStatus({ loading: false, ok: !!data.authenticated });
      } catch (e) {
        if (mounted) setStatus({ loading: false, ok: false });
      }
    })();

    return () => (mounted = false);
  }, []);

  if (status.loading) return null;
  if (!status.ok) return <Navigate to="/admin/login" replace />;

  return children;
}
