const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);

module.exports = { List };
