import { Quota } from "../../models/quota";

export type QuotaCreation = Omit<Quota, "id">;
export type QuotaUpdate = Pick<Quota, "guide" | "charge" | "totalValue">;
