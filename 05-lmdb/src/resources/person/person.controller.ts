import { Request, Response } from "express";
import Debug from "debug";
import { isValidObjectId, Error } from "mongoose";
import { Person } from "./person.model.ts";
const debug = Debug("lmdb:person.controller");

/**
 * Get all people
 */
export const index = async (_req: Request, res: Response) => {
	try {
		// Find all people
		const people = await Person
			.find({})
			.sort({ name: "asc" });

		res.send({ status: "success", data: people });

	} catch (err) {
		debug("Error thrown when finding people: %O", err);
		res.status(500).send({ status: "error", message: "Error thrown when finding people" });
	}
}

/**
 * Get a single person
 */
export const show = async (req: Request, res: Response) => {
	const personId = req.params.personId;

	// Check if provided ID is a valid ObjectId (does not guarantee that the document exists)
	if (!isValidObjectId(personId)) {
		res.status(400).send({ status: "error", message: "Invalid Id" });
		return;
	}

	try {
		// Find a single person (by id)
		const person = await Person.findById(personId);

		// If no person was found, respond with 404
		if (!person) {
			res.status(404).send({ status: "fail", data: { message: "Person Not Found" } });
			return;
		}

		res.send({ status: "success", data: person });

	} catch (err) {
		debug("Error thrown when finding person %s: %O", personId, err);
		res.status(500).send({ status: "error", message: "Error thrown when finding person" });
	}
}

/**
 * Create a person
 */
export const store = async (req: Request, res: Response) => {
	try {
		// Create and save a Person
		const person = await Person.create(req.body);

		res.send({ status: "success", data: person });

	} catch (err) {
		if (err instanceof Error.ValidationError) {
			debug("Validation failed when creating person %o: %O", req.body, err);
			res.status(400).send({ status: "fail", data: err.errors });
			return;
		}

		debug("Error thrown when creating person %o: %O", req.body, err);
		res.status(500).send({ status: "error", message: "Error thrown when creating person" });
	}
}
