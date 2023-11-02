const app = require("./app");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables from the .env file
dotenv.config({ path: "./config.env" });

// Replace environment variables in the database URI
const DB = process.env.DB_URI.replace("<password>", process.env.DB_PASSWORD);

// Database connection options
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// Create the MongoDB connection
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection is successful");
  })
  .catch((error) => {
    console.error("DB connection failed:", error);
    process.exit(1);
  });

// Create an HTTP server and attach the Express application
const server = http.createServer(app);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// Error handling for unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  server.close(() => {
    process.exit(1);
  });
});

// Error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
