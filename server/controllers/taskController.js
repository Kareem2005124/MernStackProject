const Task = require("../models/taskModel");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;

    // Create a new task using the logged-in user's ID
    const task = new Task({
      title,
      description,
      isCompleted: isCompleted || false, // Default to false if not provided
      userId: req.user._id, // Use the logged-in user's ID
    });

    // Save the task to the database
    const savedTask = await task.save();
    res.status(201).json(savedTask); // Respond with the created task
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create task" });
  }
};

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }); // Fetch tasks for the logged-in user
    res.status(200).json(tasks); // Respond with the list of tasks
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch tasks" });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by ID

    if (!task || task.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task); // Respond with the task
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch task" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by ID

    if (!task || task.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update task fields
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.isCompleted =
      req.body.isCompleted !== undefined
        ? req.body.isCompleted
        : task.isCompleted;

    const updatedTask = await task.save(); // Save the updated task
    res.status(200).json(updatedTask); // Respond with the updated task
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update task" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by ID

    if (!task || task.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.remove(); // Remove the task from the database
    res.status(200).json({ message: "Task deleted successfully" }); // Respond with a success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete task" });
  }
};
