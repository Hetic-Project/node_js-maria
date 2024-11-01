const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadFileController = require("../controllers/uploadFile");
const authController = require("../controllers/authentification")
const authMiddleware = require("../middlewares/authMiddleware")

const storage = multer.diskStorage({
  destination: "/backend/upload",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 250000000, // 2Go
  },
});

router.get("/", function (req, res, next) {
  res.send("Root")
})

router.post("/login", authController.login)
router.post("/register", authController.register)

router.post("/upload", authMiddleware, upload.single("file"), uploadFileController.uploadFile);

module.exports = router;