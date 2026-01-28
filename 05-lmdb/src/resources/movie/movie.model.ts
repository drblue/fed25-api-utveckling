import { Document, model, Schema } from "mongoose";

export interface MovieDocument extends Document {
	title: string;
	runtime?: number;
	release_year?: number;
}

const movieSchema = new Schema<MovieDocument>({
	title: {
		type: String,
		required: true,
	},
	runtime: {
		type: Number,
	},
	release_year: {
		type: Number,
	},
});

export const Movie = model("Movie", movieSchema);
