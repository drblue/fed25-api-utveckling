/**
 * Publisher Types
 */
import type { Publisher } from "../../generated/prisma/client.ts";

export type CreatePublisherData = Omit<Publisher, "id">;

export type UpdatePublisherData = Partial<CreatePublisherData>;
