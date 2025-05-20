import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Type,
  FileText as FileTextIcon,
  Tag as TagIcon,
  User as UserIcon,
  CheckSquare,
  Save,
  AlertCircle,
} from "lucide-react";
import { updateBlog } from "./api/blogApi";
import { getAuthData } from "../config/authConfig";

function EditBlogPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // State for form fields
  console.log(state);
  const [title, setTitle] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [tags, setTags] = useState(state?.tags?.join(",") || "");
  const originalBlog = state;
  const { token } = getAuthData();

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and Content are required.");
      return;
    }

    const updatedBlogData = {
      ...originalBlog, // Preserve original ID, created_at, author
      title,
      content,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    const res = await updateBlog(updatedBlogData, token);

    if (res?.responseCode == 1) {
      toast.success(`Blog post "${title}" updated successfully!`);
      navigate(`/blog/${state.id}`); // Redirect to the updated blog's detail page
    }
  };

  if (!originalBlog) {
    // Still loading or blog not found/authorized (already handled by useEffect redirect, but good for safety)
    return (
      <div className="text-center py-20">
        <AlertCircle className="mx-auto h-12 w-12 text-slate-400" />
        <p className="mt-4 text-slate-600">
          Loading blog data or blog not found...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
          Edit Blog Post
        </h2>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <div>
            <label
              htmlFor="edit-title"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Title
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="title"
                id="edit-title"
                required
                className="appearance-none block w-full px-3 py-3 pl-10 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-content"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Content
            </label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 flex items-center pointer-events-none">
                <FileTextIcon className="h-5 w-5 text-slate-400" />
              </div>
              <textarea
                name="content"
                id="edit-content"
                rows="10"
                required
                className="appearance-none block w-full px-3 py-3 pl-10 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div>
            <label
              htmlFor="edit-tags"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Tags (comma-separated)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <TagIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="tags"
                id="edit-tags"
                className="appearance-none block w-full px-3 py-3 pl-10 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="e.g., react, javascript, webdev"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0">
            <Link
              to={originalBlog ? `/blog/${originalBlog.id}` : "/"}
              className="w-full sm:w-auto flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBlogPage;
