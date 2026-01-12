import express from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

// Create a Books router
export const booksRouter = express.Router();

/**
 * GET /books
 *
 * Get all books
 */
booksRouter.get("/books", async (_req, res) => {
	try {
		const books = await prisma.book.findMany();
		res.send(books);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * GET /books/:bookId
 *
 * Get a single book
 */
booksRouter.get("/books/:bookId", async (req, res) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const book = await prisma.book.findUniqueOrThrow({
			where: {
				id: bookId,
			},
			include: {
				authors: true,
			},
		});
		res.send(book);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * POST /books
 *
 * Create an book
 */
booksRouter.post("/books", async (req, res) => {
	try {
		const book = await prisma.book.create({
			data: req.body,
		});
		res.status(201).send(book);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * PATCH /books/:bookId
 *
 * Update a single book
 */
booksRouter.patch("/books/:bookId", async (req, res) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: req.body,
		});
		res.send(book);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * DELETE /books/:bookId
 *
 * Delete a single book
 */
booksRouter.delete("/books/:bookId", async (req, res) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		await prisma.book.delete({
			where: {
				id: bookId,
			},
		});
		res.status(204).send();

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * POST /books/:bookId/authors
 *
 * Add author(s) to book
 */
booksRouter.post("/books/:bookId/authors", async (req, res) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				authors: {
					connect: req.body,  // { "id": 9 }
				}
			},
			include: {
				authors: true,
			},
		});
		res.status(201).send(book);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * DELETE /books/:bookId/authors/:authorId
 *
 * Remove author from book
 */
booksRouter.delete("/books/:bookId/authors/:authorId", async (req, res) => {
	const bookId = Number(req.params.bookId);
	const authorId = Number(req.params.authorId);
	if (!bookId || !authorId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				authors: {
					disconnect: {
						id: authorId,
					},
				}
			},
			include: {
				authors: true,
			},
		});
		res.status(200).send(book);

	} catch (err) {
		handlePrismaError(res, err);
	}
});
