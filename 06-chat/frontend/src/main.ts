import type { ClientToServerEvents, ServerToClientEvents } from "@shared/types/SocketEvents.types.ts";
import { io, Socket } from "socket.io-client";
import "./assets/scss/style.scss";

const SOCKET_HOST = import.meta.env.VITE_SOCKET_HOST;
console.log("SOCKET_HOST:", SOCKET_HOST);

// const messageEl = document.querySelector("#message") as HTMLInputElement;
// const messageFormEl = document.querySelector("#message-form") as HTMLFormElement;
// const messagesEl = document.querySelector("#messages") as HTMLDivElement;

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

// Listen for when the nice server says hello
socket.on("hello", () => {
	console.log(" Server said: Hello, is it me you're looking for? ☺️");
});
