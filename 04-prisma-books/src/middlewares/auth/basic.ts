/**
 * HTTP Basic Authentication Middleware
 */
import Debug from "debug";
import { NextFunction, Request, Response } from "express";

// Create a new debug instance
const debug = Debug("prisma-books:auth:basic");

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/basic! 🙋🏽");

	// 1. Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing");
		res.status(401).send({ status: "fail", data: { message: "Authorization required but missing" }});
		return;
	}

	// 2. Split Authorization header on ` `
	// "Basic am9oYW5AZGlnaXRhbHZpbGxhZ2Uuc2U6YXBwYXBw"
	// [0] => "Basic"
	// [1] => "am9oYW5AZGlnaXRhbHZpbGxhZ2Uuc2U6YXBwYXBw"
	debug("Authorization header: %o", req.headers.authorization);
	const [authScheme, base64Payload] = req.headers.authorization.split(" ");

	// 3. Check that Authorization scheme is "Basic", otherwise bail 🛑
	if (authScheme.toLowerCase() !== "basic") {
		debug("Authorization Scheme isn't Basic: '%s'", authScheme);
		res.status(401).send({ status: "fail", data: { message: "Authorization Scheme must be Basic" }});
		return;
	}

	// 4. Decode credentials from base64 => ascii
	debug("base64Payload:", base64Payload);

	// 5. Split credentials on `:`

	// 6. Get user from database, otherwise bail 🛑

	// 7. Verify hash against credentials, otherwise bail 🛑

	// 8. Attach user to request

	// 9. Profit 💰🤑
	next();
}
