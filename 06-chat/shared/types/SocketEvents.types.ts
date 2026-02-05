import type { Room } from "./Models.types";
export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	chatMessage: (payload: ChatMessagePayload) => void;
	userJoined: (username: string, timestamp: number) => void;
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	getRoomList: (
		callback: (rooms: Room[]) => void
	) => void;

	sendChatMessage: (payload: ChatMessagePayload) => void;

	userJoinRequest: (
		username: string,
		callback: (response: UserJoinResponse) => void
	) => void;
}

// Message payload
export interface ChatMessagePayload {
	content: string;
	timestamp: number;
	username: string;
}

// User Join Response
export interface UserJoinResponse {
	success: boolean;
}
