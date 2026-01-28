import express from "express";
import { index } from "./movie.controller.ts";

// Create a Movie router
export const movieRouter = express.Router();

/**
 * GET /movies
 */
movieRouter.get("/", index);
