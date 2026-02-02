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

	// Handle user disconnecting
	socket.on("disconnect", () => {
		debug("Socket disconnected: %s", socket.id);
	});
}
