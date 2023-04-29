const multer = require('multer');

// Define storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Define filter for image files
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

// Set up multer middleware for image uploading
const upload = multer({ storage: storage, fileFilter: imageFilter });

// Middleware function for image uploading
const uploadImage = function(req, res, next) {
  upload.single('image')(req, res, function(err) {
    if (err) {
      // Handle Multer errors
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      }
      // Handle validation errors
      if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
      }
      // Handle other errors
      return res.status(400).json({ message: 'Failed to upload image!' });
    }
    next();
  });
};

module.exports = uploadImage;