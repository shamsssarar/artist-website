import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const [show, setShow] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(form.username.trim(), form.password);
      navigate(state?.from?.pathname || "/");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-b from-[#eaf6ff] via-[#f6fbff] to-[#e9fbf4] py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
        {/* Left panel – info, mirrors Contact/Signup vibe */}
        <div className="rounded-2xl bg-white/70 p-6 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-semibold text-[#1f2d3a]">
            Welcome back
          </h2>
          <p className="mt-3 text-[#3b4a59]/80">
            Sign in to continue shopping, track orders, and save favorites. New
            here?
          </p>
          <Link
            to="/signup"
            className="mt-4 inline-block text-teal-700 underline underline-offset-4 hover:text-teal-800"
          >
            Create an account →
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-[#3b4a59]/80">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              • Access your cart anywhere
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              • Track orders & updates
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              • Get early access to drops
            </div>
          </div>
        </div>

        {/* Right panel – the form card */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-md backdrop-blur">
          <h1 className="mb-2 text-2xl font-semibold text-[#1f2d3a]">Login</h1>
          {err && <p className="mb-3 text-red-600">{err}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-slate-600">
                Username
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none transition focus:ring-2 focus:ring-teal-500"
                placeholder="Username"
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-600">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white p-3 pr-12 outline-none transition focus:ring-2 focus:ring-teal-500"
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-700"
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#0f766e] to-[#16a34a] px-4 py-3 font-medium text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Sign in
            </button>

            <div className="mt-2 text-right">
              {/* adjust this link if you have your own reset route */}
              <a
                href="/accounts/password_reset/"
                className="text-sm text-teal-700 underline underline-offset-4 hover:text-teal-800"
              >
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
