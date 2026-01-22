/**
 * Profile Controller
 */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { addBooksToUser, getUserBooks, removeBookFromUser, updateUser } from "../services/user.service.ts";
import { matchedData } from "express-validator";
import { UpdateUserData } from "../types/User.types.ts";

// Get salt rounds from environment
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	// If someone ever removes the authentication middleware from the route for this method, yell at them 😱
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	// Respond with User 🪪
	res.send({ status: "success", data: {
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
	}});
}

/**
 * Get the authenticated user's books
 */
export const getBooks = async (req: Request, res: Response) => {
	// If someone ever removes the authentication middleware from the route for this method, yell at them 😱
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = req.user.id;

	try {
		const books = await getUserBooks(userId);
		res.send({ status: "success", data: books });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Update the authenticated user's profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	// If someone ever removes the authentication middleware from the route for this method, yell at them 😱
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = req.user.id;

	// Get only the validated data
	const validatedData = matchedData<UpdateUserData>(req);
	const data = { ...validatedData };  // clone of validateData so we don't overwrite any incoming data

	if (data.password) {
		// Calculate a hash + salt for the password
		data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
	}

	try {
		const user = await updateUser(userId, data);
		res.send({ status: "success", data: user });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Add books to the authenticated user
 */
export const addBooks = async (req: Request, res: Response) => {
	// If someone ever removes the authentication middleware from the route for this method, yell at them 😱
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = req.user.id;

	try {
		const books = await addBooksToUser(userId, req.body);
		res.send({ status: "success", data: books });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Remove book from the authenticated user
 */
export const removeBook = async (req: Request, res: Response) => {
	// If someone ever removes the authentication middleware from the route for this method, yell at them 😱
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const bookId = Number(req.params.bookId);
	const userId = req.user.id;

	if (!bookId) {
		res.status(400).send({ status: "error", message: "Invalid Id" });
		return;
	}

	try {
		const books = await removeBookFromUser(userId, bookId);
		res.send({ status: "success", data: books });

	} catch (err) {
		handlePrismaError(res, err);
	}
}
