/**
 * Publisher Controller
 */
import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

/**
 * Get all publishers
 */
export const index = async (_req: Request, res: Response) => {
	try {
		const publishers = await prisma.publisher.findMany();
		res.send(publishers);

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Get a single publisher
 */
export const show = async (req: Request, res: Response) => {
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
}

/**
 * Create an publisher
 */
export const store = async (req: Request, res: Response) => {
	try {
		const publisher = await prisma.publisher.create({
			data: req.body,
		});
		res.status(201).send(publisher);

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Update a single publisher
 */
export const update = async (req: Request, res: Response) => {
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
}

/**
 * Delete a single publisher
 */
export const destroy = async (req: Request, res: Response) => {
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
}
