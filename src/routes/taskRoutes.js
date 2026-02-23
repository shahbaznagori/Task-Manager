import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  filterTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/filter", protect, filterTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;