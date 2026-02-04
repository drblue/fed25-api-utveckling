export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	chatMessage: (payload: ChatMessagePayload) => void;
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	sendChatMessage: (payload: ChatMessagePayload) => void;
}

// Message payload
export interface ChatMessagePayload {
	content: string;
	timestamp: number;
	username: string;
}
