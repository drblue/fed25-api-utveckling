import { Request, Response } from "express";
import Debug from "debug";
import { Movie } from "./movie.model.ts";
const debug = Debug("lmdb:movie.controller");

/**
 * Get all movies
 */
export const index = async (_req: Request, res: Response) => {
	try {
		// Find all movies
		const movies = await Movie.find({});

		res.send({ status: "success", data: movies });

	} catch (err) {
		debug("Error thrown when finding movies: %O", err);
		res.status(500).send({ status: "error", message: "Error thrown when finding movies" });
	}
}
