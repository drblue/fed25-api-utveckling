import express from "express";
import { index, show } from "./movie.controller.ts";

// Create a Movie router
export const movieRouter = express.Router();

/**
 * GET /movies
 */
movieRouter.get("/", index);

/**
 * GET /movie/:movieId
 */
movieRouter.get("/:movieId", show);
