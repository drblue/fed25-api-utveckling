import { User } from "../../../generated/prisma/client.ts";
import { JWTAccessTokenPayload } from "../JWT.types.ts";

declare global {
	namespace Express {
		export interface Request {
			token?: JWTAccessTokenPayload;  // JWT
			user?: User;  // HTTP Basic
		}
	}
}
