/**
 * Author Types
 */
import type { Author } from "../../generated/prisma/client.ts";

export type AuthorId = Pick<Author, "id">;

export type CreateAuthorData = Omit<Author, "id">;

export type UpdateAuthorData = Partial<CreateAuthorData>;
