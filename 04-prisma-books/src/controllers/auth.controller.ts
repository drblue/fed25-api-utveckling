/**
 * Auth Controller
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { handlePrismaError } from "../lib/handlePrismaError.ts";
import { CreateUserData } from "../types/User.types.ts";
import { createUser, getUser, getUserByEmail } from "../services/user.service.ts";
import { JWTAccessTokenPayload, JWTRefreshTokenPayload } from "../types/JWT.types.ts";

// Create a new debug instance
const debug = Debug("prisma-books:auth_controller");

// Get environment variables
const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME as StringValue || "4h";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME as StringValue || "1d";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

// Guard against incorrect config
if (!ACCESS_TOKEN_SECRET) {
	throw new Error("No ACCESS_TOKEN_SECRET defined in environment");
}
if (!REFRESH_TOKEN_SECRET) {
	throw new Error("No REFRESH_TOKEN_SECRET defined in environment");
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

	// Construct JWT access-token payload
	const payload: JWTAccessTokenPayload = {
		sub: String(user.id),
		name: user.name,
		email: user.email,
	}

	// Sign payload with (access-token)-secret
	const access_token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
		// expiresIn: 60 * 60 * 24 * 3,  // 3d
		expiresIn: ACCESS_TOKEN_LIFETIME,
	});

	// Construct JWT refresh-tokenb payload
	const refresh_payload: JWTRefreshTokenPayload = {
		sub: String(user.id),
	}

	// Sign refresh-payload with (refresh-token)-secret
	const refresh_token = jwt.sign(refresh_payload, REFRESH_TOKEN_SECRET, {
		expiresIn: REFRESH_TOKEN_LIFETIME,
	});

	// Set refresh_token as a http-only cookie
	res.cookie("refresh_token", refresh_token, {
		httpOnly: true,
		sameSite: "strict",
		path: "/refresh",
	});

	// Respond with access-token
	res.send({
		status: "success",
		data: {
			access_token,
		},
	});
}

/**
 * Issue a new access_token using a refresh_token
 */
export const refresh = async (req: Request, res: Response) => {
	// 1. Get refresh token from cookie 🍪
	debug("🍪 Cookies: %o", req.cookies);
	const refresh_token = (req.cookies as { refresh_token?: string }).refresh_token;
	if (!refresh_token) {
		debug("No refresh token found in cookies 😢");
		res.status(401).send({ status: "fail", data: { message: "Authorization required" }});
		return;
	}

	// 2. Verify refresh token and extract payload with id (`sub`) ✨
	let refresh_payload: JWTRefreshTokenPayload;
	try {
		// Verify token using the refresh-token secret
		refresh_payload = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET) as JWTRefreshTokenPayload;

	} catch (err) {
		debug("JWT Refresh Verify failed: %O", err);

		// If token has expired, let the user know
		if (err instanceof jwt.TokenExpiredError) {
			res.status(401).send({ status: "fail", data: { message: "Refresh token has expired" } });
			return;
		}

		res.status(401).send({ status: "fail", data: { message: "Authorization denied" } });
		return;
	}

	// 3. Find user with id from refresh token 🕵
	debug("Decoded refresh token payload: %O", refresh_payload);
	const userId = Number(refresh_payload.sub);
	const user = await getUser(userId);
	if (!user) {
		debug("User with id %d does not exist (anymore at least)", userId);
		res.status(401).send({ status: "fail", data: { message: "Authorization denied" } });
		return;
	}

	// 4. Construct new access token payload 🏗️
	const access_payload: JWTAccessTokenPayload = {
		sub: String(user.id),
		name: user.name,
		email: user.email,
	}

	// 5. Sign payload with access token secret ✍🏻
	const access_token = jwt.sign(access_payload, ACCESS_TOKEN_SECRET, {
		expiresIn: ACCESS_TOKEN_LIFETIME,
	});

	// 6. Respond with the new access token 🗣️
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
