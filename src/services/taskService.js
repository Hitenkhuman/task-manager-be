const CONSTANTS = require("../config/constants");
const Task = require("../models/task.model");
const httpsStatus = require("../utils/httpsStatus");

const mapTaskToResponse = (task) => {
    return {
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        order: task.order,
        createdAt: task.createdAt
    };
};

const addTask = async (title, description, user) => {
    const maxOrderTask = await Task.findOne({ userId: user._id }).sort({ order: -1 });
    const task = await Task.create({ title, description, status: CONSTANTS.TASK_STATUS.TODO, userId: user._id, order: maxOrderTask ? maxOrderTask.order + 1 : 0 });
    return mapTaskToResponse(task);
};

const updateTask = async (taskId, title, description, user, locale) => {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
        throw {
            status: httpsStatus.NOT_FOUND,
            message: locale("TASK_NOT_FOUND")
        }
    }

    task.title = title;
    task.description = description;
    await task.save();

    return mapTaskToResponse(task);
};

const deleteTask = async (taskId, user, locale) => {
    const task = await Task.findOne({ _id: taskId, userId: user._id });

    if (!task) {
        throw {
            status: httpsStatus.NOT_FOUND,
            message: locale("TASK_NOT_FOUND")
        }
    }

    await task.deleteOne({
        _id: taskId
    });
};

const listTasks = async (user) => {
    return Task.aggregate([
        { $match: { userId: user._id } },
        { $sort: { order: -1 } },
    ]);
};

const changeStatus = async (taskId, prevTaskId, status, user, locale) => {

    const task = await Task.findOne({
        _id: taskId,
        userId: user._id
    });

    if (!task) {
        throw {
            status: httpsStatus.NOT_FOUND,
            message: locale("TASK_NOT_FOUND")
        }
    }
    let prevTask;
    if (prevTaskId) {
        prevTask = await Task.findOne({
            _id: prevTaskId,
            userId: user._id
        });
    }

    if (prevTask) {
        await Task.updateOne({ _id: prevTaskId }, { order: task.order });
        task.order = prevTask.order;
    } else {
        task.order = (await Task.findOne({ userId: user._id }).sort({ order: -1 })).order + 1;
    }

    task.status = status;
    await task.save();

    return mapTaskToResponse(task);
};

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    listTasks,
    changeStatus
};