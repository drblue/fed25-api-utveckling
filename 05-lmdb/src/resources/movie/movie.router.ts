import express from "express";
import { index, show, store } from "./movie.controller.ts";

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

/**
 * POST /movies
 */
movieRouter.post("/", store);
