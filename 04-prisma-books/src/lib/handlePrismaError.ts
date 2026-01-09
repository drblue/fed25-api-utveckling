import type { Response } from "express";
import { Prisma } from "../../generated/prisma/client.ts";

/**
 * Handle Prisma Errors
 */
export const handlePrismaError = (res: Response, err: unknown) => {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		// Was it not found?
		if (err.code === "P2025") {
			console.error(err);
			res.status(404).send({ message: "Resource not found" });
			return;
		}
	}

	// Prisma validation error
	if (err instanceof Prisma.PrismaClientValidationError) {
		console.error(err);
		res.status(400).send({ message: "Invalid request data" });
		return;
	}

	// Fallback
	console.error(err);
	res.status(500).send({ message: "Something went wrong when querying the database" });
}
