const jwt = require('jsonwebtoken');
const httpsStatus = require('../utils/httpsStatus');
const User = require('../models/user.model');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(httpsStatus.UNAUTHORIZED).send({
            success: false,
            message: res.__('UNAUTHORIZED')
        });
    }
};

module.exports = authMiddleware;
