import { Request, Response } from "express";
import Debug from "debug";
import { isValidObjectId, Error } from "mongoose";
import { Movie } from "./movie.model.ts";
const debug = Debug("lmdb:movie.controller");

/**
 * Get all movies
 */
export const index = async (_req: Request, res: Response) => {
	try {
		// Find all movies
		const movies = await Movie
			.find({})
			.sort({ title: "asc", release_year: "asc" });  // sort first by title, then by release_year (if two or more titles are the same)

		res.send({ status: "success", data: movies });

	} catch (err) {
		debug("Error thrown when finding movies: %O", err);
		res.status(500).send({ status: "error", message: "Error thrown when finding movies" });
	}
}

/**
 * Get a single movie
 */
export const show = async (req: Request, res: Response) => {
	const movieId = req.params.movieId;

	// Check if provided ID is a valid ObjectId (does not guarantee that the document exists)
	if (!isValidObjectId(movieId)) {
		res.status(400).send({ status: "error", message: "Invalid Id" });
		return;
	}

	try {
		// Find a single movie (by id)
		const movie = await Movie.findById(movieId).populate("director", "name");

		// If no movie was found, respond with 404
		if (!movie) {
			res.status(404).send({ status: "fail", data: { message: "Movie Not Found" } });
			return;
		}

		res.send({ status: "success", data: movie });

	} catch (err) {
		debug("Error thrown when finding movie %s: %O", movieId, err);
		res.status(500).send({ status: "error", message: "Error thrown when finding movie" });
	}
}

/**
 * Create a movie
 */
export const store = async (req: Request, res: Response) => {
	try {
		// Create and save a Movie
		const movie = await Movie.create(req.body);

		res.send({ status: "success", data: movie });

	} catch (err) {
		if (err instanceof Error.ValidationError) {
			debug("Validation failed when creating movie %o: %O", req.body, err);
			res.status(400).send({ status: "fail", data: err.errors });
			return;
		}

		debug("Error thrown when creating movie %o: %O", req.body, err);
		res.status(500).send({ status: "error", message: "Error thrown when creating movie" });
	}
}

/**
 * Update a movie
 */
export const update = async (req: Request, res: Response) => {
	const movieId = req.params.movieId;

	// Check if provided ID is a valid ObjectId (does not guarantee that the document exists)
	if (!isValidObjectId(movieId)) {
		res.status(400).send({ status: "error", message: "Invalid Id" });
		return;
	}

	try {
		// Update Movie
		const movie = await Movie.findByIdAndUpdate(movieId, req.body, {
			returnDocument: "after",  // return the document AFTER updating it
			runValidators: true,  // of course we want to validate the incoming data... 🤦🏻
		});

		// If no movie was found, respond with 404
		if (!movie) {
			res.status(404).send({ status: "fail", data: { message: "Movie Not Found" } });
			return;
		}

		res.send({ status: "success", data: movie });

	} catch (err) {
		if (err instanceof Error.ValidationError) {
			debug("Validation failed when updating movie %o: %O", req.body, err);
			res.status(400).send({ status: "fail", data: err.errors });
			return;
		}

		debug("Error thrown when updating movie %o: %O", req.body, err);
		res.status(500).send({ status: "error", message: "Error thrown when updating movie" });
	}
}
