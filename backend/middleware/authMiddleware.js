const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const helper = require("../utils/helper");

module.exports.verifyTokenMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const decodedUser = await helper.verifyAccessToken(accessToken);
    if (!decodedUser) {
      return res.status(401).json({ message: "Token Invalid or Expired" });
    }
      req.user = {
          id: decodedUser.id,
          username: decodedUser.username,
          role: decodedUser.role,
      };
      
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: "Authorization failed" });
  }
};

module.exports.verifyRoleMiddleware =  (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            const roles = allowedRoles;
            if (!user) {
                return res.status(401).json({ message: "Not authenticated" });
            }
            if (!roles.includes(user.role)) {
                return res.status(403).json({ message: "Access Denied" });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: "Authorization failed" });
        }
    }
};