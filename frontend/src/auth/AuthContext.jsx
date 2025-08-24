import { createContext, useContext, useEffect, useState } from "react";

/** ---------- CONFIG ---------- */
/** Use absolute URL in dev (or switch to '/api' if you added a Vite proxy). */
// const API_BASE = "http://127.0.0.1:8000/api";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (import.meta.env.PROD ? `${window.location.origin}/api` : "/api");

/** ---------- CONTEXT ---------- */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(localStorage.getItem("access") || null);
  const [refresh, setRefresh] = useState(
    localStorage.getItem("refresh") || null
  );
  const [loading, setLoading] = useState(true);

  function saveTokens({ access, refresh }) {
    if (access) {
      localStorage.setItem("access", access);
      setAccess(access);
    }
    if (refresh) {
      localStorage.setItem("refresh", refresh);
      setRefresh(refresh);
    }
  }

  function clearTokens() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAccess(null);
    setRefresh(null);
  }

  function logout() {
    clearTokens();
    setUser(null);
  }

  async function parseMaybeJSON(res) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return null;
    }
  }

  /** ---- API helpers ---- */
  async function login(username, password) {
    const res = await fetch(`${API_BASE}/auth/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await parseMaybeJSON(res);
    if (!res.ok || !data?.access) {
      throw new Error(data?.detail || "Invalid credentials");
    }
    saveTokens(data);
    await fetchMe(data.access); // populate user immediately
  }

  async function signup(username, email, password) {
    const res = await fetch(`${API_BASE}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await parseMaybeJSON(res);
    if (!res.ok) {
      throw new Error(data?.detail || `Signup failed (${res.status})`);
    }
    // auto-login
    await login(username, password);
  }

  async function refreshAccessToken() {
    if (!refresh) return null;
    const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    const data = await parseMaybeJSON(res);
    if (!res.ok || !data?.access) {
      logout();
      return null;
    }
    saveTokens({ access: data.access });
    return data.access;
  }

  async function fetchMe(usingAccess = access) {
    if (!usingAccess) {
      setUser(null);
      return;
    }
    const res = await fetch(`${API_BASE}/me/`, {
      headers: { Authorization: `Bearer ${usingAccess}` },
    });
    if (res.ok) {
      setUser(await res.json());
    } else if (res.status === 401) {
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        const r2 = await fetch(`${API_BASE}/me/`, {
          headers: { Authorization: `Bearer ${newAccess}` },
        });
        if (r2.ok) setUser(await r2.json());
        else setUser(null);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }

  /** Call once on mount / when tokens change */
  useEffect(() => {
    (async () => {
      await fetchMe();
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, [access]);

  /** Use this for any authenticated API call from components/hooks */
  async function authedFetch(path, options = {}) {
    let token = access;
    const doFetch = (tk) =>
      fetch(path.startsWith("http") ? path : `${API_BASE}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
          ...(tk ? { Authorization: `Bearer ${tk}` } : {}),
        },
      });

    let res = await doFetch(token);
    if (res.status === 401 && refresh) {
      const newAccess = await refreshAccessToken();
      if (newAccess) res = await doFetch(newAccess);
    }
    return res; // caller decides how to parse & handle .ok
  }

  const value = { user, loading, access, login, signup, logout, authedFetch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
