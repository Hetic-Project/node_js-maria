// const user = require("../models/file")

module.exports.uploadFile = async (req, res, next) => {
    if (!req.file) {
        res.status(400).send("No file uploaded")
    }
    res.send(req.file.originalname)
};

