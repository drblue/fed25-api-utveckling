/**
 * Author Controller
 */
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

/**
 * Get all authors
 */
export const index = async (_req: Request, res: Response) => {
	try {
		const authors = await prisma.author.findMany();
		res.send({ status: "success", data: authors });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Get a single author
 */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
		res.status(400).send({ status: "error", message: "Invalid Id" });
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
		res.send({ status: "success", data: author });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Create an author
 */
export const store = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({ status: "fail", data: validationErrors.array() });
		return;
	}

	try {
		const author = await prisma.author.create({
			data: req.body,
		});
		res.status(201).send({ status: "success", data: author });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Update a single author
 */
export const update = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
		res.status(400).send({ status: "error", message: "Invalid Id" });
		return;
	}

	// Check for any validation errors
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({ status: "fail", data: validationErrors.array() });
		return;
	}

	try {
		const author = await prisma.author.update({
			where: {
				id: authorId,
			},
			data: req.body,
		});
		res.send({ status: "success", data: author });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Delete a single author
 */
export const destroy = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
		res.status(400).send({ status: "error", message: "Invalid Id" });
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
}
