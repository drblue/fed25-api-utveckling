/**
 * Profile Controller
 */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { addBooksToUser, getUser, getUserBooks, removeBookFromUser, updateUser } from "../services/user.service.ts";
import { matchedData } from "express-validator";
import { UpdateUserData } from "../types/User.types.ts";

// Get salt rounds from environment
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (req: Request, res: Response) => {
	// If someone ever removes the authentication middleware from the route for this method, yell at them 😱
	if (!req.token) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = Number(req.token.sub);

	// Get user info from database
	const user = await getUser(userId);

	// If user isn't found (but how could they authenticate then? 🤔), bail 🛑
	if (!user) {
		res.status(404).send({ status: "fail", data: { message: "User Not Found" } });
		return;
	}

	// Respond with User 🪪
	res.send({ status: "success", data: {
		id: user.id,
		name: user.name,
		email: user.email,
	}});
}

/**
 * Get the authenticated user's books
 */
export const getBooks = async (req: Request, res: Response) => {
	// If someone ever removes the authentication middleware from the route for this method, yell at them 😱
	if (!req.token) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = Number(req.token.sub);

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
	if (!req.token) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = Number(req.token.sub);

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
	if (!req.token) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = Number(req.token.sub);

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
	if (!req.token) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const bookId = Number(req.params.bookId);
	const userId = Number(req.token.sub);

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
