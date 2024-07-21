const taskService = require('../services/taskService');
const handleResponse = require('../utils/handleResponse');
const httpsStatus = require('../utils/httpsStatus');
const taskValidator = require('../validators/taskValidator');

const addTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        taskValidator.addTaskValidator(req.body, res.__);
        const task = await taskService.addTask(title, description, req.user, res.__);
        handleResponse(res, null, task, httpsStatus.CREATED, res.__('TASK_ADD_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { title, description } = req.body;

    try {
        taskValidator.updateTaskValidator({ ...req.body, taskId }, res.__);
        const task = await taskService.updateTask(taskId, title, description, req.user, res.__);
        handleResponse(res, null, task, httpsStatus.OK, res.__('TASK_UPDATE_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        taskValidator.deleteTaskValidator({ taskId }, res.__);
        await taskService.deleteTask(taskId, req.user, res.__);
        handleResponse(res, null, null, httpsStatus.OK, res.__('TASK_DELETE_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

const listTasks = async (req, res) => {
    try {
        const tasks = await taskService.listTasks(req.user);
        handleResponse(res, null, tasks, httpsStatus.OK, res.__('TASK_LIST_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

const changeStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status, prevTaskId } = req.body;

    try {
        taskValidator.changeStatusValidator({ taskId, status }, res.__);
        const task = await taskService.changeStatus(taskId,prevTaskId, status, req.user, res.__);
        handleResponse(res, null, task, httpsStatus.OK, res.__('TASK_STATUS_CHANGE_SUCCESS'));
    } catch (error) {
        handleResponse(res, error);
    }
};

module.exports = { addTask, updateTask, deleteTask, listTasks, changeStatus };