import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateRequest } from "../middlewares/validation.middleware";
import { updateProfileSchema } from "../validators/user.validator";

const router = Router();

// All routes are protected
router.use(authenticate);

router.get("/profile", getUserProfile);
router.put("/profile", validateRequest(updateProfileSchema), updateUserProfile);

export const userRoutes = router;
