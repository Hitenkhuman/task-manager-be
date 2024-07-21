/**
 * This file is used to task API's routes.
 * @name taskRoutes
 */
const router = require("express").Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, taskController.listTasks);
router.post("/", authMiddleware, taskController.addTask);
router.put("/:taskId", authMiddleware, taskController.updateTask);
router.patch("/:taskId", authMiddleware, taskController.changeStatus);
router.delete("/:taskId", authMiddleware, taskController.deleteTask);


module.exports = router;