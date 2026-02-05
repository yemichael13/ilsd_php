import React, { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(API.checkAuth, { credentials: "include" });
        const data = await res.json();
        if (mounted) setAuthed(!!data.authenticated);
      } catch (e) {
        if (mounted) setAuthed(false);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, []);

  const logout = async () => {
    try {
      await fetch(API.logout, { method: "POST", credentials: "include" });
    } catch (e) {
      // ignore
    }
    setAuthed(false);
  };

  return (
    <AuthContext.Provider value={{ authed, loading, setAuthed, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
