const verifyToken = require("../middleware/verifyToken");
const { Router } = require("express");
const {
  getblog,
  addblog,
  getblogDetailBySlug,
  getblogDetailById,
  myblog,
  updateblog,
  deleteblog,
} = require("../controllers/blogController");
const uploadImage = require("../middleware/uploadImage");
const router = Router();

router.get("/blog", getblog);
router.get("/myblog", verifyToken, myblog);
router.get("/blogdetailbyslug/:slug", getblogDetailBySlug);
router.get("/blogdetailbyid/:id", getblogDetailById);
router.patch(
  "/updateblog/:id",
  verifyToken,
  uploadImage.single("image"),
  updateblog
);
router.delete("/deleteblog/:id", verifyToken, deleteblog);
router.post("/addblog", verifyToken, uploadImage.single("image"), addblog);

module.exports = router;
