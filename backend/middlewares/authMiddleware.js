const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided." });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Unauthorized." });
        }

        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;
