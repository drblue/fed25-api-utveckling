import { User } from "../../../generated/prisma/client.ts";

declare global {
	namespace Express {
		export interface Request {
			user?: User;
		}
	}
}
