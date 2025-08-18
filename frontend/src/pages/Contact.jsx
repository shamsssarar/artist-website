import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, ok: null, error: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, error: "" });

    try {
      const API = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API}/contacts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // Try to read DRF error details
        let detail = "";
        try {
          detail = JSON.stringify(await res.json());
        } catch {}
        throw new Error(detail || `Request failed: ${res.status}`);
      }

      setStatus({ loading: false, ok: true, error: "" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, ok: false, error: err.message });
    }
  };

  return (
    <section className="relative py-16">
      {/* sea gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-50 via-sky-100 to-teal-200" />

      <div className="max-w-5xl mx-auto px-4">
        {/* header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-800">
            Let’s connect with Shaira
          </h2>
          <p className="mt-2 text-slate-600">
            Share your ideas, commissions, or collaborations — I’d love to hear
            from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* left: info */}
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-6 shadow-sm">
            <h3 className="text-xl font-medium text-slate-800">Contact</h3>
            <p className="mt-2 text-slate-600">
              Every message is important — whether it’s about a new project,
              commission, or a simple hello.
            </p>

            <dl className="mt-6 space-y-3 text-slate-700">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-100">
                  ✉️
                </span>
                <div>
                  <dt className="text-sm uppercase tracking-wide text-slate-500">
                    Email
                  </dt>
                  <dd className="font-medium">you@example.com</dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-100">
                  🎨
                </span>
                <div>
                  <dt className="text-sm uppercase tracking-wide text-slate-500">
                    Availability
                  </dt>
                  <dd className="font-medium">Open for commissions</dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <p className="mt-6 text-sm text-slate-500">
              Replies usually within 24–48 hours.
            </p>
          </div>

          {/* right: form */}
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border bg-white/90 backdrop-blur p-6 shadow-sm"
          >
            <div className="grid gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  required
                  rows={6}
                  placeholder="Write your message..."
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="group inline-flex items-center justify-center rounded-xl 
             bg-gradient-to-r from-[#22303d] via-[#2a4a57] to-teal-600
             px-5 py-3 font-medium text-white shadow-md transition
             hover:from-[#2d3f50] hover:via-[#335866] hover:to-teal-700
             disabled:opacity-60"
              >
                {status.loading ? "Sending..." : "Send message"}
              </button>

              {status.ok && (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700"
                >
                  Message sent ✅. I’ll get back to you soon.
                </div>
              )}
              {status.ok === false && (
                <div
                  role="alert"
                  className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700"
                >
                  {status.error || "Something went wrong. Please try again."}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
