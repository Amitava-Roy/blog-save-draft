import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Tag, Edit } from "lucide-react"; // Import Edit icon
import { getBlogById } from "./api/blogApi";
import toast from "react-hot-toast";

function BlogDetailPage({ isLoggedIn }) {
  const { id } = useParams();
  const [blog, setBlog] = useState();

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      const data = await getBlogById(id);
      console.log(data?.result?.blog);
      setBlog(data?.result?.blog);
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  if (!blog) {
    return (
      <div className="text-center py-12 sm:py-20">
        <AlertTriangle
          className="mx-auto h-16 w-16 text-red-500 mb-4"
          strokeWidth={1.5}
        />
        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-red-600 mb-3 sm:mb-4">
          Oops! Blog Not Found
        </h2>
        <p className="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">
          The blog post you are looking for (ID: {id}) does not exist, might
          have been moved, or is currently unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
          Back to All Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg my-6 sm:my-8 overflow-hidden">
      <div className="p-5 sm:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4 leading-tight">
          {blog.title}
        </h1>

        <div className="mb-6 sm:mb-8 text-xs sm:text-sm text-slate-500 border-b border-slate-200 pb-3 sm:pb-4">
          <p>
            By:{" "}
            <span className="font-semibold text-slate-700">
              {blog?.author?.username}
            </span>
          </p>
          <p>
            Published:{" "}
            <span className="font-semibold text-slate-700">
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
          {blog.updated_at !== blog.created_at && (
            <p>
              Last Updated:{" "}
              <span className="font-semibold text-slate-700">
                {new Date(blog.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </p>
          )}
        </div>

        <article className="prose prose-slate sm:prose-base lg:prose-lg max-w-none mb-8 sm:mb-10">
          <p>{blog.content}</p>
        </article>

        <div className="mb-6 sm:mb-8 pt-4 sm:pt-6 border-t border-slate-200">
          <h3 className="text-md sm:text-lg font-semibold text-slate-700 mb-2 sm:mb-3 flex items-center">
            <Tag className="mr-2 h-5 w-5 text-sky-600" /> Tags:
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-sky-100 text-sky-700 text-xs sm:text-sm font-medium px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm hover:bg-sky-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Container for action links */}
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
          {/* Back to All Blogs Link */}
          <Link
            to="/"
            className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Back to All Blogs
          </Link>

          {/* Edit Blog Link */}
          {isLoggedIn && (
            <Link
              to="/edit-blog"
              state={blog}
              className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 border border-slate-300 text-sm sm:text-base font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              <Edit className="-ml-1 mr-2 h-5 w-5 text-slate-600" />
              Edit Blog
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
