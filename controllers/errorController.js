const AppError = require("./../utility/AppError");

// Express jwt error
const handleUnAuthorizedError = () =>
  new AppError(
    "You're not authorized to access these data. Please signin.",
    401
  );

// Development Error
const sendDevError = (err, req, res) => {
  //  API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // Rendered website
  console.log("ERROR", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};
const sendProdError = (err, req, res) => {
  //  API
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // Rendered website
    console.log("ERROR", err);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
  // B) Rendered Website
  // Operational, trusted error: send message to client ?(if) true
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  //  1)Log error
  console.error("ERROR!", err);
  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    sendDevError(err, req, res);
  } else if (process.env.NODE_ENV == "production") {
    let error = {
      ...err,
    };
    error.message = err.message;

    if (error.name === "UnauthorizedError") error = handleUnAuthorizedError();

    sendProdError(error, req, res);
  }
};
