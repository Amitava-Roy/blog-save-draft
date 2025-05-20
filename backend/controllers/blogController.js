const Blog = require("../models/blogModel");
const ResponseDto = require("../utils/ResponseDto");
const asyncHandler = require("../utils/createAsync");
const AppError = require("../utils/AppError");

exports.publishOrDraftBlog = asyncHandler(async (req, res) => {
  const { id, title, content, tags, status } = req.body;

  if (id) {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, tags, status, author: req.user._id },
      { new: true }
    );
    if (!updatedBlog) {
      return next(new AppError("Blog not found", 404, 0));
    }
    res
      .status(200)
      .json(new ResponseDto("Blog updatetd", 1, { blog: updatedBlog }));
  } else {
    const newBlog = await Blog.create({
      title,
      content,
      tags,
      status,
      author: req.user._id,
    });
    res
      .status(200)
      .json(new ResponseDto("New blog created.", 1, { blog: newBlog }));
  }
});

//to fetch all blogs
exports.getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("author");
  res
    .status(200)
    .json(new ResponseDto("Blogs fetched Sucessfully", 1, { blogs }));
});

//get only one blog
exports.getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author");
  if (!blog) return next(new AppError("Not Found", 404, 0));

  res
    .status(200)
    .json(new ResponseDto("Blog fetched successfully", 1, { blog }));
});
