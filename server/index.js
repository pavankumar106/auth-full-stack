const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/error");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config();
connectDB();
const port = 5000;

app.use(
  cors({
    // credentials: true,
    origin: ["http://localhost:3000"],
  })
);
// app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server running",
  });
});

// routes
app.use("/api/auth", authRoutes); // auth routes
app.use("/api/users", userRoutes); // user routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
