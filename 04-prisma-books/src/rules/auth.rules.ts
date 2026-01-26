/**
 * Validation Rules for Authentication
 */
import { body } from "express-validator";

export const loginRules = [
	// email required, valid email
	body("email")
		.isEmail().withMessage("has to be a valid email (duh)"),

	// password required, string, not empty
	body("password")
		.isString().notEmpty().withMessage("password has to be a string and not empty"),
];
