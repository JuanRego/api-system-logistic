import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Operation } from "../../models/operation";

const deleteOperationService = async (id: string) => {
  const operationRepository = AppDataSource.getRepository(Operation);

  const operation = await operationRepository.findOneBy({ id });

  if (!operation) {
    throw new AppError(404, "Operation not found");
  }

  await operationRepository.delete(id);

  return true;
};

export default deleteOperationService;
