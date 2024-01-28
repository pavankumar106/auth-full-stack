const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userControllers");
const { auth } = require("../middlewares/auth");

router.route("/profile").get(auth, getUserProfile);
router.route("/profile").put(auth, updateUserProfile);

module.exports = router;
