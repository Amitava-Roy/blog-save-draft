// src/components/BlogCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; // Import Lucide icon

function BlogCard({ blog }) {
  const truncateContent = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col h-full group">
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3 min-h-[2.5em] sm:min-h-[3em] group-hover:text-sky-600 transition-colors">
          {blog.title}
        </h2>
        <p className="text-slate-600 mb-4 text-sm leading-relaxed flex-grow min-h-[3em] sm:min-h-[4.5em]">
          {truncateContent(blog.content, 120)}
        </p>
        <div className="mb-4 mt-auto">
          <span className="text-xs text-slate-500">
            By{" "}
            <span className="font-medium text-slate-700">
              {blog.author?.username}
            </span>{" "}
            on {new Date(blog.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-1">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block bg-sky-100 text-sky-700 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <Link
          to={`/blog/${blog.id}`}
          className="w-full text-center flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 sm:py-3 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 group-hover:bg-sky-700"
        >
          View Details{" "}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
