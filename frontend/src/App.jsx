// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./common-component/Navbar";
import HomePage from "./blog/HomePage";
import BlogDetailPage from "./blog/BlogDetails";
import LoginPage from "./auth/LoginPage"; // Import LoginPage
import RegisterPage from "./auth/RegisterPage"; // Import RegisterPage
import { blogData as initialBlogData } from "./data/dummyBlogs";
import { Toaster, toast } from "react-hot-toast"; // Import Toaster and toast

import { useNavigate } from "react-router-dom"; // Import useNavigate here as well for this helper
import AddBlogPage from "./blog/AddBlog";
import EditBlogPage from "./blog/EditBlog";
import { LogIn, LogOut } from "lucide-react";
import { clearAuthData } from "./config/authConfig";

function NavigateToLoginWithToast() {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error("You must be logged in to add a new post.");
    navigate("/login");
  }, [navigate]);
  return null; // This component doesn't render anything itself
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (
      initialBlogData &&
      initialBlogData.result &&
      initialBlogData.result.blogs
    ) {
      setBlogs(initialBlogData.result.blogs);
    }
    // Check for persisted login state (e.g., from localStorage)
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    toast("Logged in successfully.", {
      icon: <LogIn size={20} style={{ verticalAlign: "middle" }} />,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    // Clear persisted login state
    clearAuthData();
    toast("Logged out successfully.", {
      icon: <LogOut size={20} style={{ verticalAlign: "middle" }} />,
    });
  };

  // handleRegisterSuccess is not strictly needed here if RegisterPage handles its own toast and redirects.
  // If App needs to react to registration, you can add it.
  // const handleRegisterSuccess = () => {
  //   toast.success('Registration complete! Please log in.');
  // };

  return (
    <Router>
      <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
        {/* Configure react-hot-toast */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            // Default options for all toasts
            duration: 5000,
            style: {
              background: "#334155", // slate-700 (blackish)
              color: "#f8fafc", // slate-50 (light text)
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "15px",
            },
            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#22c55e", // green-500
                secondary: "#f8fafc",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444", // red-500
                secondary: "#f8fafc",
              },
            },
          }}
        />

        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
            <Route
              path="/blog/:id"
              element={<BlogDetailPage isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/login"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/register"
              element={<RegisterPage onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/add-blog"
              element={
                isLoggedIn ? (
                  // <AddBlogPage onAddBlog={handleAddBlog} currentUser={currentUser} />
                  <AddBlogPage />
                ) : (
                  // Redirect to login or show an unauthorized message
                  // For simplicity, redirecting to login with a toast
                  <NavigateToLoginWithToast />
                )
              }
            />
            <Route
              path="/edit-blog"
              element={
                isLoggedIn ? (
                  // <EditBlogPage blogs={blogs} onUpdateBlog={handleUpdateBlog} currentUser={currentUser} />
                  <EditBlogPage blogs={blogs} />
                ) : (
                  <NavigateToLoginWithToast message="You must be logged in to edit a post." />
                )
                // Further authorization (isAuthor) is handled within EditBlogPage itself
              }
            />
            {/* Fallback for unknown routes - optional */}
            <Route
              path="*"
              element={
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold text-slate-700">
                    404 - Page Not Found
                  </h1>
                  <p className="text-slate-500 mt-4">
                    The page you are looking for does not exist.
                  </p>
                  <Link
                    to="/"
                    className="mt-6 inline-block bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700"
                  >
                    Go to Homepage
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-400 text-center p-6 sm:p-8 mt-12 sm:mt-16">
          <p>
            &copy; {new Date().getFullYear()} DevInsights Blog. Crafted with
            React & Tailwind CSS.
          </p>
          <p className="text-xs sm:text-sm mt-1">
            Lucide Icons & React Hot Toast. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
