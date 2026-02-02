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

	// Handle user disconnecting
	socket.on("disconnect", () => {
		debug("Socket disconnected: %s", socket.id);
	});

	// Say hello to the nice user
	setTimeout(() => {
		socket.emit("hello");
		debug("Said hello to the nice user %s ☺️", socket.id);
	}, 2000);
}
