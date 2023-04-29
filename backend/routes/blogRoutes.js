const verifyToken = require("../middleware/verifyToken");
const { Router } = require("express");
const { getblog, addblog, getblogDetail } = require("../controllers/blogController");

const router = Router();
const multer = require('multer');
const upload = multer();

router.get("/blog", getblog);
router.get("/blog/:slug", getblogDetail);
router.post("/add-blog", upload.none(), addblog);

module.exports = router;
