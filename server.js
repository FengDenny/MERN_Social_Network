const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

// Catching exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config/config.env" });

// Catching rejections
process.on("uncaughtRejection", (err) => {
  console.log("UNCAUGHT REJECTION");
  console.log(err.name, err.message);
  process.exit(1);
});
