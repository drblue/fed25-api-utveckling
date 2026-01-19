/**
 * Auth Controller
 */
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";
import { CreateUserData } from "../types/User.types.ts";

/**
 * Register a User
 */
export const register = async (req: Request, res: Response) => {
	// Get only the validated data
	const validatedData = matchedData<CreateUserData>(req);
	console.log("validatedData:", validatedData);

	// Calculate a hash + salt for the password

	// Create the user in the database

	// Respond with 201 Created + status success
	res.status(201).send({ status: "success", data: null });
}
