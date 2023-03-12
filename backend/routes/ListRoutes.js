const express = require("express");
const router = express.Router();

const {
  getLists,
  postList,
  putList,
  deleteList,
} = require("../controllers/listController");

const { protect } = require("../middleware/authMidlleware");

router.route("/").get(protect, getLists).post(protect, postList);
router.route("/:id").put(protect, putList).delete(protect, deleteList);

module.exports = router;
