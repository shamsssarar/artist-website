// src/pages/About.jsx

import lolo from '../assets/images/lolo.jpg'

export default function About() {
  return (
    <main className="relative">
      {/* sea gradient backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 via-cyan-50 to-teal-100" />

      {/* hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
              Shaira Maliha
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Shaira Maliha is an artist residing in AIMS, Gulshan. Having always been creative, she pursued her dream by earning a 1st Class Degree in Painting, Drawing and Printmaking in 2020. Bangladeshi visual artist whose practice flows like the
              tide—balancing light, memory, and the textures of everyday life.
            </p>

            <p className="mt-6 leading-relaxed text-slate-700">
              Rooted in the rhythms of the sea, Shaira explores the delicate
              relationship between nature and memory. Each work carries
              fragments of shoreline walks, weathered paint, and fleeting light,
              layered into calm and contemplative compositions.
            </p>

            <p className="mt-4 leading-relaxed text-slate-700">
              Her pieces move across acrylic, mixed media, and digital
              experiments— blending contemporary techniques with traditional
              sensibilities. Inspired by tidal cycles and the quiet poetry of
              daily rituals, Shaira’s art seeks to hold stillness in color and
              form.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center rounded-xl 
                 bg-gradient-to-r from-[#22303d] via-[#2a4a57] to-teal-600 
                 px-6 py-3 font-medium text-white shadow-md transition 
                 hover:from-[#2d3f50] hover:via-[#335866] hover:to-teal-700"
              >
                Wanna hello?
              </a>
            </div>
          </div>

          {/* portrait / card */}
          <div className="relative">
            <div className="rounded-3xl border border-teal-200/60 bg-white/80 p-3 shadow-sm backdrop-blur">
              <div className="aspect-[3/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-teal-100 to-cyan-100">
                {/* replace with your image */}
                <img
                  src={lolo}
                  alt="Artist portrait"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-sky-50 p-3">
                  <div className="text-xl font-semibold text-slate-900">6+</div>
                  <div className="text-xs text-slate-600">Years painting</div>
                </div>
                <div className="rounded-xl bg-sky-50 p-3">
                  <div className="text-xl font-semibold text-slate-900">40+</div>
                  <div className="text-xs text-slate-600">Prints</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* materials & approach */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-3xl border bg-white/80 p-6 backdrop-blur">
          <h2 className="text-2xl font-semibold text-slate-900">
            Materials & Approach
          </h2>
          <p className="mt-3 text-slate-700">
            I build surfaces slowly—thin washes, sanded edges, and opaque
            moments of color. Pigments are mixed with mediums that create
            velvety, matte finishes, echoing sea fog and sun-bleached paint.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Acrylic on canvas",
              "Mixed media / collage",
              "Graphite & pastel",
              "Digital sketches",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-200 bg-gradient-to-br from-sky-50 to-teal-50 px-4 py-3 text-slate-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* timeline */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-semibold text-slate-900">
          Selected Milestones
        </h2>
        <ol className="mt-6 space-y-6">
          {[
            {
              year: "2025",
              title: "“Tides” solo pop-up",
              desc: "A series inspired by Bay of Bengal light and shoreline textures.",
            },
            {
              year: "2024",
              title: "Residency — Coastal Lab",
              desc: "Experimented with natural pigments, salt crystallization, and paper pulp.",
            },
            {
              year: "2023",
              title: "Group show — “Drift”",
              desc: "Mixed media works exploring memory and movement.",
            },
          ].map((e) => (
            <li key={e.year} className="relative pl-10">
              <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-teal-500 ring-4 ring-teal-200" />
              <div className="rounded-xl border bg-white/80 p-4 backdrop-blur">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-semibold text-teal-700">
                    {e.year}
                  </span>
                  <h3 className="text-slate-900 font-medium">{e.title}</h3>
                </div>
                <p className="mt-1 text-slate-700">{e.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA strip */}
      <section className="border-t bg-gradient-to-r from-[#22303d] via-[#2a4a57] to-teal-700">
        <div className="max-w-6xl mx-auto px-4 py-10 text-white">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-semibold">
                Let’s make something together
              </h3>
              <p className="mt-1 text-white/80">
                Commissions are open—tell me about your space and story.
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center rounded-xl bg-white/10 px-5 py-3 font-medium backdrop-blur transition hover:bg-white/20"
            >
              Contact me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
