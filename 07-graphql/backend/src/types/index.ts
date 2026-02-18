/**
 * TypeScript Types
 */

import { Author, Book, Publisher } from "../../generated/prisma/client.ts";

export type CreateAuthorData = Omit<Author, "id">;
export type UpdateAuthorData = Partial<CreateAuthorData>;

export type CreateBookData = Omit<Book, "id">;
export type UpdateBookData = Partial<CreateBookData>;

export type CreatePublisherData = Omit<Publisher, "id">;
export type UpdatePublisherData = Partial<CreatePublisherData>;
