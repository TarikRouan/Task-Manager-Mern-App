const { Task } = require("../models/taskModel");

// Get Tasks | GET /lists/:listId/tasks | Private
const getTasks = async (req, res) => {
  try {
    const Tasks = await Task.find({
      _listId: req.params.listId,
    });

    res.status(200).json(Tasks);
  } catch (err) {
    res.sendStatus(404);
  }
};

// create Task | POST /lists/:listId/tasks | Private
const postTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      _listId: req.params.listId,
    });

    res.status(200).json(task);
  } catch (err) {
    res.sendStatus(404);
  }
};

// Update Task | PUT /lists/:listId/tasks/:taskId | Private
const putTask = async (req, res) => {
  try {
    const updatedlist = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedlist);
  } catch (err) {
    res.sendStatus(404);
  }
};

// Delete Task | DELETE /lists/:listId/tasks/:taskId | Private
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.taskId);
    res.status(200).json({ id: req.params.taskId });
  } catch (err) {
    res.sendStatus(404);
  }
};

module.exports = {
  getTasks,
  postTask,
  putTask,
  deleteTask,
};
