import type { ChatMessagePayload, ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketEvents.types.ts";
import { io, Socket } from "socket.io-client";
import "./assets/scss/style.scss";

const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
console.log("SOCKET_HOST:", SOCKET_HOST);

/**
 * DOM References
 */

// Forms
const loginFormEl = document.querySelector<HTMLFormElement>("#login-form")!;
const loginUsernameInputEl = document.querySelector<HTMLInputElement>("#username")!;
const messageInputEl = document.querySelector<HTMLInputElement>("#message")!;
const messageFormEl = document.querySelector<HTMLFormElement>("#message-form")!;

// Lists
const messagesEl = document.querySelector<HTMLDivElement>("#messages")!;

// Views
const chatWrapperEl = document.querySelector<HTMLDivElement>("#chat-wrapper")!;
const loginWrapperEl = document.querySelector<HTMLDivElement>("#login-wrapper")!;

/**
 * Variables
 */
let username: string | null = null;

/**
 * Functions
 */

const addMessageToChat = (data: ChatMessagePayload, ownMessage = false) => {
	// Create a new LI element
	const msgEl = document.createElement("li");

	// Set CSS-classes
	msgEl.classList.add("message");

	// If it's our own message, add the `own-message` class
	if (ownMessage) {
		msgEl.classList.add("own-message");
	}

	// Get human readable time
	const humanReadableTime = new Date(data.timestamp).toLocaleTimeString();  // "13:37:00"

	// Set text content
	msgEl.innerHTML = ownMessage
		? `
			<span class="content">${data.content}</span>
			<span class="time">${humanReadableTime}</span>
		` : `
			<span class="user">${data.username}</span>
			<span class="content">${data.content}</span>
			<span class="time">${humanReadableTime}</span>
		`;

	// Append LI to messages list
	messagesEl.appendChild(msgEl);
}

const addNoticeToChat = (msg: string, timestamp?: number) => {
	if (!timestamp) {
		timestamp = Date.now();
	}

	// Create a new LI element
	const msgEl = document.createElement("li");

	// Set CSS-classes
	msgEl.classList.add("notice");

	// Get human readable time
	const humanReadableTime = new Date(timestamp).toLocaleTimeString();  // "13:37:00"

	// Set text content
	msgEl.innerHTML = `
			<span class="content">${msg}</span>
			<span class="time">${humanReadableTime}</span>
		`;

	// Append LI to messages list
	messagesEl.appendChild(msgEl);
}

const showChatView = () => {
	loginWrapperEl.classList.add("hide");
	chatWrapperEl.classList.remove("hide");
}

/*
// NOTE: Will be used later when leaving a room
const showLoginView = () => {
	chatWrapperEl.classList.add("hide");
	loginWrapperEl.classList.remove("hide");
}
*/

/**
 * Socket Event Listeners
 */

// Connect to Socket.IO Server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST);

// Listen for when a connection is established
socket.on("connect", () => {
	console.log("💥 Connected to the server", socket.id);
	addNoticeToChat("Connected to the server");
});

// Listen for when the server gets tired of us
socket.on("disconnect", () => {
	console.log("🥺 Got disconnected from the server");
	addNoticeToChat("Disconnected from the server");
});

// Listen for new chat messages (that the server emitts to us)
socket.on("chatMessage", (payload) => {
	console.log("📨 YAY SOMEONE WROTE SOMETHING!!!!!!1111", payload);
	addMessageToChat(payload);
});

// Listen for when a new user joins the chat
socket.on("userJoined", (username, timestamp) => {
	console.log("👶🏻 A new user has joined the chat:", username, timestamp);
	addNoticeToChat(`${username} has joined the chat`, timestamp);
});

/**
 * DOM Event Listeners
 */

// Save username and show chat
loginFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedUsername = loginUsernameInputEl.value.trim();

	// If no username, no join
	if (!trimmedUsername) {
		alert("No username? No chat 4 u!");
		return;
	}

	// Set username
	username = trimmedUsername;

	// Emit `userJoinRequest`-event to the server and
	// WAIT for acknowledgement
	// BEFORE showing the chat view
	console.log("Emitting `userJoinRequest` to the server");
	socket.emit("userJoinRequest", username, (response) => {
		// This will only be executed once the server has responded
		console.log("Server acknowledged our `userJoinRequest`:", response);

		if (!response.success) {
			alert("NO ACCESS 4 U!");
			return;
		}

		// Show chat view
		showChatView();
	});
});

// Send message to server when form is submitted
messageFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedMessage = messageInputEl.value.trim();

	// If no message, no send
	if (!trimmedMessage || !username) {
		return;
	}

	// Construct message payload
	const payload: ChatMessagePayload = {
		content: trimmedMessage,
		timestamp: Date.now(),
		username,
	}

	// 📮 Send (emit) the message to the server
	socket.emit("sendChatMessage", payload);
	console.log("Emitted 'sendChatMessage' event to the server", payload);

	// Add message to the chat
	addMessageToChat(payload, true);

	// Clear input field
	messageInputEl.value = "";
	messageInputEl.focus();
});
