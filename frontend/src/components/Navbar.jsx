import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false); // right (hamburger)
  const [open2, setOpen2] = useState(false); // left (cart)

  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  // auth
  const { user, logout } = useAuth();

  // Close when clicking outside either dropdown
  useEffect(() => {
    function onDocClick(e) {
      const inLeft = leftRef.current?.contains(e.target);
      const inRight = rightRef.current?.contains(e.target);
      if (!inLeft && !inRight) {
        setOpen(false);
        setOpen2(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleClick = () => {
    setOpen((prev) => {
      const next = !prev;
      if (!next) rightBtnRef.current?.blur(); // lose focus when closing
      if (next) setOpen2(false); // optional: only one open
      return next;
    });
  };

  const handleClick2 = () => {
    setOpen2((prev) => {
      const next = !prev;
      if (!next) leftBtnRef.current?.blur(); // lose focus when closing
      if (next) setOpen(false); // optional: only one open
      return next;
    });
  };

  return (
    <>
      <div className="w-full bg-[#22303d] text-white">
        <div className="flex h-[230px] justify-between max-w-[1240px] p-2 m-auto items-center">
          {/* LEFT: Cart dropdown */}
          <div className="">
            <div
              className={`dropdown dropdown-start ${
                open2 ? "dropdown-open" : ""
              }`}
              ref={leftRef}
            >
              <button
                ref={leftBtnRef}
                type="button"
                className="btn btn-ghost btn-circle"
                onClick={handleClick2}
                aria-expanded={open2}
                aria-haspopup="menu"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">0</span>
                </div>
              </button>

              {open2 && (
                <div className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                  <div className="card-body">
                    <span className="text-lg font-bold">0 Items</span>
                    <span className="text-info">Subtotal: $0</span>
                    <div className="card-actions">
                      <Link
                        to="/shop-originals"
                        className="btn btn-block bg-gradient-to-r from-[#22303d] via-[#2a4a57] to-teal-600 px-6 py-3 font-medium text-white shadow-md transition 
                 hover:from-[#2d3f50] hover:via-[#335866] hover:to-teal-700"
                        onClick={() => {
                          setOpen2(false);
                        }}
                      >
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* LOGO */}
          <div>
            <a href="/">
              <h1 className="text-4xl md:text-7xl font-serif pb-2">
                Shaira Maliha
              </h1>
              <p className="uppercase text-center font-mono tracking-[8px] md:tracking-[15px] md:text-2xl">
                Artist
              </p>
            </a>
          </div>

          {/* RIGHT: Hamburger dropdown (mobile) */}
          <div className="flex items-center md:absolute">
            <div className="md:hidden">
              <div
                className={`dropdown dropdown-end ${
                  open ? "dropdown-open" : ""
                }`}
                ref={rightRef}
              >
                <button
                  ref={rightBtnRef}
                  type="button"
                  className="btn btn-ghost btn-circle"
                  onClick={handleClick}
                  aria-expanded={open}
                  aria-haspopup="menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </button>

                {open && (
                  <ul className="menu menu-lg dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow ">
                    <li>
                      <Link to="/" onClick={() => setOpen(false)}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/shop-originals" onClick={() => setOpen(false)}>
                        Shop Originals
                      </Link>
                    </li>
                    <li>
                      <Link to="/prints" onClick={() => setOpen(false)}>
                        Prints
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" onClick={() => setOpen(false)}>
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" onClick={() => setOpen(false)}>
                        Contact
                      </Link>
                    </li>
                    {!user ? (
                      <>
                        <li className="pt-1">
                          <Link
                            to="/login"
                            onClick={() => setOpen(false)}
                            className="inline-flex w-full items-center justify-center rounded-xl 
               bg-gradient-to-r from-[#22303d] via-[#2a4a57] to-teal-600 
               px-3 py-2 text-white shadow-md transition hover:opacity-75 
               focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            Login
                          </Link>
                        </li>

                        <li className="pt-1">
                          <Link
                            to="/signup"
                            onClick={() => setOpen(false)}
                            className="inline-flex w-full items-center justify-center rounded-xl 
               bg-gradient-to-r from-[#22303d] via-[#2a4a57] to-teal-600 
               px-3 py-2 text-white shadow-md transition hover:opacity-75 
               focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            Sign up
                          </Link>
                        </li>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm opacity-80">
                          Hi, {user.username}
                        </span>
                        <button
                          onClick={logout}
                          className="rounded-xl bg-white/10 px-3 py-1 hover:bg-white/20"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Currency dropdown (desktop) */}
          <div className="hidden md:block ">
            <ul className="menu p-0 m-0 menu-horizontal text-xl">
              <li>
                <details>
                  <summary>BDT</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <a>BDT</a>
                    </li>
                    <li>
                      <a>USD</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop nav bar */}
      <div className="hidden md:block w-full bg-white text-[#22303d] text-2xl">
        <ul className="flex justify-around max-w-[1240px] mx-auto">
          <Link
            className="w-full text-center p-2 hover:bg-[#22303d] hover:text-white duration-300"
            to="/"
          >
            Home
          </Link>

          <Link
            className="w-full text-center p-2 hover:bg-[#22303d] hover:text-white duration-300"
            to="/shop-originals"
          >
            Shop Originals
          </Link>

          <Link
            className="w-full text-center p-2 hover:bg-[#22303d] hover:text-white duration-300"
            to="/prints"
          >
            Prints
          </Link>

          <Link
            className="w-full text-center p-2 hover:bg-[#22303d] hover:text-white duration-300"
            to="/about"
          >
            About
          </Link>

          <Link
            className="w-full text-center p-2 hover:bg-[#22303d] hover:text-white duration-300"
            to="/contact"
          >
            Contact
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
