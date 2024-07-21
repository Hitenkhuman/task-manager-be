const CONSTANTS = require('../config/constants');
const httpsStatus = require('../utils/httpsStatus');
const validator = require('./validator');

const addTaskValidator = (payload, locale) => {
    if (!validator.validateRequiredField(payload.title)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Title")
        }
    }
    if (!validator.validateRequiredField(payload.description)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Description")
        }
    }
}

const updateTaskValidator = (payload, locale) => {
    if (!validator.validateRequiredField(payload.taskId)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Task ID")
        }
    }
    if (!validator.validateRequiredField(payload.title)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Title")
        }
    }
    if (!validator.validateRequiredField(payload.description)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Description")
        }
    }
}

const deleteTaskValidator = (payload, locale) => {
    if (!validator.validateRequiredField(payload.taskId)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Task ID")
        }
    }
}

const changeStatusValidator = (payload, locale) => {
    if (!validator.validateRequiredField(payload.taskId)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Task ID")
        }
    }
    if (!validator.validateRequiredField(payload.status)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("REQUIRED", "Status")
        }
    }

    if (!Object.values(CONSTANTS.TASK_STATUS).includes(payload.status)) {
        throw {
            status: httpsStatus.BAD_REQUEST,
            message: locale("INVALID", "Status")
        }
    }

}

module.exports = { addTaskValidator, updateTaskValidator, deleteTaskValidator, changeStatusValidator };