/**
 * Author Controller
 */
import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

/**
 * Get all authors
 */
export const index = async (_req: Request, res: Response) => {
	try {
		const authors = await prisma.author.findMany();
		res.send(authors);

	} catch (err) {
		handlePrismaError(res, err);
	}
}
