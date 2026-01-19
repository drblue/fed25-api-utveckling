/**
 * User Types
 */
import type { User } from "../../generated/prisma/client.ts";

export type CreateUserData = Omit<User, "id">;
