/**
 * Profile Controller
 */
import { Request, Response } from "express";

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
export const getBooks = async (_req: Request, res: Response) => {
	res.send({ status: "success", data: null });
}

/**
 * Update the authenticated user's profile
 */
export const updateProfile = async (_req: Request, res: Response) => {
	res.status(501).send({ status: "success", data: null });
}
