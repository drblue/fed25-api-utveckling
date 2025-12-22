import express from "express";

// Declare config
const PORT = 3000;

// Create a new Express app
const app = express();

// Listen for incoming GET-requests to "/"
app.get("/", (req, res) => {
	console.log("Someone requested my (g)root 🎄");
	console.log("Request method:", req.method);
	console.log("Request path:", req.path);
	res.send("Oh, hi there ☺️");
});

// Listen for incoming GET-requests to "/lol"
app.get("/lol", (_req, res) => {
	res.send("I was wondering why the frisbee kept getting bigger and bigger, but then it hit me.");
});

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	// Will be invoked once the server has started listening
	console.log(`🥳 Yay, server started on http://localhost:${PORT}`);
});
