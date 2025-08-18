import React, { useEffect, useRef, useState } from "react";

import image1 from "../assets/images/i1.jpg";
import image2 from "../assets/images/i2.jpg";
import image3 from "../assets/images/i3.jpg";
import image4 from "../assets/images/i4.jpg";
import image5 from "../assets/images/i5.jpg";
import image6 from "../assets/images/i6.jpg";

const IMAGES = [image1, image2, image3, image4, image5, image6];
const GAP = 10;            // px (matches space-x-6)
const AUTO = true;         // set false to disable autoplay
const AUTO_MS = 3000;

export default function ImageSlider() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  // center the active card so neighbors peek
  const centerToIndex = (i, behavior = "smooth") => {
    const container = containerRef.current;
    const card = cardRefs.current[i];
    if (!container || !card) return;
    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior });
  };

  useEffect(() => {
    centerToIndex(index, "instant"); // first paint without animation
    const onResize = () => centerToIndex(index, "instant");
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    centerToIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // autoplay (pause on hover or when tab hidden)
  useEffect(() => {
    if (!AUTO || hovered || document.hidden) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % IMAGES.length), AUTO_MS);
    const vis = () => document.hidden && clearInterval(id);
    document.addEventListener("visibilitychange", vis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [hovered]);

  const prev = () => setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setIndex((i) => (i + 1) % IMAGES.length);

  return (
    <div className="bg-white">
      <div className="relative w-full max-w-[1240px] mx-auto pb-6">
        {/* Left Arrow — your original style */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent rounded-full duration-200 hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor"
            className="w-10 h-10 text-gray-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={containerRef}
          className="relative flex overflow-x-auto scrollbar-hide select-none space-x-6 px-6"
          style={{ scrollBehavior: "smooth", overscrollBehaviorX: "contain" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {IMAGES.map((src, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`group flex-shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm transition-transform duration-500 ${
                i === index ? "scale-100" : "scale-[0.95]"
              }`}
              style={{
                width: "70vw",          // big center; side peeks
                maxWidth: 900,
                minWidth: 280,
                marginRight: i === IMAGES.length - 1 ? 0 : GAP,
              }}
              onClick={() => setIndex(i)} // click side to center
            >
              {/* Hover zoom INSIDE the image */}
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full h-[300px] md:h-[550px] object-cover transform transition-transform duration-500 ease-out group-hover:scale-110"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow — your original style */}
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent rounded-full duration-200 hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={2} stroke="currentColor"
            className="w-10 h-10 text-gray-700"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
