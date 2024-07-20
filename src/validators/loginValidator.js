const httpsStatus = require('../utils/httpsStatus');
const validator = require('./validator');

const loginValidator = (payload, locale) => {
    if (!validator.validateRequiredField(payload.email)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Email")
        }
    }
    if (!validator.validateEmail(payload.email)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("INVALID_EMAIL")
        }
    }
    
    if (!validator.validateRequiredField(payload.password)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Password")
        }
    }
    
    if (!validator.validatePassword(payload.password)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("INVALID_PASSWORD")
        }
    }
}

module.exports = loginValidator;