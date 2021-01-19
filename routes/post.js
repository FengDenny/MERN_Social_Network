const express = require("express");
const {
  getPost,
  createPost,
  postsByUser,
  postById,
  isPoster,
  updatePost,
  deletePost,
} = require("./../controllers/postController");
const { userById } = require("./../controllers/userController");
const { protected } = require("./../controllers/authController");
const {
  createPostValidator,
  runValidationResult,
} = require("./../helpers/validator");
const router = express.Router();

// @desc  Get all Post
//@route GET "/api/v1/post/get-post"
router.get("/get-post", getPost);

// Protect all routes after this middleware
router.use(protected);

// @desc  Get post by user
//@route GET "/api/v1/post/by/:userId"
router.get("/by/:userId", postsByUser);

// @desc  Create post
//@route POST "/api/v1/post/create-post/new/:userId"
router.post(
  "/create-post/new/:userId",
  createPost,
  runValidationResult,
  createPostValidator
);

// @desc  Update post
//@route PUT "/api/v1/post/update-post/:postId"
router.put("/update-post/:postId", protected, isPoster, updatePost);

// @desc  Delete post
//@route DELETE "/api/v1/post/delete-post/:postId"
router.delete("/delete-post/:postId", protected, isPoster, deletePost);

// get user information and appended to the  request object
// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);

// Any route containing :postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;
