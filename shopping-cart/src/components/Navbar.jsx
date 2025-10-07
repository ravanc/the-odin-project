import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ cart }) {
  return (
    <div className="flex gap-8 bg-sky-300 py-2 justify-center items-center fixed w-full">
      <NavLink
        to={"/"}
        className={({ isActive, isPending }) => {
          return isActive
            ? "bg-blue-700 text-white text-lg p-2 rounded-md"
            : isPending
            ? "bg-blue-500 text-white text-lg p-2 rounded-md"
            : "text-lg p-2 rounded-md";
        }}
      >
        Home
      </NavLink>
      <NavLink
        to={"/shop"}
        className={({ isActive, isPending }) => {
          return isActive
            ? "bg-blue-700 text-white text-lg p-2 rounded-md"
            : isPending
            ? "bg-blue-500 text-white text-lg p-2 rounded-md"
            : "text-lg p-2 rounded-md";
        }}
      >
        Shop
      </NavLink>
      <NavLink
        to={"cart"}
        className={({ isActive, isPending }) =>
          isActive ? "bg-white p-2 rounded-md" : "p-2"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
        >
          <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
        </svg>
      </NavLink>
      <div>{cart.length}</div>
    </div>
  );
}
