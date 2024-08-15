const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    if (!req.cookies) {
        console.log('No cookies found');
        return res.status(403).json({ message: "No token provided" });
    }
    const token = req.cookies['authToken'];
    
    if (!token) {
        console.log('No token in cookies');
        return res.status(403).json({ message: "No token provided" });
    }

    jwt.verify(token, "priyam", (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.status(403).json({ message: "Invalid token" });
        }
        
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
