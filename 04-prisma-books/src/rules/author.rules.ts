/**
 * Validation rules for Author model
 */
import { body } from "express-validator";

export const createAuthorRules = [
	body("name")
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("birthyear")
		.optional()
		.isInt({ min: 1440 }).withMessage("has to be an integer and at least 1440"),
];

export const updateAuthorRules = [
	body("name")
		.optional()   // <-- important when updating
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("birthyear")
		.optional()
		.isInt({ min: 1440 }).withMessage("has to be an integer and at least 1440"),
];
