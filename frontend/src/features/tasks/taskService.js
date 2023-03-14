import axios from "axios";

const API_URL = "/lists/";

const getTasks = async (id) => {
  const res = await axios.get(API_URL + id + "/tasks");

  return res.data;
};

const createTask = async (data) => {
  const res = await axios.post(API_URL + data.id + "/tasks", {
    title: data.task,
  });

  return res.data;
};
const deleteTask = async (data) => {
  const res = await axios.delete(API_URL + data.id + "/tasks/" + data.taskId);

  return res.data;
};

const updateTask = async (data) => {
  const res = await axios.put(API_URL + data.id + "/tasks/" + data.taskId, {
    title: data.task,
  });
  console.log(res.data);

  return res.data;
};

const taskService = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};

export default taskService;
