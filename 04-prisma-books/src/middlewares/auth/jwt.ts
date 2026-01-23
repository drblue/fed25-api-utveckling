/**
 * JWT Authentication Middleware
 */
import Debug from "debug";
import { NextFunction, Request, Response } from "express";

// Create a new debug instance
const debug = Debug("prisma-books:auth:jwt");

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	debug("Hello from auth/jwt! 🙋😎");

	// 1. Make sure Authorization header exists, otherwise bail 🛑
	if (!req.headers.authorization) {
		debug("Authorization header missing");
		res.status(401).send({ status: "fail", data: { message: "Missing Authorization header" }});
		return;
	}

	// 2. Split Authorization header on ` `
	// "Bearer <token>"
	debug("Authorization header: %o", req.headers.authorization);
	const [authScheme, token] = req.headers.authorization.split(" ");

	// 3. Check that Authorization scheme is "Bearer", otherwise bail 🛑
	if (authScheme.toLowerCase() !== "bearer") {
		debug("Authorization Scheme isn't Bearer: '%s'", authScheme);
		res.status(401).send({ status: "fail", data: { message: "Invalid Authorization header" }});
		return;
	}

	// 4. Verify token and extract payload, otherwise bail 🛑

	// 5. Attach payload to request

	// 6. Profit 💰🤑
	next();
}
