/**
 * Validation rules for User model
 */
import { body } from "express-validator";

export const createUserRules = [
	body("name")
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("email")
		.trim()
		.isEmail().withMessage("has to be a valid email (duh)"),

	body("password")
		.isString().withMessage("has to be a string").bail()
		.isLength({ min: 6 }).withMessage("has be at least 6 characters long"),
];
