const { Router } = require("express");
const { register } = require("../controllers/userController");

const router = Router();

router.post("/register", register);


module.exports = router;