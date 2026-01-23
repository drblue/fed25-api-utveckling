/**
 * JWT (JSON Web Token) Payload Types
 */

export interface JWTAccessTokenPayload {
	sub: string;
	name: string;
	email: string;
}
