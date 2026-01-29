/**
 * Book Controller
 */
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { addAuthorToBook, createBook, deleteBook, getBook, getBooks, removeAuthorFromBook, updateBook } from "../services/book.service.ts";
import { CreateBookData, UpdateBookData } from "../types/Book.types.ts";
import { AuthorId } from "../types/Author.types.ts";

/**
 * Get all books
 */
export const index = async (_req: Request, res: Response) => {
	try {
		const books = await getBooks();
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
		const book = await getBook(bookId);
		res.send({ status: "success", data: book });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Create an book
 */
export const store = async (req: Request, res: Response) => {
	// Get only the validated data
	const validatedData = matchedData<CreateBookData>(req);

	try {
		const book = await createBook(validatedData);
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

	// Get only the validated data
	const validatedData = matchedData<UpdateBookData>(req);

	try {
		const book = await updateBook(bookId, validatedData);
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
		await deleteBook(bookId);
		res.status(204).send();

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Add author(s) to book
 */
export const addAuthor = async (req: Request<{ bookId: string }, unknown, AuthorId | AuthorId[]>, res: Response) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}
	try {
		const book = await addAuthorToBook(bookId, req.body);
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
		const book = await removeAuthorFromBook(bookId, authorId);
		res.status(200).send({ status: "success", data: book });

	} catch (err) {
		handlePrismaError(res, err);
	}
}
