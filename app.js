const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const postRoute = require("./routes/post");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const GlobalErrorHandler = require("./controllers/errorController");
dotenv.config({ path: "./config/config.env" });
const app = express();

// Body Parser START
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// Body Parser END

// Development logging with morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("prod"));
}

// middleware
app.use(cookieParser());
app.use(cors());

// Routes (v1)
app.use("/api/v1/post", postRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

// route middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 401));
});

// Global Error Handler for DB
app.use(GlobalErrorHandler);

module.exports = app;
