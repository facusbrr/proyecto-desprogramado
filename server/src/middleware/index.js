import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
export const configMiddleware = (app) => {
  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ["x-access-token", "Origin", "Content-Type", "Accept"],
    credentials: true,
  };
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
};
