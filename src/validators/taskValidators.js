import { body, param, query } from "express-validator";

const statusValues = ["pending", "completed"];

export const taskIdValidation = [
  param("id").isMongoId().withMessage("Invalid task id"),
];

export const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 120 })
    .withMessage("Title must be between 2 and 120 characters"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters"),
  body("status")
    .optional()
    .isIn(statusValues)
    .withMessage("Status must be pending or completed"),
];

export const updateTaskValidation = [
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error("Provide at least one field to update");
    }
    return true;
  }),
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 2, max: 120 })
    .withMessage("Title must be between 2 and 120 characters"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be at most 500 characters"),
  body("status")
    .optional()
    .isIn(statusValues)
    .withMessage("Status must be pending or completed"),
];

export const filterTasksValidation = [
  query("status")
    .optional()
    .isIn(statusValues)
    .withMessage("Status must be pending or completed"),
  query("search")
    .optional()
    .isString()
    .withMessage("Search must be a string")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search can be at most 100 characters"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be an integer greater than 0")
    .toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100")
    .toInt(),
  query("sort")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort must be asc or desc"),
];
