// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

/** ---------- CONFIG ---------- */
export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? `${window.location.origin}/api` : "/api");

const AuthContext = createContext(null);
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(() => localStorage.getItem("access"));
  const [refresh, setRefresh] = useState(() => localStorage.getItem("refresh"));
  const [loading, setLoading] = useState(true);

  /** keep a single in-flight refresh promise */
  const refreshInflight = useRef(null);

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
    // navigate("/login"); // <- enable if you prefer redirect on logout
  }

  async function parseMaybeJSON(res) {
    const txt = await res.text();
    try {
      return txt ? JSON.parse(txt) : null;
    } catch {
      return null;
    }
  }

  /** decode JWT payload safely */
  function decodeJwt(token) {
    try {
      const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const json = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(json);
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
    if (!res.ok || !data?.access)
      throw new Error(data?.detail || "Invalid credentials");
    saveTokens(data);
    await fetchMe(data.access);
  }

  async function signup(username, email, password) {
    const res = await fetch(`${API_BASE}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await parseMaybeJSON(res);
    if (!res.ok)
      throw new Error(data?.detail || `Signup failed (${res.status})`);
    await login(username, password);
  }

  async function refreshAccessToken() {
    if (!refresh) return null;

    // return existing in-flight refresh if present
    if (refreshInflight.current) return await refreshInflight.current;

    refreshInflight.current = (async () => {
      const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      const data = await parseMaybeJSON(res);
      if (!res.ok || !data?.access) {
        refreshInflight.current = null;
        logout();
        return null;
      }
      saveTokens({ access: data.access });
      refreshInflight.current = null;
      return data.access;
    })();

    return await refreshInflight.current;
  }

  async function fetchMe(usingAccess = access) {
    if (!usingAccess) {
      setUser(null);
      return;
    }
    const res = await fetch(`${API_BASE}/me/`, {
      headers: { Authorization: `Bearer ${usingAccess}` },
    });
    if (res.ok) setUser(await res.json());
    else if (res.status === 401) {
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        const r2 = await fetch(`${API_BASE}/me/`, {
          headers: { Authorization: `Bearer ${newAccess}` },
        });
        setUser(r2.ok ? await r2.json() : null);
      } else setUser(null);
    } else setUser(null);
  }

  /** proactive refresh a bit before expiry (30s) */
  useEffect(() => {
    if (!access) return;
    const payload = decodeJwt(access);
    const exp = payload?.exp ? payload.exp * 1000 : null;
    if (!exp) return;

    const now = Date.now();
    const ms = Math.max(exp - now - 30_000, 0); // refresh 30s early
    const id = setTimeout(() => {
      refreshAccessToken();
    }, ms);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, refresh]);

  /** load me on mount / access change */
  useEffect(() => {
    (async () => {
      await fetchMe();
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access]);

  /** cross-tab logout/login sync */
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "access") setAccess(e.newValue);
      if (e.key === "refresh") setRefresh(e.newValue);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /** authenticated fetch helper */
  async function authedFetch(path, options = {}) {
    const apiOrigin = new URL(API_BASE, window.location.origin).origin;
    const target = path.startsWith("http")
      ? new URL(path)
      : new URL(path, API_BASE);
    const sameApi = target.origin === apiOrigin;

    const buildHeaders = (tk) => {
      const h = new Headers(options.headers || {});
      // only set Content-Type when body is plain JSON
      const isForm =
        typeof FormData !== "undefined" && options.body instanceof FormData;
      if (!isForm && !h.has("Content-Type"))
        h.set("Content-Type", "application/json");
      if (sameApi && tk) h.set("Authorization", `Bearer ${tk}`);
      return h;
    };

    let res = await fetch(target.toString(), {
      ...options,
      headers: buildHeaders(access),
    });

    if (res.status === 401 && refresh && sameApi) {
      const newAccess = await refreshAccessToken();
      if (newAccess)
        res = await fetch(target.toString(), {
          ...options,
          headers: buildHeaders(newAccess),
        });
    }
    return res;
  }

  const value = {
    user,
    loading,
    access,
    login,
    signup,
    logout,
    authedFetch,
    API_BASE,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
