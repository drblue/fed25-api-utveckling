import { Document, model, Schema } from "mongoose";

export interface MovieDocument extends Document {
	title: string;
	runtime?: number;
	release_year?: number;
}

const movieSchema = new Schema<MovieDocument>({
	title: {
		type: Schema.Types.String,
		required: true,
	},
	runtime: {
		type: Schema.Types.Int32,
	},
	release_year: {
		type: Schema.Types.Int32,
	},
});

export const Movie = model("Movie", movieSchema);
