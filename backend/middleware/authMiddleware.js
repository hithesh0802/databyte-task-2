const jwt= require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.log("no header");
        return res.status(401).send('Access denied.');
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT);
        req.user = decoded;
        // console.log(decoded);
        next();
    } catch (error){
        console.log("invalid bro");
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;