const employeeModel = require("../models/employeeModel");
const fs = require("fs").promises;
const path = require("path");
const multer = require("multer")
const yup = require("yup")
const { body, validationResult } = require("express-validator");
const { upload, imageFilter, imageFileLimit } = require("../utils/upload");
const {
  employeeValidSchema,
  employeeUpdateValidSchema,
} = require("../validation/employeeValidSchema");
module.exports.getEmployees = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const employees = await employeeModel.paginate({},{ page, limit });
      return res.json({
        message: "Retrive Records Successfully",
        employees: employees.docs,
        pagination: employees.pagination
      });
  } catch (error) {
    next(error);
  }
};

module.exports.getEmployeeDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const employee = await employeeModel.findById(id);
    
    return res.json({
      message: "Retrive Employee Details Successfully",
      employee: { ...employee.toObject(), profileImageUrl: employee.profileImagePath },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.createEmployee = async (req, res, next) => {
  try {

     if (!req?.body || Object.keys(req?.body).length == 0) {
       return res.status(400).json({ message: "Request body required" });
     }

     await employeeValidSchema.validate(req.body, { abortEarly: false });

      const {
        empId,
        name,
        email,
        salary,
        department,
        dateOfBirth,
        joinDate,
        phoneNo,
        city,
        state,
        country,
      } = req.body;
    const employeeData = {
      empId,
      name,
      email,
      salary,
      department,
      dateOfBirth,
      joinDate,
      phoneNo,
      city,
      state,
      country,
      profileImage: req.file.filename,
    };
  
    await employeeModel.create(employeeData);
    return res.json({ message: "Employee Create Successfully" });
  } catch (error) {
     await fs.unlink(req.file.path);
     next(error);
  }
};

module.exports.updateEmployee = async (req, res, next) => {

  
  try {

    if (!req?.body || Object.keys(req?.body).length == 0) {
      return res.status(400).json({ message: "Request body required" });
    }

      await employeeUpdateValidSchema.validate(req.body, { abortEarly: false });
       
    const { id } = req.params;
    const {
     empId,
     name,
     email,
     salary,
     department,
     dateOfBirth,
     joinDate,
     phoneNo,
     city,
     state,
     country,
    } = req.body;

    const employeeData = {
     empId,
     name,
     email,
     salary,
     department,
     dateOfBirth,
     joinDate,
     phoneNo,
     city,
     state,
     country,
     
    };
    
   
    const employee = await employeeModel.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

     if (req?.file?.filename) {
       employeeData.profileImage = req?.file?.filename;
       const oldProfileImage =
         "public/uploads/image/employees/" + employee.profileImage;
       try {
         await fs.access(oldProfileImage);
         await fs.unlink(path.join(oldProfileImage));
       } catch (error) {}
     }
   
    const updateEmployee=await employeeModel.findByIdAndUpdate(id, { $set: employeeData },{runValidators:true,new:true});
   
    return res.json({
      message: "Employee Update Successfully",
      employee: {
        ...updateEmployee.toObject(),
        profileImageUrl: updateEmployee.profileImagePath,
      },
    });
  } catch (error) {
     if (req.file) await fs.unlink(req.file.path);
     next(error);
 }
};

module.exports.deleteEmployee = async (req, res, next) => {
    try {
      const { id } = req.params
      const employee = await employeeModel.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      const profileImage = "public/uploads/image/employees/" + employee.profileImage;
      try {
        await fs.access(profileImage);
        await fs.unlink(path.join(oldProfileImage));
      } catch (error) {}
      await employeeModel.findByIdAndDelete(id);
      return res.json({ message: "Delete Employee Successfully" });
  } catch (error) {
    next(error);
  }
};