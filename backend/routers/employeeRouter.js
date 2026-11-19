const { Router } = require('express');
const express = require("express");
const router = Router();
const { upload, imageFilter, imageFileLimit } = require("../utils/upload")
const  validate = require('../validation/validate')
const {
  employeeValidSchema,
  employeeUpdateSchema,
} = require("../validation/employeeValidSchema");

const {
    getEmployees,
    getEmployeeDetail,
    createEmployee,
    updateEmployee,
    deleteEmployee }
    = require("../controllers/employeeController");
const { verifyRoleMiddleware } = require("../middleware/authMiddleware")


router.get("/", getEmployees);
router.get("/detail/:id", getEmployeeDetail);
router.use(verifyRoleMiddleware("admin"));
router.post(
  "/create",
  [
    upload("/image/employees", imageFilter, imageFileLimit).single(
      "profileImage",
    ),
  ],
  createEmployee,
);
router.put(
  "/update/:id",
  [
    upload("/image/employees", imageFilter, imageFileLimit).single(
      "profileImage",
    ),
  ],
  updateEmployee,
);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;