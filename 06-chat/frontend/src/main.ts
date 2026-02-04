import type { ChatMessagePayload, ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketEvents.types.ts";
import { io, Socket } from "socket.io-client";
import "./assets/scss/style.scss";

const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
console.log("SOCKET_HOST:", SOCKET_HOST);

const messageInputEl = document.querySelector<HTMLInputElement>("#message")!;
const messageFormEl = document.querySelector<HTMLFormElement>("#message-form")!;
const messagesEl = document.querySelector<HTMLDivElement>("#messages")!;

/**
 * Functions
 */
const addMessageToChat = (data: ChatMessagePayload) => {
	// Create a new LI element
	const msgEl = document.createElement("li");

	// Set CSS-classes
	msgEl.classList.add("message");

	// Set text content
	msgEl.textContent = data.content;

	// Append LI to messages list
	messagesEl.appendChild(msgEl);
}

/**
 * Socket Event Listeners
 */

// Connect to Socket.IO Server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST);

// Listen for when a connection is established
socket.on("connect", () => {
	console.log("💥 Connected to the server", socket.id);
});

// Listen for when the server gets tired of us
socket.on("disconnect", () => {
	console.log("🥺 Got disconnected from the server");
});

// Listen for new chat messages (that the server emitts to us)
socket.on("chatMessage", (payload) => {
	console.log("📨 YAY SOMEONE WROTE SOMETHING!!!!!!1111", payload);
	addMessageToChat(payload);
});

/**
 * Send message to server when form is submitted
 */
messageFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedMessage = messageInputEl.value.trim();

	// If no message, no send
	if (!trimmedMessage) {
		return;
	}

	// Construct message payload
	const payload: ChatMessagePayload = {
		content: trimmedMessage,
	}

	// 📮 Send (emit) the message to the server
	socket.emit("sendChatMessage", payload);
	console.log("Emitted 'sendChatMessage' event to the server", payload);

	// Add message to the chat
	addMessageToChat(payload);

	// Clear input field
	messageInputEl.value = "";
	messageInputEl.focus();
});
