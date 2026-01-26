/**
 * Auth Controller
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { CreateUserData } from "../types/User.types.ts";
import { createUser, getUserByEmail } from "../services/user.service.ts";
import { JWTAccessTokenPayload } from "../types/JWT.types.ts";

// Create a new debug instance
const debug = Debug("prisma-books:auth_controller");

// Get environment variables
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Guard against incorrect config
if (!ACCESS_TOKEN_SECRET) {
	throw new Error("No ACCESS_TOKEN_SECRET defined in environment");
}

interface LoginData {
	email: string;
	password: string;
}

/**
 * Log in a user
 */
export const login = async (req: Request, res: Response) => {
	// Get the validated data
	const { email, password } = matchedData<LoginData>(req);

	// Get user from database, otherwise bail 🛑
	const user = await getUserByEmail(email);
	if (!user) {
		debug("User %s does not exist", email);
		res.status(401).send({ status: "fail", data: { message: "Authorization invalid" }});
		return;
	}

	// Verify hash against credentials, otherwise bail 🛑
	const isPasswordCorrect = await bcrypt.compare(password, user.password);
	if (!isPasswordCorrect) {
		debug("Password for user %s was not correct", email);
		res.status(401).send({ status: "fail", data: { message: "Authorization invalid" }});
		return;
	}
	debug("✅ Password for user %s was correct 🥳", email);

	// Construct JWT-payload
	const payload: JWTAccessTokenPayload = {
		sub: String(user.id),
		name: user.name,
		email: user.email,
	}

	// Sign payload with (access-token)-secret
	const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET);

	// Respond with access-token
	res.send({
		status: "success",
		data: {
			access_token,
		},
	});
}

/**
 * Register a User
 */
export const register = async (req: Request, res: Response) => {
	// Get only the validated data
	const validatedData = matchedData<CreateUserData>(req);
	console.log("validatedData:", validatedData);

	// Calculate a hash + salt for the password
	const hashed_password = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
	console.log("plaintext password:", validatedData.password);
	console.log("hashed password:", hashed_password);

	// Create the user in the database
	try {
		// plz computah, create user, mkai?
		const user = await createUser({
			...validatedData,
			password: hashed_password,
		});

		// Respond with 201 Created + status success
		res.status(201).send({ status: "success", data: user });

	} catch (err) {
		handlePrismaError(res, err);
	}
}
