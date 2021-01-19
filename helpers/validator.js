const { check, validationResult } = require("express-validator");

// Post validation
exports.createPostValidator = [
  // title
  check("title").notEmpty().withMessage("Write a title"),
  check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  }),
  // body
  check("body").notEmpty().withMessage("Write a body"),

  check("body")
    .isLength({
      min: 4,
      max: 2000,
    })
    .withMessage("Body must be between 4 to 2000 characters"),
];

// User validation

exports.userSignupValidator = [
  check("email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,64}$/)
    .withMessage("Please enter a valid email address."),

  check("name").notEmpty().withMessage("Name is required"),
  check("password").notEmpty().withMessage("Password is required"),
  check("password")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)
    .withMessage(
      "Enter a password with atleast 6 characters containing one lowercase, one uppercase, one numeric digit and one special character."
    ),
];

// validation result

exports.runValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "fail",
      error: errors.array()[0].msg,
    });
  }
  next();
};
