/**
 * Auth Controller
 */
import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

/**
 * Register a User
 */
export const register = async (req: Request, res: Response) => {
	// Get only the validated data

	// Calculate a hash + salt for the password

	// Create the user in the database

	// Respond with 201 Created + status success
	res.status(201).send({ status: "success", data: null });
}
