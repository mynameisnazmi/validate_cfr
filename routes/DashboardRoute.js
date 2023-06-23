const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const DashboardController = require("../controllers/DashBoardController");

// Setlocation
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: diskStorage,
  // limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  },

  // file_xls is the name of file attribute
}).single("file_xls");

// Initialization
const router = Router();

router.post("/upload-file", upload, DashboardController.uploadfile);

module.exports = router;
