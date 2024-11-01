const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const multer = require("multer");
const uploadFileController = require("../controllers/uploadFile");
const database = require("../controllers/dbConnection");

// const authController = require("../controllers/authentification")
// const getFilesController = require("../controllers/getFiles")


const storage = multer.diskStorage({
  destination: "/backend/upload",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5000000, // 1MB
  },
});
// const upload = multer({ storage })

router.get("/", async (req, res, next) => {
  const [response] = await database.query("SELECT * FROM user_model");
  console.log('response');
});

// router.post("/login", authController.login)
// router.post("/register", authController.register)

// router.get("/allFiles", getFiles.getFiles)
router.post("/upload", upload.single("file"), uploadFileController.uploadFile);

module.exports = router;