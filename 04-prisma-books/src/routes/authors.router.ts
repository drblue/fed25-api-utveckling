import express from "express";
import { destroy, index, show, store, update } from "../controllers/author.controller.ts";
import { createAuthorRules, updateAuthorRules } from "../rules/author.rules.ts";

// Create a Author router
export const authorsRouter = express.Router();

/**
 * GET /authors
 *
 * Get all authors
 */
authorsRouter.get("/", index);

/**
 * GET /authors/:authorId
 *
 * Get a single author
 */
authorsRouter.get("/:authorId", show);

/**
 * POST /authors
 *
 * Create an author
 */
authorsRouter.post("/", createAuthorRules, store);

/**
 * PATCH /authors/:authorId
 *
 * Update a single author
 */
authorsRouter.patch("/:authorId", updateAuthorRules, update);

/**
 * DELETE /authors/:authorId
 *
 * Delete a single author
 */
authorsRouter.delete("/:authorId", destroy);
