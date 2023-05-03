const multer = require("multer");

//Configuration for Multer
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images/blogs");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `blog-${Date.now()}.${ext}`);
//   },
// });

// // Multer Filter
// const multerFilter = (req, file, cb) => {
//   if (
//     file.mimetype.split("/")[1] === "jpg" ||
//     file.mimetype.split("/")[1] === "png" ||
//     file.mimetype.split("/")[1] === "jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid image file"), false);
//   }
// };

// const uploadImage = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// module.exports = uploadImage;

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadImage = upload.single("image");


// const handler = async (req, res) => {
//   const { method } = req;
//   if (method === "OPTIONS") {
//     return res.status(200).send("ok");
//   }
//   try {
//     await runMiddleware(req, res, uploadImage);
//     const b64 = Buffer.from(req.file.buffer).toString("base64");
//     let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
//     const cldRes = await handleUpload(dataURI);
//     res.json(cldRes);
//   } catch (error) {
//     console.log(error);
//     res.send({
//       message: error.message,
//     });
//   }
// };
export default uploadImage;

export const config = {
  api: {
    bodyParser: false,
  },
};
