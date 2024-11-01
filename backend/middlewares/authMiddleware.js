const jwt = require("jsonwebtoken");

// Middleware pour vérifier le jwt
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ success: false, msg: "No token provided." })
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, msg: "Failed to authenticate token." })
        }
        req.user = { id: decoded.userId }
        next()
    })
}

module.exports = authMiddleware
