import React, { useEffect, useMemo, useRef, useState } from "react";


import image2 from "../assets/images/i2.jpg";
import image3 from "../assets/images/i3.jpg";
import image4 from "../assets/images/i4.jpg";
import image5 from "../assets/images/i5.jpg";
import image6 from "../assets/images/i6.jpg";
import image1 from "../assets/images/r1.jpg";

const images = [image1, image2, image3, image4, image5, image6];

export default function ImageSlider() {
  // how many slides to show based on viewport
  const [visible, setVisible] = useState(3);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const touchStartX = useRef(null);

  // responsive: 1 → 2 → 3
  useEffect(() => {
    const mq1 = window.matchMedia("(max-width: 640px)"); // sm
    const mq2 = window.matchMedia("(max-width: 1024px)"); // lg

    const compute = () => setVisible(mq1.matches ? 1 : mq2.matches ? 2 : 3);
    compute();

    mq1.addEventListener("change", compute);
    mq2.addEventListener("change", compute);
    return () => {
      mq1.removeEventListener("change", compute);
      mq2.removeEventListener("change", compute);
    };
  }, []);

  // autoplay (pause on hover)
  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [hovered]);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // touch / swipe
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  // pick `visible` images in a loop
  const visibleImages = useMemo(() => {
    return Array.from({ length: visible }, (_, k) => images[(index + k) % images.length]);
  }, [index, visible]);

  return (
    <section className="w-full relative bg-white">
      <div className="max-w-[1240px] mx-auto px-4 py-12">
        <header className="text-center">
          <h2 className="font-semibold text-4xl md:text-5xl text-[#22303d]">All Prints</h2>
          <a
            href="/prints"
            className="mt-2 inline-block text-sm text-[#22303d]/70 hover:text-[#22303d]"
          >
            View all
          </a>
        </header>

        <div
          className="relative mt-8"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

          {/* arrows */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full
                       bg-[#22303d] text-white shadow-md transition hover:bg-[#2d3f50] focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            ❮
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full
                       bg-[#22303d] text-white shadow-md transition hover:bg-[#2d3f50] focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            ❯
          </button>

          {/* slides */}
          <div
            className="flex items-stretch gap-4 md:gap-8 overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {visibleImages.map((src, i) => (
              <figure
                key={i}
                className="group relative w-full select-none"
                style={{ flex: `0 0 ${100 / visible}%` }}
              >
                <img
                  src={src}
                  alt={`Artwork ${((index + i) % images.length) + 1}`}
                  className="h-64 md:h-72 lg:h-80 w-full object-cover rounded-xl border border-slate-200 shadow-sm
                             transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <figcaption className="sr-only">Print preview</figcaption>
              </figure>
            ))}
          </div>

          {/* dots */}
          <div className="mt-6 flex justify-center gap-2">
            {images.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition
                    ${active ? "bg-teal-600" : "bg-slate-300 hover:bg-slate-400"}`}
                  onClick={() => setIndex(i)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
