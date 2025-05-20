// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard"; // Corrected import path
import { FileText, PlusSquare } from "lucide-react"; // Import Lucide icon
import { getAllBlogs } from "./api/blogApi";
import toast from "react-hot-toast";

function HomePage({ isLoggedIn }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      const data = await getAllBlogs();

      setBlogs(data?.result?.blogs);
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  const publishedBlogs = blogs?.filter((blog) => blog.status === "published");

  return (
    <div className="py-8">
      <header className="mb-10 sm:mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight">
          Welcome to <span className="text-sky-600">DevInsights</span>
        </h1>
        <p className="mt-3 sm:mt-4 text-md sm:text-lg text-slate-600 max-w-xl sm:max-w-2xl mx-auto">
          Discover the latest articles, tutorials, and insights on web
          development, programming, and more.
        </p>
      </header>

      {isLoggedIn && ( // Show "Add New Blog" button if logged in
        <div className="mb-8 text-center sm:text-right">
          <Link
            to="/add-blog"
            className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-5 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-md"
          >
            <PlusSquare className="mr-2 h-5 w-5" />
            Add New Blog
          </Link>
        </div>
      )}

      {!publishedBlogs || publishedBlogs.length === 0 ? (
        <div className="text-center py-12 sm:py-20">
          <FileText
            className="mx-auto h-16 w-16 text-slate-400 mb-4"
            strokeWidth={1.5}
          />
          <h3 className="mt-2 text-xl sm:text-2xl font-medium text-slate-700">
            No Posts Yet
          </h3>
          <p className="mt-1 text-sm sm:text-base text-slate-500">
            There are no published blog posts available. Please check back
            later!
            {isLoggedIn && " Or create a new one!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {publishedBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
