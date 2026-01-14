import express from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

// Create a Publisher router
export const publishersRouter = express.Router();

/**
 * GET /publishers
 *
 * Get all publishers
 */
publishersRouter.get("/", async (_req, res) => {
	try {
		const publishers = await prisma.publisher.findMany();
		res.send(publishers);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * GET /publishers/:publisherId
 *
 * Get a single publisher
 */
publishersRouter.get("/:publisherId", async (req, res) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const publisher = await prisma.publisher.findUniqueOrThrow({
			where: {
				id: publisherId,
			},
			include: {
				books: true,
			},
		});
		res.send(publisher);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * POST /publishers
 *
 * Create an publisher
 */
publishersRouter.post("/", async (req, res) => {
	try {
		const publisher = await prisma.publisher.create({
			data: req.body,
		});
		res.status(201).send(publisher);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * PATCH /publishers/:publisherId
 *
 * Update a single publisher
 */
publishersRouter.patch("/:publisherId", async (req, res) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const publisher = await prisma.publisher.update({
			where: {
				id: publisherId,
			},
			data: req.body,
		});
		res.send(publisher);

	} catch (err) {
		handlePrismaError(res, err);
	}
});

/**
 * DELETE /publishers/:publisherId
 *
 * Delete a single publisher
 */
publishersRouter.delete("/:publisherId", async (req, res) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		await prisma.publisher.delete({
			where: {
				id: publisherId,
			},
		});
		res.status(204).send();

	} catch (err) {
		handlePrismaError(res, err);
	}
});
