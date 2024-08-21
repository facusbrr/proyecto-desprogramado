import express from "express";
import cors from "cors";
import morgan from "morgan";

export const configMiddleware = (app) => {
  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ["x-access-token", "Origin", "Content-Type", "Accept"],
  };
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
};
