const verifyToken = require("../middleware/verifyToken");
const { Router } = require("express");
const {
  register,
  login,
  changepassword,
} = require("../controllers/userController");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/change-password", verifyToken, changepassword);

module.exports = router;
