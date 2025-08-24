import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await signup(form.username.trim(), form.email.trim(), form.password);
      navigate("/");
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="min-h-[80vh] w-full bg-gradient-to-b from-[#eaf6ff] via-[#f6fbff] to-[#e9fbf4] py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-2">
        {/* Left panel – mirrors the Contact page's info card */}
        <div className="rounded-2xl bg-white/70 p-6 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-semibold text-[#1f2d3a]">
            Welcome to Shaira’s studio
          </h2>
          <p className="mt-3 text-[#3b4a59]/80">
            Create an account to buy originals and prints, save your cart, and
            follow new drops. Already have an account?
          </p>
          <Link
            to="/login"
            className="mt-4 inline-block text-teal-700 underline underline-offset-4 hover:text-teal-800"
          >
            Log in instead →
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-[#3b4a59]/80">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              • Secure checkout with JWT
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              • Order history & updates
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              • Early access to releases
            </div>
          </div>
        </div>

        {/* Right panel – the form card */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-md backdrop-blur">
          <h1 className="mb-2 text-2xl font-semibold text-[#1f2d3a]">
            Create account
          </h1>
          {err && <p className="mb-3 text-red-600">{err}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-slate-600">
                Username
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none transition focus:ring-2 focus:ring-teal-500"
                placeholder="Your username"
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-600">
                Email (optional)
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 bg-white p-3 outline-none transition focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#0f766e] to-[#16a34a] px-4 py-3 font-medium text-white shadow-md transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              type="submit"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
