import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
function ShopOriginals({ artwork }) {
  const { user } = useAuth();
  return (
    <div className="rounded-2xl border p-4">
      {/* ...image & details... */}
      {!user ? (
        <Link
          to="/login"
          className="mt-3 inline-block rounded-xl bg-slate-800 px-4 py-2 text-white"
        >
          Login to Buy
        </Link>
      ) : (
        <Link
          to="/checkout"
          className="mt-3 inline-block rounded-xl bg-slate-800 px-4 py-2 text-white"
        >
          Buy Now
        </Link>
      )}
    </div>
  );
}

export default ShopOriginals;
