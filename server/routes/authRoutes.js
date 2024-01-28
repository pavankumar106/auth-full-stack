const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  loginUser,
  logoutUser,
  registerUser,
} = require("../controllers/authControllers");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);

module.exports = router;
