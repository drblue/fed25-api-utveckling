import { Document, model, Schema } from "mongoose";

export interface PersonDocument extends Document {
	name: string;
}

const personSchema = new Schema<PersonDocument>({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: [5, "has to be at least 5 characters"],
	},
});

export const Person = model("Person", personSchema);
