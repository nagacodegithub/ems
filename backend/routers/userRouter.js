const { Router } = require('express');
const express = require("express");
const router = Router();
const { upload, imageFilter, imageFileLimit } = require("../utils/upload")
const  validate = require('../validation/validate')
const {
  userValidSchema,
  userUpdateValidSchema,
} = require("../validation/userValidSchema");

const {
    getUsers,
    getUserDetail,
    createUser,
    updateUser,
    deleteUser }
    = require("../controllers/userController");
const { verifyRoleMiddleware } = require("../middleware/authMiddleware")

router.use(verifyRoleMiddleware("admin"));
router.get("/", getUsers);
router.get("/detail/:id", getUserDetail);
router.post("/create", validate(userValidSchema), createUser);
router.put("/update/:id", validate(userUpdateValidSchema), updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;