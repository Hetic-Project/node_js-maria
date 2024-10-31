const file_data = require("../models/fileDataModel");
const database = require("../controllers/dbConnection");

module.exports.uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded or file is too large.");
        }
        res.send(req.file);
        const fileInfo = {
            originalName: req.file.originalname,
            size: req.file.size,
            encoding: req.file.encoding,
            user_id: 1
            // user: req.user.id = 1 // Assurez-vous que l'ID de l'utilisateur est disponible dans req.user
        };

        try {
            const query = 'INSERT INTO file_data_model (originalName, size, encoding, user_id) VALUES (?, ?, ?, ?)';
            const values = [fileInfo.originalName, fileInfo.size, fileInfo.encoding, fileInfo.user_id];
            const [result] = await database.query(query, values);
            console.log(result);
        } catch (error) {
            console.error('Error inserting file information into the database:', error);
        }
        res.json({ message: "File uploaded successfully.", file: fileInfo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

