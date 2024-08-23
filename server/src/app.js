import express from "express";
import dotenv from "dotenv";
import { configMiddleware } from "./middleware/index.js";
import { routerAuth } from "../src/modules/auth/routes/authRoutes.js";
dotenv.config();
export const app = express();

//Middlewares
configMiddleware(app);
app.use("/api/auth", routerAuth);

//Routes
app.get("/", (req, res) => {
  res.json("Hola");
});
