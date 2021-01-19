const express = require("express");
const {
  signup,
  signin,
  signout,
  accountActivation,
} = require("./../controllers/authController");
const { userById } = require("./../controllers/userController");
const {
  userSignupValidator,
  runValidationResult,
} = require("./../helpers/validator");

const router = express.Router();

// @desc User Signup
//@route POST "/api/v1/auth/signup"
router.post("/signup", userSignupValidator, runValidationResult, signup);

// @desc Account activation
//@route POST "/api/v1/auth/account-activation"
router.post("/account-activation", accountActivation);

// @desc User Signin
//@route POST "/api/v1/auth/signin"
router.post("/signin", signin);

// @desc User Signout
//@route POST "/api/v1/auth/signout"
router.get("/signout", signout);

// get user information and appended to the  request object
// Any route containing :userId, our app will first execute userById()
router.param("userId", userById);

module.exports = router;
