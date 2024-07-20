const bcrypt = require('bcryptjs');
const JWT = require('./jwt');
const CONSTANTS = require('../config/constants');


/**
 * Encrypts a password using bcrypt.
 * @param {string} password - The password to be encrypted.
 * @returns {Promise<string>} - A promise that resolves to the encrypted password.
 */
const enCryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(CONSTANTS.SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
}

/**
 * Compares a plain text password with a hashed password.
 * @param {string} compare - The plain text password to compare.
 * @param {string} original - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 */
const comparePassword = async (compare, original) => {
    return await bcrypt.compare(compare, original);
}

/**
 * Generates an access token for the given user.
 * @param {Object} user - The user object.
 * @param {string} user.id - The user's ID.
 * @param {string} user.email - The user's email.
 */
const getUserAccessToken = async (user) => {
    const token = JWT.generate({
        id: user.id,
        email: user.email
    });

    return token;
}


module.exports = {
    enCryptPassword,
    comparePassword,
    getUserAccessToken
};
