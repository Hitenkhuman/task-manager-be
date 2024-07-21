const userService = require('../services/userService');
const handleResponse = require('../utils/handleResponse');
const httpsStatus = require('../utils/httpsStatus');
const {loginValidator, googleAuthValidator} = require('../validators/loginValidator');
const signupValidator = require('../validators/signUpValidator');

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        signupValidator(req.body, res.__);
        const user = await userService.signup(email, password, firstName, lastName, res.__);
        handleResponse(res, null, user, httpsStatus.CREATED, res.__('SIGNUP_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        loginValidator(req.body, res.__);
        const user = await userService.login(email, password, res.__);
        handleResponse(res, null, user, httpsStatus.OK, res.__('LOGIN_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

const googleAuth = async (req, res) => {
    try {
        googleAuthValidator(req.body, res.__);
        const user = await userService.googleAuth(req.body);
        handleResponse(res, null, user, httpsStatus.OK, res.__('LOGIN_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
}

module.exports = { signup, login, googleAuth };