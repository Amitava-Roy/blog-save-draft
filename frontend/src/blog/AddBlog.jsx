import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Type,
  FileText as FileTextIcon,
  Tag as TagIcon,
  User as UserIcon,
  CheckSquare,
  Send,
  Save,
} from "lucide-react";

import { publishBlog, saveBlogDraft, updateBlog } from "./api/blogApi";
import { getAuthData } from "../config/authConfig";

function AddBlogPage({ onAddBlog = () => {} }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [blogId, setBlogId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  // Timer for auto-saving drafts
  const draftTimerRef = useRef(null);
  const { token: authToken } = getAuthData();

  // Process tags from string to array
  const processTagsToArray = (tagsString) => {
    return tagsString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
  };

  // Create blog data object
  const createBlogData = () => {
    const blogData = {
      title,
      content,
      tags: processTagsToArray(tags),
    };

    // Include ID if we're updating an existing blog
    if (blogId) {
      blogData.id = blogId;
    }

    return blogData;
  };

  // Save draft function
  const saveDraft = async () => {
    if (!title && !content) return; // Don't save empty drafts

    try {
      setIsSaving(true);
      const blogData = createBlogData();
      const response = await saveBlogDraft(blogData, authToken);

      // If this is a new draft, store the ID
      if (!blogId && response?.result?.blog?.id) {
        setBlogId(response?.result?.blog?.id);
      }

      setLastSaved(new Date());
      toast.success("Draft saved successfully");
    } catch (error) {
      toast.error("Failed to save draft");
      console.error("Error saving draft:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Function to handle automatic draft saving
  const scheduleDraftSave = () => {
    // Clear any existing timer
    if (draftTimerRef.current) {
      clearTimeout(draftTimerRef.current);
    }

    // Set new timer for 1 minute (60000 ms)
    draftTimerRef.current = setTimeout(() => {
      saveDraft();
    }, 30 * 1000); //half a minute delay in between each draft save
  };

  // Handle content/title/tags changes
  useEffect(() => {
    scheduleDraftSave();

    // Clean up timer on unmount
    return () => {
      if (draftTimerRef.current) {
        clearTimeout(draftTimerRef.current);
      }
    };
  }, [title, content, tags]);

  // Handle blog publishing
  const handlePublish = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and Content are required.");
      return;
    }

    try {
      setIsPublishing(true);
      const blogData = createBlogData();

      // Choose whether to update or publish based on whether we have an ID
      let response;
      if (blogId) {
        response = await updateBlog(blogData, authToken);
        toast.success(`Blog post "${title}" updated successfully.`);
      } else {
        response = await publishBlog(blogData, authToken);
        toast.success(`Blog post "${title}" published successfully.`);
      }

      // Pass the blog to parent component if needed
      if (onAddBlog) {
        onAddBlog(response);
      }

      navigate("/"); // Redirect to homepage
    } catch (error) {
      toast.error("Failed to publish blog post");
      console.error("Error publishing blog:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 text-center">
          Create New Blog Post
        </h2>
        <form onSubmit={handlePublish} className="space-y-6">
          <div>
            <label
              htmlFor="title"
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
                id="title"
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
              htmlFor="content"
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
                id="content"
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
              htmlFor="tags"
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
                id="tags"
                className="appearance-none block w-full px-3 py-3 pl-10 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                placeholder="e.g., react, javascript, webdev"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          {lastSaved && (
            <div className="text-sm text-slate-500 italic text-right">
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={saveDraft}
              disabled={isSaving}
              className="flex-1 flex justify-center items-center py-3 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            >
              <Save className="mr-2 h-5 w-5" />
              {isSaving ? "Saving..." : "Save Draft"}
            </button>

            <button
              type="submit"
              disabled={isPublishing}
              className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              <Send className="mr-2 h-5 w-5" />
              {isPublishing ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlogPage;
