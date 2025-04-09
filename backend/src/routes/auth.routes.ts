import { Router } from "express";
import { 
  login, 
  register, 
  verifyEmail, 
  forgotPassword, 
  resetPassword,
  resendOtp
} from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  resendOtpSchema
} from "../validators/auth.validator";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/verify-email", validateRequest(verifyEmailSchema), verifyEmail);
router.post("/resend-otp", validateRequest(resendOtpSchema), resendOtp);
router.post("/login", validateRequest(loginSchema), login);
router.post("/forgot-password", validateRequest(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema), resetPassword);

export const authRoutes = router;
