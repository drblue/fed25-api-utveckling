import { Document, model, Schema } from "mongoose";

export interface MovieDocument extends Document {
	title: string;
	runtime: number | null;  // `?` can be removed when we default the schema-field to null
	release_year: number | null;
	genres: string[];
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
		// min: [1, "has to be a positive number"],
		validate(value: number | null) {
			if (value !== null && value < 1) {
				throw new Error("Just because you thought the movie was bad, it shouldn't have zero or negative runtime");
			}
		},
	},
	release_year: {
		type: Number,
		default: null,
		min: [1888, "has to be 1888 or later"],
		max: [currentYear, "cannot be in the future"],
	},
	genres: {
		type: [String],
		default: [],
		// lowercase: true,  // won't work as the value is an array of strings and not a string
		set(genres: string[]) {
			return genres.map(genre => genre.toLowerCase());
		},
	}
});

export const Movie = model("Movie", movieSchema);
