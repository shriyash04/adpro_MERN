const jwt = require("jsonwebtoken");
const SECRET_KEY = "Shriyash@123"; // Same key used in token generation

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: "Access Denied: No Token Provided!" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or Expired Token!" });
        }
        req.user = user; // Attach decoded user info to request
        next();
    });
};

module.exports = authenticateToken;
