/**
 * Author Controller
 */
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { createAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from "../services/author.service.ts";
import { CreateAuthorData, UpdateAuthorData } from "../types/Author.types.ts";

/**
 * Get all authors
 */
export const index = async (_req: Request, res: Response) => {
	try {
		const authors = await getAuthors();
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
		const author = await getAuthor(authorId);
		res.send({ status: "success", data: author });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Create an author
 */
export const store = async (req: Request, res: Response) => {
	// Get only the validated data
	const validatedData = matchedData<CreateAuthorData>(req);

	try {
		const author = await createAuthor(validatedData);
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

	// Get only the validated data
	const validatedData = matchedData<UpdateAuthorData>(req);

	try {
		const author = await updateAuthor(authorId, validatedData);
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
		await deleteAuthor(authorId);
		res.status(204).send();

	} catch (err) {
		handlePrismaError(res, err);
	}
}
