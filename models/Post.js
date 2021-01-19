const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: 4,
    maxlength: 150,
  },
  body: {
    type: String,
    required: [true, "Body is required"],
    minlength: 4,
    maxlength: 2000,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  // build relationship with User Schema
  postedBy: { type: ObjectId, ref: "User" },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
