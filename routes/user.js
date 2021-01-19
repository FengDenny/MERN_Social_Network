const express = require("express");
const {
  userById,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  hasAuthorization,
} = require("./../controllers/userController");
const { protected } = require("./../controllers/authController");

const router = express.Router();

// @desc  Get all Users
//@route GET "/api/v1/users/get-users"
router.get("/get-users", getAllUsers);

// @desc  Get a single user
//@route GET "/api/v1/users/get-user/:userId"
router.get("/get-user/:userId", protected, getUser);

// @desc  update a single user
//@route PUT "/api/v1/users/update-user/:userId"
router.put("/update-user/:userId", protected, hasAuthorization, updateUser);

// @desc  delete a single user
//@route DELETE "/api/v1/users/dete-user/:userId"
router.delete("/delete-user/:userId", protected, hasAuthorization, deleteUser);

// get user information and appended to the  request object
// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
