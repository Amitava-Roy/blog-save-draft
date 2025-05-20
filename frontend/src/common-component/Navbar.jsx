// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOut, UserPlus, BookOpen } from "lucide-react"; // Import Lucide icons

function Navbar({ isLoggedIn, onLogout }) {
  // const isLoggedIn=
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-2xl font-bold hover:text-sky-400 transition-colors duration-300 mb-2 sm:mb-0"
        >
          <BookOpen className="mr-2 h-7 w-7" />
          DevInsights
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-3">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 sm:px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              <LogOut className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                <LogIn className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              >
                <UserPlus className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
