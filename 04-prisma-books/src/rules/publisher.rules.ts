/**
 * Validation rules for Publisher model
 */
import { body } from "express-validator";

export const createPublisherRules = [
	body("name")
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),
];

export const updatePublisherRules = [
	body("name")
		.optional()
		.isString().withMessage("has to be a string").bail()
		.trim()
		.isLength({ min: 3, max: 191 }).withMessage("has be 3-191 characters long"),
];
