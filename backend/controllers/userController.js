const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
const { User } = require("../models/userModel");

// Register User | POST /users | Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ msg: "All The fields is required" });
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPasword = await bycrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPasword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "User already exists" });
    }
  } catch (err) {
    res.sendStatus(404);
  }
};

// Login User | POST /users/login | Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bycrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "invalid" });
    }
  } catch (err) {
    res.sendStatus(404);
  }
};

// Get User data | GET /users/me | Private
const getMe = async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
      id: _id,
      name: name,
      email: email,
    });
  } catch (err) {
    res.sendStatus(404);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
