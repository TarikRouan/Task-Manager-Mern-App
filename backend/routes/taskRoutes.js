const express = require("express");
const router = express.Router();

const {
  getTasks,
  postTask,
  putTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/:listId/tasks").get(getTasks).post(postTask);
router.route("/:listId/tasks/:taskId").put(putTask).delete(deleteTask);

module.exports = router;
