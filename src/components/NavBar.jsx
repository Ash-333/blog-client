import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.id ?? "guest");
  const [isLoggedIn, setIsLoggedIn] = useState(userId !== "guest");

  // Function to handle logout
  const handleLogout = () => {
    dispatch(removeUser());
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (userId !== "guest" && !isLoggedIn) {
      setIsLoggedIn(true); // Update login state if userId changes to a valid ID
    } else if (userId === "guest" && isLoggedIn) {
      setIsLoggedIn(false); // Update login state if userId becomes 'guest'
    }
  }, [userId, isLoggedIn]);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="https://flowbite.com/" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
        </a>

        {/* Navbar Links */}
        <div className="hidden md:flex md:items-center md:space-x-8 md:ml-auto">
          <ul className="flex flex-row gap-8 p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white">
            {isLoggedIn ? (
              // Show these links if the user is logged in
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 hover:text-blue-500"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-posts"
                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-500"
                  >
                    All Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add-post"
                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 hover:text-blue-500"
                  >
                    Add Post
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block py-2 px-3 text-black bg-red-700 rounded md:bg-transparent hover:text-red-500 md:p-0 "
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Show these links if the user is not logged in
              <>
                <li>
                  <Link
                    to="/"
                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent hover:text-blue-500 md:p-0"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent hover:text-blue-500 md:p-0 "
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent hover:text-blue-500 md:p-0 "
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:order-2">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
