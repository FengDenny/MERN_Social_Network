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

// Database connection
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`Connected to MongoDB: ${process.env.DATABASE} successfully!`)
  );

//  port declarations
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App is running on port ${port} in ${process.env.NODE_ENV} mode`);
});

// Catching rejections
process.on("uncaughtRejection", (err) => {
  console.log("UNCAUGHT REJECTION");
  console.log(err.name, err.message);
  process.exit(1);
});
