/**
 * Validate Request middleware
 */
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * Validate incoming request
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
	// Check for any validation errors
	const validationErrors = validationResult(req);

	// If there are any validation errors, respond with them and stop the request ✋🏻
	if (!validationErrors.isEmpty()) {
		res.status(400).send({ status: "fail", data: validationErrors.array() });
		return;
	}

	// If no validation errors was found, pass the request along 👋🏻
	next();
}
