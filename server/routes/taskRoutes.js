const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware"); // Import the protect middleware

// Protect the routes that require authentication
router.post("/", protect, taskController.createTask); // Apply middleware here
router.get("/", protect, taskController.getTasks); // Apply middleware here
router.get("/:id", protect, taskController.getTaskById);
router.put("/:id", protect, taskController.updateTask);
router.delete("/:id", protect, taskController.deleteTask);

module.exports = router;
