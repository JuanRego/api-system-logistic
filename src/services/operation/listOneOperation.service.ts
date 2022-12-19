import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Operation } from "../../models/operation";

const listOneOperationService = async (id: string) => {
  const operationRepository = AppDataSource.getRepository(Operation);

  const operation = await operationRepository.findOneBy({ id });

  if (!operation) {
    throw new AppError(404, "Operation not found");
  }

  return operation;
};

export default listOneOperationService;
