const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const helper = require('../utils/helper')


module.exports.login = async (req, res, next) => {
    try {
      
      const { email, password } = req.body;
        
      const user = await userModel.findOne({ email: email }).select('+password');

      if (!user) {
           return res.status(404).json({
             message: "Not Found User",

           });
      }
      const verifyUser = await user.comparePassword(password)
      if (!verifyUser) {
        return res.status(400).json({ message: "Invalid User Credential" });
      }
      const payload = {
            id: user._id,
            username:user.username,
            role:user.role
        }
        
      const accessToken = await helper.generateJwtToken(payload, process.env.ACCESS_SECRET, '15m');
      const refreshToken = await helper.generateJwtToken(
        payload,
        process.env.REFRESH_SECRET,
        "7d",
      );

      res.cookie("accessToken",accessToken,{
          sameSite: "lax",
          secure: process.env.NODE_ENV == 'production',
          httpOnly: true,
          maxAge:15 * 60 * 1000
      })

       res.cookie("refreshToken", refreshToken, {
         sameSite: "lax",
         secure: process.env.NODE_ENV == "production",
         httpOnly: true,
         maxAge: 7 * 24 * 60 * 60 * 1000,
       });
      
    return res.json({ message: "Login Successfully", user: payload });
  } catch (error) {
    next(error);
  }
};



module.exports.logout = async (req, res, next) => {
  res.clearCookie('accessToken');
  res.clearCookie("refreshToken");
  return res.json({ message: "Logout Successfully" });
}

module.exports.refreshToken = async (req, res, next) => {
  try {
       const refreshToken = req.cookies?.refreshToken;
       
       if (!refreshToken) {
         return res
           .status(401)
           .json({ message: "Authorization token missing" });
       }
   
      const decodedUser = await helper.verifyRefreshToken(refreshToken);
    
      if (!decodedUser) {
        return res.status(401).json({ message: "Token Invalid or Expired" });
    }
    
      const user = await userModel.findById(decodedUser.id);
    
       payload = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      const accessToken = await helper.generateJwtToken(
        payload,
        process.env.ACCESS_SECRET,
        "15m",
      );
    
      res.cookie("accessToken", accessToken, {
        sameSite: "lax",
        secure: process.env.NODE_ENV == "production",
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
    
     return res.json({ message: "RefreshToken Successfully"});
  } catch (error) {
     next(error);
  }
};

module.exports.getAuthInfo = async (req, res, next) => {
  return res.json({ user: req.user }); 
}