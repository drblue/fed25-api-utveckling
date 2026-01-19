import express from "express";
import { addAuthor, destroy, index, removeAuthor, show, store, update } from "../controllers/book.controller.ts";
import { createBookRules, updateBookRules } from "../rules/book.rules.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";

// Create a Books router
export const booksRouter = express.Router();

/**
 * GET /books
 *
 * Get all books
 */
booksRouter.get("/", index);

/**
 * GET /books/:bookId
 *
 * Get a single book
 */
booksRouter.get("/:bookId", show);

/**
 * POST /books
 *
 * Create an book
 */
booksRouter.post("/", createBookRules, validateRequest, store);

/**
 * PATCH /books/:bookId
 *
 * Update a single book
 */
booksRouter.patch("/:bookId", updateBookRules, validateRequest, update);

/**
 * DELETE /books/:bookId
 *
 * Delete a single book
 */
booksRouter.delete("/:bookId", destroy);

/**
 * POST /books/:bookId/authors
 *
 * Add author(s) to book
 */
booksRouter.post("/:bookId/authors", addAuthor);

/**
 * DELETE /books/:bookId/authors/:authorId
 *
 * Remove author from book
 */
booksRouter.delete("/:bookId/authors/:authorId", removeAuthor);
