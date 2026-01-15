import express from "express";
import { body } from "express-validator";
import { destroy, index, show, store, update } from "../controllers/author.controller.ts";

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
authorsRouter.post("/", [
	body("name")
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("birthyear")
		.optional()
		.isInt().withMessage("has to be an integer"),
], store);

/**
 * PATCH /authors/:authorId
 *
 * Update a single author
 */
authorsRouter.patch("/:authorId", [
	body("name")
		.optional()   // <-- important when updating
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("birthyear")
		.optional()
		.isInt().withMessage("has to be an integer"),
], update);

/**
 * DELETE /authors/:authorId
 *
 * Delete a single author
 */
authorsRouter.delete("/:authorId", destroy);
