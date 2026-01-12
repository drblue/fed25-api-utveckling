import express from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

// Create a Author router
export const authorsRouter = express.Router();

/**
 * GET /authors
 *
 * Get all authors
 */
authorsRouter.get("/", async (_req, res) => {
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
authorsRouter.get("/:authorId", async (req, res) => {
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
authorsRouter.post("/", async (req, res) => {
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
authorsRouter.patch("/:authorId", async (req, res) => {
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
authorsRouter.delete("/:authorId", async (req, res) => {
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
