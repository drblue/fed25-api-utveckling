/**
 * Socket Controller
 */
import Debug from "debug";
import { Socket } from "socket.io";

// Create a new debug instance
const debug = Debug('chat:socket_controller');
debug("Socket Controller initialized");

export const handleConnection = (socket: Socket) => {
	// Yay someone connected to me

	// Handle user disconnecting
	socket.on("disconnect", () => {
		debug("Socket disconnected: %s", socket.id);
	});
}
