import type { ChatMessagePayload, ClientToServerEvents, ServerToClientEvents, UserJoinResponse } from "@shared/types/SocketEvents.types.ts";
import { io, Socket } from "socket.io-client";
import "./assets/scss/style.scss";

const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
console.log("SOCKET_HOST:", SOCKET_HOST);

/**
 * DOM References
 */

// Forms
const loginConnectBtnEl = document.querySelector<HTMLButtonElement>("#connectBtn")!;
const loginFormEl = document.querySelector<HTMLFormElement>("#login-form")!;
const loginRoomSelectEl = document.querySelector<HTMLSelectElement>("#room")!;
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
let roomId: string | null = null;
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

	// Scroll to this message (smooth 🫠)
	msgEl.scrollIntoView({ behavior: "smooth" });
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

	// Scroll to this message (smooth 🫠)
	msgEl.scrollIntoView({ behavior: "smooth" });
}

const showChatView = () => {
	loginWrapperEl.classList.add("hide");
	chatWrapperEl.classList.remove("hide");
}

const showLoginView = () => {
	// Hide chat
	chatWrapperEl.classList.add("hide");

	// Disable "Connect"-button, dropdown and clear list of rooms
	loginConnectBtnEl.disabled = true;
	loginRoomSelectEl.disabled = true;
	loginRoomSelectEl.innerHTML = `<option selected>Loading...</option>`;

	// Request a list of rooms from the server
	// Once we get them, populate the `select` element with the rooms
	// After that, enable the "Connect" button
	console.log("🏨 Requesting rooms...");
	socket.emit("getRoomList", (rooms) => {
		// We gots rooms
		console.log("YAY ROOMS!", rooms);

		// Update list of rooms with options for each room
		loginRoomSelectEl.innerHTML = rooms
			.map(room => `<option value="${room.id}">${room.name}</option>`)
			.join("");

		// Enable "Connect"-button and dropdown
		loginConnectBtnEl.disabled = false;
		loginRoomSelectEl.disabled = false;
	});

	loginWrapperEl.classList.remove("hide");
}

/**
 * Socket Event Listeners
 */

// Connect to Socket.IO Server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST);

// Listen for when a connection is established
socket.on("connect", () => {
	console.log("💥 Connected to the server", socket.id);

	// Show login view
	showLoginView();
});

// Listen for when the server gets tired of us
socket.on("disconnect", () => {
	console.log("🥺 Got disconnected from the server");
	addNoticeToChat("Disconnected from the server");
});

// Listen for when we're reconnected (either due to ours or the servers fault)
socket.io.on("reconnect", () => {
	console.log("🥰 Reconnected to the server");

	// If we were in the chat before being disconnected, re-emit the `userJoinRequest` event
	if (username && roomId) {
		socket.emit("userJoinRequest", username, roomId, userJoinRequestCallback);
		addNoticeToChat("You've reconnected");
	}
});

// Listen for new chat messages (that the server emitts to us)
socket.on("chatMessage", (payload) => {
	console.log("📨 YAY SOMEONE WROTE SOMETHING!!!!!!1111", payload);
	addMessageToChat(payload);
});

// Listen for when a new user joins the chat
socket.on("userJoined", (username, timestamp) => {
	console.log("👶🏻 A new user has joined the chat:", username, timestamp);
	addNoticeToChat(`🏡 ${username} has joined the chat`, timestamp);
});

// Listen for when a user leaves the chat
socket.on("userLeft", (username, timestamp) => {
	console.log("🚪 A user has left the chat:", username, timestamp);
	addNoticeToChat(`🚪 ${username} has left the building`, timestamp);
});

/**
 * Socket Handlers
 */
const userJoinRequestCallback = (response: UserJoinResponse) => {
	// This will only be executed once the server has responded
	console.log("Server acknowledged our `userJoinRequest`:", response);

	if (!response.success || !response.room) {
		alert("NO ACCESS 4 U!");
		return;
	}

	// Update chat view title with room name
	const chatTitleEl = document.querySelector<HTMLHeadingElement>("#chat-title")!;
	chatTitleEl.innerText = response.room.name;

	// Update list of online users in the room
	const onlineUsersEl = document.querySelector<HTMLUListElement>("#online-users")!;
	onlineUsersEl.innerHTML = response.room.users
		.map(user => `<li>${user.username}</li>`)
		.join("");

	// Show chat view
	showChatView();
}

/**
 * DOM Event Listeners
 */

// Save username and show chat
loginFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// Set username and roomId
	roomId = loginRoomSelectEl.value;
	username = loginUsernameInputEl.value.trim();

	// If no username or no room, no join
	if (!username || !roomId) {
		alert("No username or no room? No chat 4 u!");
		return;
	}

	// Emit `userJoinRequest`-event to the server and
	// WAIT for acknowledgement
	// BEFORE showing the chat view
	console.log("Emitting `userJoinRequest` to the server");
	socket.emit("userJoinRequest", username, roomId, userJoinRequestCallback);
});

// Send message to server when form is submitted
messageFormEl.addEventListener("submit", (e) => {
	e.preventDefault();

	// 💇
	const trimmedMessage = messageInputEl.value.trim();

	// If no message, no send
	if (!trimmedMessage || !username || !roomId) {
		return;
	}

	// Construct message payload
	const payload: ChatMessagePayload = {
		content: trimmedMessage,
		roomId,
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
