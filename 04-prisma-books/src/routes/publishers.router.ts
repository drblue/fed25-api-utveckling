import express from "express";
import { destroy, index, show, store, update } from "../controllers/publisher.controller.ts";
import { createPublisherRules, updatePublisherRules } from "../rules/publisher.rules.ts";

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
publishersRouter.post("/", createPublisherRules, store);

/**
 * PATCH /publishers/:publisherId
 *
 * Update a single publisher
 */
publishersRouter.patch("/:publisherId", updatePublisherRules, update);

/**
 * DELETE /publishers/:publisherId
 *
 * Delete a single publisher
 */
publishersRouter.delete("/:publisherId", destroy);
