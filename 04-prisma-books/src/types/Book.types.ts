/**
 * Book Types
 */
import type { Book } from "../../generated/prisma/client.ts";

export type CreateBookData = Omit<Book, "id">;

export type UpdateBookData = Partial<CreateBookData>;
