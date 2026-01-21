/**
 * HTTP Basic Authentication Middleware
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import { decodeBase64 } from "../../lib/base64.ts";
import { getUserByEmail } from "../../services/user.service.ts";

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
	const decodedPayload = decodeBase64(base64Payload);
	// decodedPayload = "johan@digitalvillage.se:appapp"

	// 5. Split credentials on `:`
	const [email, plaintextPassword] = decodedPayload.split(":");
	debug("Email: %s", email);
	debug("Password: %s", plaintextPassword);

	// 5.5. Check that user sent email and password
	// if not email OR not plaintextPassword
	if (!email || !plaintextPassword) {
		debug("User did not send email and/or password");
		res.status(401).send({ status: "fail", data: { message: "Authorization Payload invalid" }});
		return;
	}

	// 6. Get user from database, otherwise bail 🛑
	const user = await getUserByEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		res.status(401).send({ status: "fail", data: { message: "Authorization invalid" }});
		return;
	}

	// 7. Verify hash against credentials, otherwise bail 🛑
	debug("👌🏻 User did exist: %s", email);
	const isPasswordCorrect = await bcrypt.compare(plaintextPassword, user.password);  // user.password is the hashed pwd from the database
	if (!isPasswordCorrect) {
		debug("Password for user %s was not correct", email);
		res.status(401).send({ status: "fail", data: { message: "Authorization invalid" }});
		return;
	}
	debug("✅ Password for user %s was correct 🥳", email);

	// 8. Attach user to request

	// 9. Profit 💰🤑
	next();
}
