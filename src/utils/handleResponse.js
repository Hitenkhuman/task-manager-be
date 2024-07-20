const httpsStatus = require("./httpsStatus");

/**
 * Handles the response for API requests.
 *
 * @param {Object} res - The response object.
 * @param {Error|null} error - The error object, if any.
 * @param {any} data - The data to be sent in the response.
 * @param {number} successStatus - The HTTP status code for a successful response. Default is 200.
 * @param {string} successMessage - The success message to be sent in the response. Default is 'success'.
 */
const handleResponse = (res, error = null, data = null, successStatus = 200, successMessage = 'success') => {
    if (error) {
        return res.status(error.status ?? httpsStatus.INTERNAL_SERVER_ERROR).send({ success: false, message: error.message });
    } else {
        return res.status(successStatus).send({ success: true, message: successMessage, data });
    }
};

module.exports = handleResponse;