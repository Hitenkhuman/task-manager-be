const mongoose = require('mongoose');
const CONSTANTS = require('../config/constants');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    role: {
        type: Number,
        enum: Object.values(CONSTANTS.USER_ROLE),
        default: CONSTANTS.USER_ROLE.USER
    },
    googleId: {
        type: String
    },
    googleToken: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
