import type { Response } from "express";
import { Prisma } from "../../generated/prisma/client.ts";

/**
 * Handle Prisma Errors
 */
export const handlePrismaError = (res: Response, err: unknown) => {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		// Was it not found?
		if (err.code === "P2025") {
			res.status(404).send({ message: "Resource not found" });
			return;
		}
	}

	console.error(err);
	res.status(500).send({ message: "Something went wrong when querying the database" });
}
