const CatchAsync = require("../utility/CatchAsync");
const AppError = require("../utility/AppError");
const _ = require("lodash");
const User = require("../models/User");

// find user by id and add to req obj
exports.userById = async (req, res, next, id) => {
  await User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    // adds profile object in req with user info
    req.profile = user;
    next();
  });
};

exports.getUser = async (req, res, next) => {
  const user = await res.json(req.profile);
  return user;
};

// CatchAsync START
exports.getAllUsers = CatchAsync(async (req, res, next) => {
  await User.find((err, users) => {
    if (err) {
      return next(new AppError(err, 400));
    }

    res.json({
      status: "success",
      message: "Showing all available users",
      users,
    });
  }).select("-__v");
});

exports.hasAuthorization = CatchAsync(async (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log("req.profile ", req.profile, " req.auth ", req.auth);
  if (!authorized) {
    return next(
      new AppError("User is not authorized to peform this action.", 403)
    );
  }
  next();
});

exports.updateUser = CatchAsync(async (req, res, next) => {
  let user = req.profile;
  // extend - mutate the source object
  user = _.extend(user, req.body);
  user.updated = Date.now();
  await user.save((err) => {
    if (err) {
      return next(
        new AppError("You are not authorized to update this action.", 400)
      );
    }
    res.json({
      status: "success",
      message: "Profile has been updated successfully. ",
      user,
    });
  });
});

exports.deleteUser = CatchAsync(async (req, res, next) => {
  let user = req.profile;
  await user.remove((err, user) => {
    if (err) {
      return next(new AppError(err, 400));
    }
    res.json({
      status: "success",
      message: "User has been successfully deleted.",
    });
  });
});
