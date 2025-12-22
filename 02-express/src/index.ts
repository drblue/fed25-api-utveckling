import express from "express";

// Declare config
const PORT = 3000;

// Create a new Express app
const app = express();

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	// Will be invoked once the server has started listening
	console.log(`🥳 Yay, server started on http://localhost:${PORT}`);
});
