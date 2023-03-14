const { Task } = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

// Get Tasks | GET /lists/:listId/tasks | Private
const getTasks = asyncHandler(async (req, res) => {
  const Tasks = await Task.find({
    _listId: req.params.listId,
  });

  res.status(200).json(Tasks);
});

// create Task | POST /lists/:listId/tasks | Private
const postTask = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("The title field is required");
  }
  const task = await Task.create({
    title: req.body.title,
    _listId: req.params.listId,
  });

  res.status(200).json(task);
});

// Update Task | PUT /lists/:listId/tasks/:taskId | Private
const putTask = asyncHandler(async (req, res) => {
  const updatedtask = await Task.findByIdAndUpdate(
    req.params.taskId,
    {
      title: req.body.title,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatedtask);
});

// Delete Task | DELETE /lists/:listId/tasks/:taskId | Private
const deleteTask = asyncHandler(async (req, res) => {
  await Task.findByIdAndRemove(req.params.taskId);
  res.status(200).json({ id: req.params.taskId });
});

module.exports = {
  getTasks,
  postTask,
  putTask,
  deleteTask,
};
