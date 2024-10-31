const file_data = require("../models/fileDataModel");

module.exports.uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded or file is too large.");
        }

        const fileInfo = {
            originalName: req.file.originalname,
            size: req.file.size,
            encoding: req.file.encoding,
            user_id: 1
            // user: req.user.id = 1 // Assurez-vous que l'ID de l'utilisateur est disponible dans req.user
        };

        const fileRecord = new file_data_model(fileInfo);
        await fileRecord.save();
        res.json({ message: "File uploaded successfully.", file: fileInfo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

