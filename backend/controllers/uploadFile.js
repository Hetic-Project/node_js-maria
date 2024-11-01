const database = require("../controllers/dbConnection");
const file_data = require("../models/fileDataModel");

module.exports.uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded or file is too large.");
        }
        console.log('REQ.FILE : ', req.file)

        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: "Unauthorized user." });
        }

        const fileInfo = {
            originalName: req.file.originalname,
            size: req.file.size,
            encoding: req.file.encoding,
            user_id: req.user.id
            // user_id: 1
        };

        console.log("FILE INFO / ", fileInfo)

        try {
            const query = 'INSERT INTO file_data_model (originalName, size, encoding, user_id) VALUES (?, ?, ?, ?)';
            const values = [fileInfo.originalName, fileInfo.size, fileInfo.encoding, fileInfo.user_id];
            console.log('SQL Query:', query);
            console.log('Values:', values);
            const [result] = await database.query(query, values);
            console.log('Database Insert Result:', result);

        } catch (error) {
            console.error('Error inserting file information into the database:', error);
        }
        res.json({ message: "File uploaded successfully.", file: fileInfo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

