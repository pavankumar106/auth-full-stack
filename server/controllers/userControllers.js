const User = require("../models/User");

// @desc    Get User profile
// route    GET /api/user/profile
// @access  private
exports.getUserProfile = async (req, res) => {
  try {
    // return res
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };
    return res.status(200).json({
      message: "Get user profile",
      user,
    });
  } catch (error) {
    logger.error(error.message, error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update User profile
// route    PUT /api/user/profile
// @access  private
exports.updateUserProfile = async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
    }
    const updatedUser = await user.save();
    return res.json({
      success: true,
      message: "Profile Update successful",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.log(error.message, error);
    return res.status(500).json({ error: error.message });
  }
};
