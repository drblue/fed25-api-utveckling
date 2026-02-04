/**
 * Socket Controller
 */
import { ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketEvents.types.ts";
import Debug from "debug";
import { Socket } from "socket.io";

// Create a new debug instance
const debug = Debug('chat:socket_controller');
debug("Socket Controller initialized");

export const handleConnection = (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
	// Yay someone connected to me

	// Listen for incoming chat messages
	socket.on("sendChatMessage", (payload) => {
		debug("📨 New chat message from %s: %o", socket.id, payload);

		// Broadcast message to everyone connected EXCEPT the sender
		socket.broadcast.emit("chatMessage", payload);
	});

	// Listen for a user join request
	socket.on("userJoinRequest", (username, callback) => {
		debug("👶🏻 User %s from socket %s wants to join the chat", username, socket.id);

		// Acknowledge request
		// Always let the user in (for now 😇)
		// We should probably check if the username is in use
		// and not allow the user to join if it's already taken
		if (username.toLowerCase().includes("bus-")) {
			callback({ success: false });
			return;
		}

		callback({ success: true });
	});

	// Handle user disconnecting
	socket.on("disconnect", () => {
		debug("Socket disconnected: %s", socket.id);
	});
}
