const mongoose = require("mongoose");
// const User = require("../models/usermodel");
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    short_description: {
      type: String,
      required: false,
      trim: true,
    },
    long_description: {
      type: String,
      required: false,
    },
    author: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
