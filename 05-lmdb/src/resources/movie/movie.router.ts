import express from "express";
import { destroy, index, show, store, update } from "./movie.controller.ts";

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

/**
 * PATCH /movie/:movieId
 */
movieRouter.patch("/:movieId", update);

/**
 * DELETE /movie/:movieId
 */
movieRouter.delete("/:movieId", destroy);
