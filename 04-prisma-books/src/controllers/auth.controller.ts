/**
 * Auth Controller
 */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { CreateUserData } from "../types/User.types.ts";
import { createUser } from "../services/user.service.ts";

// Get environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Guard against incorrect config
if (!ACCESS_TOKEN_SECRET) {
	throw new Error("No ACCESS_TOKEN_SECRET defined in environment");
}

/**
 * Log in a user
 */
export const login = async (req: Request, res: Response) => {
	// Get email and password from request-body

	// Get user from database, otherwise bail 🛑

	// Verify hash against credentials, otherwise bail 🛑

	// Construct JWT-payload

	// Sign payload with (access-token)-secret

	// Respond with access-token
	res.send({
		status: "success",
		data: null,
	});
}

/**
 * Register a User
 */
export const register = async (req: Request, res: Response) => {
	// Get only the validated data
	const validatedData = matchedData<CreateUserData>(req);
	console.log("validatedData:", validatedData);

	// Calculate a hash + salt for the password
	const hashed_password = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
	console.log("plaintext password:", validatedData.password);
	console.log("hashed password:", hashed_password);

	// Create the user in the database
	try {
		// plz computah, create user, mkai?
		const user = await createUser({
			...validatedData,
			password: hashed_password,
		});

		// Respond with 201 Created + status success
		res.status(201).send({ status: "success", data: user });

	} catch (err) {
		handlePrismaError(res, err);
	}
}
