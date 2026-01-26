/**
 * JWT Authentication Middleware
 */
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWTAccessTokenPayload } from "../../types/JWT.types.ts";

// Create a new debug instance
const debug = Debug("prisma-books:auth:jwt");

// Get environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Guard against incorrect config
if (!ACCESS_TOKEN_SECRET) {
	throw new Error("No ACCESS_TOKEN_SECRET defined in environment");
}

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
	try {
		const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTAccessTokenPayload;

		// 5. Attach payload to request
		req.token = payload;

		// 6. Profit 💰🤑
		next();

	} catch (err) {
		debug("JWT Verify failed: %O", err);

		// If token has expired, let the user know
		if (err instanceof jwt.TokenExpiredError) {
			res.status(401).send({ status: "fail", data: { message: "Authorization token has expired" } });
			return;
		}

		res.status(401).send({ status: "fail", data: { message: "Authorization denied" } });
		return;
	}
}
