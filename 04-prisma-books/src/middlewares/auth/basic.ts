/**
 * HTTP Basic Authentication Middleware
 */
import { NextFunction, Request, Response } from "express";

export const basic = async (req: Request, res: Response, next: NextFunction) => {
	console.log("Hello from auth/basic! 🙋🏽");

	// 1. Make sure Authorization header exists, otherwise bail 🛑

	// 2. Split Authorization header on ` `

	// 3. Check that Authorization scheme is "Basic", otherwise bail 🛑

	// 4. Decode credentials from base64 => ascii

	// 5. Split credentials on `:`

	// 6. Get user from database, otherwise bail 🛑

	// 7. Verify hash against credentials, otherwise bail 🛑

	// 8. Attach user to request

	// 9. Profit 💰🤑
	next();
}
