/**
 * Validation rules for User model
 */
import { body } from "express-validator";
import { getUserByEmail } from "../services/user.service.ts";

// TODO: Replace duplicate custom validator with a function

export const createUserRules = [
	body("name")
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),

	body("email")
		.trim()
		.isEmail().withMessage("has to be a valid email (duh)").bail()
		.custom(async (value: string) => {
			// Check if email exists in the database
			const user = await getUserByEmail(value);

			// If a user with that email was found, throw an error
			if (user) {
				// return Promise.reject("Email already exists");
				throw new Error("Email already exists");
			}
		}),

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
		.custom(async (value: string) => {
			// Check if email exists in the database
			const user = await getUserByEmail(value);

			// If a user with that email was found, throw an error
			if (user) {
				// return Promise.reject("Email already exists");
				throw new Error("Email already exists");
			}
		}),

	body("password")
		.optional()
		.isString().withMessage("has to be a string").bail()
		.isLength({ min: 6 }).withMessage("has be at least 6 characters long"),
];
