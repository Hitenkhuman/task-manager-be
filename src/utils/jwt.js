/**
 * JSON Web Token class is responsible for creating the JSON Web Token
 * @name JsonWebToken
 */
const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token (JWT) with the provided data.
 * @param {Object} data - The data to be included in the JWT.
 * @returns {string} - The generated JWT.
 */
const generate = (data) => {
    const tokenOptionalInfo = {
        algorithm: 'HS256',
        expiresIn: 60 * 60 * 24
    };
    return jwt.sign(data, process.env.JWT_SECRET, tokenOptionalInfo);
}


module.exports = {
    generate
};