import express from "express";
import dotenv from "dotenv";
import { configMiddleware } from "./middleware/index.js";

dotenv.config();
export const app = express();

//Middlewares
configMiddleware(app);

//Routes

//Databases
