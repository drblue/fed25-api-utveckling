import { User } from "../../../generated/prisma/client.ts";
import { JWTAccessTokenPayload } from "../JWT.types.ts";

declare module "express-serve-static-core" {
	interface Request {
		token?: JWTAccessTokenPayload;  // JWT
		user?: User;  // HTTP Basic
	}
}
