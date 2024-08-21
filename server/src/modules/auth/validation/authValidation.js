// src/modules/auth/routes/authRoutes.js
import express from "express";
import { check } from "express-validator";
import {
  registerUserController,
  loginUserController,
} from "../controllers/authController";

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  registerUserController
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUserController
);

export default router;
