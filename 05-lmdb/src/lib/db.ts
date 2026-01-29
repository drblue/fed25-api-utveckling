import * as mongoose from "mongoose";
import Debug from "debug";
const debug = Debug("lmdb:database");

const DATABASE_URL = process.env.DATABASE_URL;

/**
 * Current MongoDB Connection
 */
let db: mongoose.Mongoose | null = null;

/**
 * Connect to MongoDB
 */
export const connect = async () => {
	// Don't try to connect if we're already connected
	if (db) {
		debug("🏎️ We're already connected, you want MOAR connection?!");
		return;
	}

	// Throw a tantrum if no DATABASE_URL is set
	if (!DATABASE_URL) {
		throw new Error("🚨 No DATABASE_URL set in environment!");
	}

	// Connect to database server
	debug("☎️ Connecting to MongoDB Atlas, please stand by...");
	const connection = await mongoose.connect(DATABASE_URL);

	// Assign connection to global variable
	db = connection;

	debug("🥳 We're connected to MongoDB Atlas!");
}

export default db;
