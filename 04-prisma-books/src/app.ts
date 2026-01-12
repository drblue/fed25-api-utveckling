import express from "express";
import _ from "lodash";
import morgan from "morgan";
import { handlePrismaError } from "./lib/handlePrismaError.ts";
import { prisma } from "./lib/prisma.ts";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

/**
 * GET /
 */
app.get("/", (_req, res) => {
	res.send({ message: "I AM API, BEEP BOOP" });
});

/**
 * GET /authors
 *
 * Get all authors
 */
app.get("/authors", async (_req, res) => {
	try {
		const authors = await prisma.author.findMany();
		res.send(authors);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * GET /authors/:authorId
 *
 * Get a single author
 */
app.get("/authors/:authorId", async (req, res) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const author = await prisma.author.findUniqueOrThrow({
			where: {
				id: authorId,
			},
			include: {
				books: true,
			},
		});
		res.send(author);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * POST /authors
 *
 * Create an author
 */
app.post("/authors", async (req, res) => {
	try {
		const author = await prisma.author.create({
			data: req.body,
		});
		res.status(201).send(author);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * PATCH /authors/:authorId
 *
 * Update a single author
 */
app.patch("/authors/:authorId", async (req, res) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const author = await prisma.author.update({
			where: {
				id: authorId,
			},
			data: req.body,
		});
		res.send(author);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * DELETE /authors/:authorId
 *
 * Delete a single author
 */
app.delete("/authors/:authorId", async (req, res) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		await prisma.author.delete({
			where: {
				id: authorId,
			},
		});
		res.status(204).send();

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * GET /books
 *
 * Get all books
 */
app.get("/books", async (_req, res) => {
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
app.get("/books/:bookId", async (req, res) => {
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
app.post("/books", async (req, res) => {
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
app.patch("/books/:bookId", async (req, res) => {
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
app.delete("/books/:bookId", async (req, res) => {
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
 * Link book to author(s)
 */
app.post("/books/:bookId/authors", async (req, res) => {
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
 * Catch-all route 🛟
 */
app.use((req, res) => {
	res.status(404).send({ message: `Cannot ${req.method} ${req.path}` });
});

export default app;
