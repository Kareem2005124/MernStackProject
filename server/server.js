require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable cross-origin resource sharing

// Routes
app.use("/api/tasks", taskRoutes); // Use the task routes
app.use("/api/users", userRoutes); // Use the user routes (for authentication, login, etc.)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
  console.log("MONGODB_URI is:", process.env.MONGODB_URI);
});
