import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import validateRequest from "../middleware/validationMiddleware.js";
import { loginValidation, registerValidation } from "../validators/authValidators.js";

const router = express.Router();

router.post("/register", registerValidation, validateRequest, registerUser);
router.post("/login", loginValidation, validateRequest, loginUser);

export default router;
