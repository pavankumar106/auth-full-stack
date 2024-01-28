const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Register User
// route    POST /api/auth/register
// @access  public
exports.registerUser = async (req, res) => {
  try {
    // // get user data
    const { name, email, password } = req.body;
    // // validate
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // // check if user exists with given email
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }
    // // hash password
    let hashedPassword;
    let salt = bcrypt.genSaltSync(10);
    try {
      hashedPassword = await bcrypt.hashSync(password, salt);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Error while hashing password",
      });
    }
    // // create a user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    newUser.password = undefined;
    // return res
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// @desc    login User
// route    POST /api/auth/login
// @access  public
exports.loginUser = async (req, res) => {
  try {
    // get data
    const { email, password } = req.body;
    // validate
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // check if user exists
    const user = await User.findOne({ email });
    // if user not found
    if (!user) {
      return res.status(400).json({ message: "Invalid email id" });
    }
    // password match
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // create token and send cookie
    const token = generateToken(res, user._id);
    console.log(token);
    res.status(201).json({
      success: true,
      message: "login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(error.message, error);
    res
      .status(500)
      .json({ error: error.message, message: "Something went wrong" });
  }
};

// @desc    logout User
// route    POST /api/auth/logout
// @access  public
exports.logoutUser = async (req, res) => {
  try {
    // reset cookie to null

    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });

    res.status(201).json({ success: true, message: "logout successful" });
  } catch (error) {
    console.log(error.message, error);
    res.status(500).json({ error: error.message });
  }
};
