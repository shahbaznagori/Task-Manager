import express from "express";
import protect from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validationMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  filterTasks,
} from "../controllers/taskController.js";
import {
  createTaskValidation,
  filterTasksValidation,
  taskIdValidation,
  updateTaskValidation,
} from "../validators/taskValidators.js";

const router = express.Router();

router.post("/", protect, createTaskValidation, validateRequest, createTask);
router.get("/", protect, getTasks);
router.get("/filter", protect, filterTasksValidation, validateRequest, filterTasks);
router.put(
  "/:id",
  protect,
  taskIdValidation,
  updateTaskValidation,
  validateRequest,
  updateTask
);
router.delete("/:id", protect, taskIdValidation, validateRequest, deleteTask);

export default router;
