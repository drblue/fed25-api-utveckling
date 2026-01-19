/**
 * Book Controller
 */
import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

/**
 * Get all books
 */
export const index = async (_req: Request, res: Response) => {
	try {
		const books = await prisma.book.findMany();
		res.send({ status: "success", data: books });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Get a single book
 */
export const show = async (req: Request, res: Response) => {
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
				publisher: true,
			},
		});
		res.send({ status: "success", data: book });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Create an book
 */
export const store = async (req: Request, res: Response) => {
	try {
		const book = await prisma.book.create({
			data: req.body,
		});
		res.status(201).send({ status: "success", data: book });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Update a single book
 */
export const update = async (req: Request, res: Response) => {
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
		res.send({ status: "success", data: book });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Delete a single book
 */
export const destroy = async (req: Request, res: Response) => {
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
}

/**
 * Add author(s) to book
 */
export const addAuthor = async (req: Request, res: Response) => {
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
		res.status(201).send({ status: "success", data: book });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Remove author from book
 */
export const removeAuthor = async (req: Request, res: Response) => {
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
		res.status(200).send({ status: "success", data: book });

	} catch (err) {
		handlePrismaError(res, err);
	}
}
