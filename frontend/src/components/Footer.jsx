/**
 * Footer.jsx
 * Artist Portfolio Footer — Tailwind v3 + DaisyUI
 *
 * Props:
 * @param {string} [logoSrc] - Optional logo image URL
 * @param {string} artistName - Artist's name for copyright
 * @param {number} [year] - Year to display (defaults to current year)
 * @param {Array<{label: string, href: string}>} [links] - Main nav links
 * @param {Array<{name: string, href: string}>} [socialLinks] - Social links
 * @param {(email: string) => void} [onSubscribe] - Newsletter subscribe handler
 */

import React, { useState } from "react";
import {
  FaInstagram,
  FaBehance,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer({
  logoSrc,
  artistName,
  year = new Date().getFullYear(),
  links = [],
  socialLinks = [],
  onSubscribe,
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubscribe && email.trim()) {
      onSubscribe(email.trim());
      setEmail("");
    }
  };

  const renderSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case "instagram":
        return <FaInstagram />;
      case "behance":
        return <FaBehance />;
      case "twitter":
        return <FaTwitter />;
      case "youtube":
        return <FaYoutube />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[#22303d] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* Logo & Tagline */}
        <div>
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={`${artistName} logo`}
              className="h-12 mb-4 rounded-full"
            />
          ) : (
            <h2 className="text-2xl font-bold mb-4">{artistName}</h2>
          )}
          <p className="text-sm opacity-80">
            Capturing stories through prints and exhibitions.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:underline hover:opacity-80 transition duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact & Social */}
        <div>
          <p className="mb-4">Contact: <a href="mailto:artist@example.com" className="hover:underline">malihazoe@gmail.com</a></p>
          <div className="flex space-x-4 text-xl">
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="hover:text-gray-300 transition-colors"
              >
                {renderSocialIcon(s.name)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-white text-[#22303d] py-6 shadow-inner">
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-medium">
            Join my mailing list for new prints & shows
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="input input-bordered rounded-r-none flex-1 md:w-64 text-white"
            />
            <button
              type="submit"
              className="btn rounded-l-none bg-[#22303d] text-white hover:brightness-90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
        <p>© {year} {artistName}. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/credits" className="hover:underline">Credits</a>
        </div>
      </div>
    </footer>
  );
}
