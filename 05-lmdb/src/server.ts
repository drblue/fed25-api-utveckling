import "./config/loadEnv.ts";
import http from "http";
import app from "./app.ts";
import { connect } from "./lib/db.ts";
import mongoose from "mongoose";

// Read port to start server on from `.env`, otherwise default to port 3000
const PORT = process.env.PORT || 3000;

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Connect to database and then listen on provided port, on all network interfaces.
 */
connect()
	.then(() => {
		// Start listening once we have a connection
		server.listen(PORT);
	})
	.catch((err) => {
		if (err instanceof mongoose.Error.MongooseServerSelectionError) {
			console.error("MongooseServerSelectionError - This is most likely because you're trying to access the database server from a new IP address that isn't whitelisted. Please check and try again.");
			process.exit(1);
		}
		console.error(err);
		process.exit(1);
	});

/**
 * Event listener for HTTP server "error" event.
 */
server.on("error", (err: NodeJS.ErrnoException) => {
	if (err.syscall !== "listen") {
		throw err;
	}

	switch (err.code) {
		case "EACCES":
			console.error(`🦸‍♀️ Port ${PORT} requires elevated privileges`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(`🛑 Port ${PORT} is already in use in another of your fifty thousand terminals 😜`);
			process.exit(1);
			break;
		default:
			throw err;
	}
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on("listening", () => {
	console.log(`👩‍🍳 Yay, server started on http://localhost:${PORT}`);
});
