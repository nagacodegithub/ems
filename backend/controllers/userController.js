const userModel = require("../models/userModel");
const fs = require("fs").promises;
const path = require("path");
const yup = require("yup");

module.exports.getUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const users = await userModel.paginate({},{ page, limit });
      return res.json({
        message: "Retrive Records Successfully",
        users: users.docs,
        pagination: users.pagination
      });
  } catch (error) {
    next(error);
  }
};


module.exports.createUser = async (req, res, next) => {
  try {

    if (!req?.body || Object.keys(req?.body).length == 0) {
           return res.status(400).json({ message: "Request body required" });
    }
    
      const {
        username,
        email,
        password,
        role,
      } = req.body;
    const usersData = {
      
      username,
      email,
      password,
      role
    };
    
    await userModel.create(usersData);
    return res.json({ message: "users Create Successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports.getUserDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
    return res.json({ message: "Retrive User Successfully"  ,user});
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {

    if (!req?.body || Object.keys(req?.body).length == 0) {
           return res.status(400).json({ message: "Request body required" });
    }
    
    const { id } = req.params;
    const { username, email, password,role } = req.body;
    const userData = {
      username,
      email,
      password,
      role
    };

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userModel.findByIdAndUpdate( id ,userData);
    return res.json({ message: "User update Successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports.deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await userModel.findByIdAndDelete(id);
      return res.json({ message: "Delete user Successfully" });
  } catch (error) {
    next(error);
  }
};