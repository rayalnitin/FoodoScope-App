import { Router } from "express";
import { login, register, verifyEmail } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  loginSchema,
  registerSchema,
  verifyEmailSchema,
} from "../validators/auth.validator";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/verify-email", validateRequest(verifyEmailSchema), verifyEmail);
router.post("/login", validateRequest(loginSchema), login);

export const authRoutes = router;
