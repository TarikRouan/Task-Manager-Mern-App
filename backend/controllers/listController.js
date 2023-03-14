const asyncHandler = require("express-async-handler");

const { List } = require("../models/listModel");
const { User } = require("../models/userModel");

// Get lists | GET /lists | Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });

  res.status(200).json(lists);
});

// create list | POST /lists | Private
const postList = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("The title field is required");
  }
  const list = await List.create({
    title: req.body.title,
    user: req.user.id,
  });

  res.status(200).json(list);
});

// Update list | PUT /lists/:id | Private
const putList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedList);
  goal;
});

// Delete list | DELETE /lists/:id | Private
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);
  console.log(list);

  if (!list) {
    res.status(400);
    throw new Error("List not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await List.findByIdAndRemove(req.params.id);
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLists,
  postList,
  putList,
  deleteList,
};
