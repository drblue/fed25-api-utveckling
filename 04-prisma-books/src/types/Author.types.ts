/**
 * Author Types
 */
import type { Author } from "../../generated/prisma/client.ts";

export type CreateAuthorData = Omit<Author, "id">;

export type UpdateAuthorData = Partial<CreateAuthorData>;
