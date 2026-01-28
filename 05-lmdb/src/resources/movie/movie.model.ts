import { Document, model, Schema } from "mongoose";

export interface MovieDocument extends Document {
	title: string;
	runtime?: number;
	release_year?: number;
}

const currentYear = new Date().getFullYear();

const movieSchema = new Schema<MovieDocument>({
	title: {
		type: String,
		required: true,
	},
	runtime: {
		type: Number,
		min: [1, "has to be a positive number"],
	},
	release_year: {
		type: Number,
		min: [1888, "has to be 1888 or later"],
		max: [currentYear, "cannot be in the future"],
	},
});

export const Movie = model("Movie", movieSchema);
