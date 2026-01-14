/**
 * Resource Controller (TEMPLATE)
 */
import { Request, Response } from "express";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { prisma } from "../lib/prisma.ts";

/**
 * Get all resources
 */
export const index = async (_req: Request, res: Response) => {
}

/**
 * Get a single resource
 */
export const show = async (req: Request, res: Response) => {
}

/**
 * Create an resource
 */
export const store = async (req: Request, res: Response) => {
}

/**
 * Update a single resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a single resource
 */
export const destroy = async (req: Request, res: Response) => {
}
