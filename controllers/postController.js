const CatchAsync = require("./../utility/CatchAsync");
const AppError = require("./../utility/AppError");
const Post = require("../models/Post");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// Post by id based on route param
exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(400).json({
          error:
            "The post you're trying to update is unavailable or has been deleted. Please create a new post.",
        });
      }

      req.post = post;
      next();
    });
};
// create
exports.createPost = CatchAsync(async (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(new AppError("Image could not be uplodaded", 400));
    }

    let post = new Post(fields);
    post.postedBy = req.profile;
    if (files.photo) {
      post.photo.data = fs.readFile(files.photo.path, () => {
        console.log("FILE UPLOADING", files.photo.path);
      });
      post.photo.contentType = files.photo.type;
    }
    post.save((err, result) => {
      if (err) {
        return next(new AppError(err, 400));
      }
      res.json({ status: "success", message: "Your post is now live", result });
    });
  });
});

// read
exports.getPost = CatchAsync(async (req, res, next) => {
  await Post.find()
    // populate post by the posted user
    .populate("postedBy", "_id name")
    .select("-__v")
    .then((posts) => {
      res.json({
        status: "success",
        message: "Retrieving all post",
        posts,
      });
    })
    .catch((err) => {
      return next(new AppError(err, 400));
    });
});

exports.postsByUser = CatchAsync(async (req, res, next) => {
  await Post.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .sort("-created")
    .exec((err, posts) => {
      if (err) {
        return next(new AppError(err, 400));
      }
      res.json({
        status: "success",
        message: "Retrieving all post by this user",
        posts,
      });
    });
});

exports.isPoster = CatchAsync(async (req, res, next) => {
  // true or false
  let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;

  console.log("req.post ", req.post, " req.auth ", req.auth);
  if (!isPoster) {
    return next(
      new AppError("User is not authorized to peform this action.", 403)
    );
  }
  next();
});

exports.updatePost = CatchAsync(async (req, res, next) => {
  let post = req.post;
  post = _.extend(post, req.body);
  post.updated = Date.now();
  await post.save((err) => {
    if (err) {
      return next(
        new AppError("You are not authorized to update this action.", 400)
      );
    }
    res.json({
      status: "success",
      message: "You have successfully updated your post. ",
      post,
    });
  });
});

exports.deletePost = CatchAsync(async (req, res, next) => {
  let post = req.post;
  await post.remove((err, post) => {
    if (err) {
      return next(new AppError(err, 400));
    }
    res.json({ status: "success", message: "Your post has been deleted." });
  });
});
