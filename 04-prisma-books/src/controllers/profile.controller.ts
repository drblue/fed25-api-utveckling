/**
 * Profile Controller
 */
import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

/**
 * Get the authenticated user's profile
 */
export const getProfile = async (_req: Request, res: Response) => {
	res.send({ status: "success", data: null });
}

/**
 * Get the authenticated user's books
 */
export const getBooks = async (_req: Request, res: Response) => {
	res.send({ status: "success", data: null });
}

/**
 * Update the authenticated user's profile
 */
export const updateProfile = async (_req: Request, res: Response) => {
	res.status(501).send({ status: "success", data: null });
}
