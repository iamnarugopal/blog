const verifyToken = require("../middleware/verifyToken");
const { Router } = require("express");
const { getblog, addblog, getblogDetail } = require("../controllers/blogController");
const uploadImage = require('../middleware/uploadImage')
const router = Router();

router.get("/blog", getblog);
router.get("/blog/:slug", getblogDetail);
router.post("/add-blog", verifyToken, uploadImage.single('image'), addblog);

module.exports = router;
