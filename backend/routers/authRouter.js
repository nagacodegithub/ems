const { Router } = require('express');
const router = Router();
const {
    login,
    logout,
  getAuthInfo,
  refreshToken,
} = require("../controllers/authController");
const { verifyTokenMiddleware } = require("../middleware/authMiddleware");

router.post("/auth/login", login);
router.post("/auth/logout",logout);
router.post("/auth/refresh-token",refreshToken);
router.get("/auth/me",verifyTokenMiddleware, getAuthInfo);


module.exports = router;