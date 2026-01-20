/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut().catch((error) => console.log(error));
  };

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 xl:px-24 py-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span className="text-gray-900">JobPortal</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-10">
          {navItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-base font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* AUTH BUTTONS (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-4">
              <img
                className="h-10 w-10 rounded-full ring-2 ring-blue-500 object-cover"
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                }
                alt="profile"
              />
              <button
                onClick={handleLogout}
                className="px-5 py-2 border rounded-md text-gray-700 hover:bg-blue-600 hover:text-white transition"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-6 h-6 text-gray-800" />
            ) : (
              <FaBarsStaggered className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="px-6 py-4 space-y-3">
          {navItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) =>
                  `block py-2 text-base font-medium ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}

          <div className="pt-4 border-t">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-gray-700 hover:text-blue-600"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={handleMenuToggler}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                >
                  Log in
                </Link>
                <Link
                  to="/sign-up"
                  onClick={handleMenuToggler}
                  className="block py-2 text-gray-700 hover:text-blue-600"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
