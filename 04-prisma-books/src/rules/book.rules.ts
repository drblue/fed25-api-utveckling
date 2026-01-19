/**
 * Validation rules for Book model
 */
import { body } from "express-validator";

export const createBookRules = [
	body("title")
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("pages")
		.isInt({ min: 1 }).withMessage("has to be a positive integer"),

	body("publisherId")
		.optional()
		.isInt({ min: 1 }).withMessage("has to be a positive integer"),
];

export const updateBookRules = [
	body("title")
		.optional()
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("pages")
		.optional()
		.isInt({ min: 1 }).withMessage("has to be a positive integer"),

	body("publisherId")
		.optional()
		.isInt({ min: 1 }).withMessage("has to be a positive integer"),
];
