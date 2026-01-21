/**
 * Validation rules for User model
 */
import { body } from "express-validator";
import { getUserByEmail } from "../services/user.service.ts";

/**
 * Validate that a Email does not already exist
 *
 * @param value Email
 * @returns
 */
const validateEmailDoesNotExist = async (value: string) => {
	// get user by email
	const user = await getUserByEmail(value);

	if (user) {
		// fail the validation if user already exists
		throw new Error("Email already exists");
	}
}

export const createUserRules = [
	body("name")
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("email")
		.trim()
		.isEmail().withMessage("has to be a valid email (duh)").bail()
		.custom(validateEmailDoesNotExist),

	body("password")
		.isString().withMessage("has to be a string").bail()
		.isLength({ min: 6 }).withMessage("has be at least 6 characters long"),
];

export const updateUserRules = [
	body("name")
		.optional()
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("email")
		.optional()
		.trim()
		.isEmail().withMessage("has to be a valid email (duh)").bail()
		.custom(validateEmailDoesNotExist),

	body("password")
		.optional()
		.isString().withMessage("has to be a string").bail()
		.isLength({ min: 6 }).withMessage("has be at least 6 characters long"),
];
