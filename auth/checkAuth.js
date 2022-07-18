require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.jwt_key);
        decoded = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'Authorization failed'});
    }
};