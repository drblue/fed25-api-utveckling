import express from "express";
import { destroy, index, show, store, update } from "../controllers/publisher.controller.ts";

// Create a Publisher router
export const publishersRouter = express.Router();

/**
 * GET /publishers
 *
 * Get all publishers
 */
publishersRouter.get("/", index);

/**
 * GET /publishers/:publisherId
 *
 * Get a single publisher
 */
publishersRouter.get("/:publisherId", show);

/**
 * POST /publishers
 *
 * Create an publisher
 */
publishersRouter.post("/", store);

/**
 * PATCH /publishers/:publisherId
 *
 * Update a single publisher
 */
publishersRouter.patch("/:publisherId", update);

/**
 * DELETE /publishers/:publisherId
 *
 * Delete a single publisher
 */
publishersRouter.delete("/:publisherId", destroy);
