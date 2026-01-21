/**
 * Publisher Controller
 */
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { createPublisher, deletePublisher, getPublisher, getPublishers, updatePublisher } from "../services/publisher.service.ts";
import { CreatePublisherData, UpdatePublisherData } from "../types/Publisher.types.ts";

/**
 * Get all publishers
 */
export const index = async (_req: Request, res: Response) => {
	try {
		const publishers = await getPublishers();
		res.send({ status: "success", data: publishers });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Get a single publisher
 */
export const show = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		const publisher = await getPublisher(publisherId);
		res.send({ status: "success", data: publisher });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Create an publisher
 */
export const store = async (req: Request, res: Response) => {
	// Get only the validated data
	const validatedData = matchedData<CreatePublisherData>(req);

	try {
		const publisher = await createPublisher(validatedData);
		res.status(201).send({ status: "success", data: publisher });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Update a single publisher
 */
export const update = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	// Get only the validated data
	const validatedData = matchedData<UpdatePublisherData>(req);

	try {
		const publisher = await updatePublisher(publisherId, validatedData);
		res.send({ status: "success", data: publisher });

	} catch (err) {
		handlePrismaError(res, err);
	}
}

/**
 * Delete a single publisher
 */
export const destroy = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
		res.status(400).send({ message: "Invalid Id" });
		return;
	}

	try {
		await deletePublisher(publisherId);
		res.status(204).send();

	} catch (err) {
		handlePrismaError(res, err);
	}
}
