const { List } = require("../models/listModel");
const { User } = require("../models/userModel");

// Get lists | GET /lists | Private
const getLists = async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id });

    res.status(200).json(lists);
  } catch (err) {
    res.sendStatus(404);
  }
};

// create list | POST /lists | Private
const postList = async (req, res) => {
  try {
    const list = await List.create({
      title: req.body.title,
      user: req.user.id,
    });

    res.status(200).json(list);
  } catch (err) {
    res.sendStatus(404);
  }
};

// Update list | PUT /lists/:id | Private
const putList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    const user = await User.findById(req.user.id);

    if (list && user && list.user.toString() === user.id) {
      const updatedlist = await List.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedlist);
    } else {
      res.status(404).json({ msg: "not authorized" });
    }
  } catch (err) {
    res.status(404);
  }
};

// Delete list | DELETE /lists/:id | Private
const deleteList = async (req, res) => {
  try {
    const list = await List.findById(req.params.id);

    const user = await User.findById(req.user.id);

    if (list && user && list.user.toString() === user.id) {
      await List.findByIdAndRemove(req.params.id);
      res.status(200).json({ id: req.params.id });
    } else {
      res.status(404).json({ msg: "not authorized" });
    }
  } catch (err) {
    res.status(404);
  }
};

module.exports = {
  getLists,
  postList,
  putList,
  deleteList,
};
