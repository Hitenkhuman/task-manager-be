const userService = require('../services/userService');
const handleResponse = require('../utils/handleResponse');
const loginValidator = require('../validators/loginValidator');
const signupValidator = require('../validators/signUpValidator');

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        signupValidator(req.body, res.__);
        const user = await userService.signup(email, password, firstName, lastName, res.__);
        handleResponse(res, null, user, 201, res.__('SIGNUP_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        loginValidator(req.body, res.__);
        const user = await userService.login(email, password, res.__);
        handleResponse(res, null, user, 200, res.__('LOGIN_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

module.exports = { signup, login };