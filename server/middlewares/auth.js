const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const auth = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized and no token" });
  }
};

module.exports = { auth };

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized and no token" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.userId).select(-password);

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized, invalid token" });
//   }
// };
