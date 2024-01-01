import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to={"/"} className="tracking-wider">
        Pizza ordering Co.
      </Link>
      <SearchOrder />
      <p>Jonas</p>
    </header>
  );
}
