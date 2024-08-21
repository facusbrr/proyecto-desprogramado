import express from "express";
import dotenv from "dotenv";
import { configMiddleware } from "./middleware/index.js";
import { connectionDB } from "./config/db.js";

dotenv.config();
export const app = express();

//Middlewares
configMiddleware(app);

//Routes
app.get("/", (req, res) => {
  res.json("Hola");
});
