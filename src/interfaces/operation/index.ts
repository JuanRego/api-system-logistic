import { Operation } from "../../models/operation";

export type OperationCreation = Omit<
  Operation,
  "id" | "user" | "finalizationDate" | "quotas"
>;
export type OperationUpdate = Pick<
  Operation,
  "totalValue" | "finalizationDate"
>;
