import express from "express";
import { createPreference } from "../services/paymentsServices.js";
export const paymentRoutes = express.Router();

paymentRoutes.post("/create-preference", createPreference);
