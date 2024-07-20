const httpsStatus = require('../utils/httpsStatus');
const validator = require('./validator');

const signupValidator = (payload, locale) => {
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
            message: locale("REQUIRED","Password" )
        }
    }

    if (!validator.validatePassword(payload.password)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("INVALID_PASSWORD")
        }
    }

    if(!validator.validateRequiredField(payload.confirmPassword)){
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED","Confirm password")
        }
    }
    if(payload.password !== payload.confirmPassword){
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("PASSWORD_MISMATCH")
        }
    }

    
    
    if (!validator.validateRequiredField(payload.firstName)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED","First name")
        }
    }

    if (!validator.validateRequiredField(payload.lastName)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED","Last name")
        }
    }
}
    
module.exports = signupValidator;