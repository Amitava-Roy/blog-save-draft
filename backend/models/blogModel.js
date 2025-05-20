const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [
        true,
        "Blog title is required. Please provide a title for your blog post.",
      ],
      trim: true,
      minlength: [
        5,
        "Blog title must be at least 5 characters long. You entered: '{VALUE}'.",
      ],
      maxlength: [
        150,
        "Blog title cannot exceed 150 characters. You entered: '{VALUE}', which is too long.",
      ],
    },
    content: {
      type: String,
      required: [
        true,
        "Blog content is mandatory. Please write some content for your blog.",
      ],
      minlength: [
        10,
        "Blog content must be at least 50 characters long to provide sufficient detail. Consider elaborating further.",
      ],
    },
    tags: {
      type: [String],
      default: [],
      validate: [
        {
          validator: function (tagsArray) {
            return tagsArray.length <= 10;
          },
          message:
            "A blog post can have a maximum of 10 tags. Please reduce the number of tags.",
        },
        {
          validator: function (tagsArray) {
            return tagsArray.every((tag) => tag.trim().length > 0);
          },
          message:
            "Tags cannot be empty strings. Please ensure all tags have meaningful content.",
        },
        {
          validator: function (tagsArray) {
            return tagsArray.every((tag) => tag.length >= 2);
          },
          message: (props) =>
            `Tag '${props.value.find(
              (tag) => tag.length < 2
            )}' is too short. All tags must be at least 2 characters long.`,
        },
        {
          validator: function (tagsArray) {
            return tagsArray.every((tag) => tag.length <= 30);
          },
          message: (props) =>
            `Tag '${props.value.find(
              (tag) => tag.length > 30
            )}' is too long. Tags cannot exceed 30 characters.`,
        },
      ],
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message:
          "Invalid status: '{VALUE}'. Status must be either 'draft' or 'published'.",
      },
      default: "draft",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [
        true,
        "Author information is required to publish a blog post. Please ensure an author is assigned.",
      ],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model("Blog", blogSchema);
