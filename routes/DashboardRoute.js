const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const DashboardController = require("../controllers/DashBoardController");

// Initialization
const router = Router();

router.post(
  "/upload-file",
  upload.single("file_xls"),
  DashboardController.uploadfile
);

module.exports = router;
