import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../models/user";
import { Operation } from "../../models/operation";
import { OperationCreation } from "../../interfaces/operation";

const createOperationService = async (
  id: string,
  { name, totalValue, createdDate }: OperationCreation
) => {
  const operationRepository = AppDataSource.getRepository(Operation);

  const operation = new Operation(name, totalValue, createdDate);

  operation.quotas = [];

  await operationRepository.save(operation);

  return operation;
};

export default createOperationService;
