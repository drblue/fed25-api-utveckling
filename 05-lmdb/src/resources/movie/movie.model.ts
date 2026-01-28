import { Document, model, Schema } from "mongoose";

export interface MovieDocument extends Document {
	title: string;
	runtime: number | null;  // `?` can be removed when we default the schema-field to null
	release_year: number | null;
}

const currentYear = new Date().getFullYear();

const movieSchema = new Schema<MovieDocument>({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: [3, "has to be at least 3 characters"],
	},
	runtime: {
		type: Number,
		default: null,
		min: [1, "has to be a positive number"],
	},
	release_year: {
		type: Number,
		default: null,
		min: [1888, "has to be 1888 or later"],
		max: [currentYear, "cannot be in the future"],
	},
});

export const Movie = model("Movie", movieSchema);
