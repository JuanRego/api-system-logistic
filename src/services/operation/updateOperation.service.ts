import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { OperationUpdate } from "../../interfaces/operation";
import { Operation } from "../../models/operation";
import { User } from "../../models/user";

const updateOperationService = async (
  id: string,
  operationId: string,
  { totalValue, finalizationDate }: OperationUpdate
) => {
  const operationRepository = AppDataSource.getRepository(Operation);
  const userRepository = AppDataSource.getRepository(User);

  const operation = await operationRepository.findOneBy({ id: operationId });
  const user = await userRepository.findOneBy({ id });

  // This query code pick the operation from the user to make sure the user is the owner
  const contains = await operationRepository
    .createQueryBuilder("operation")
    .where("operation.user_id = :id", { id: id })
    .getOne();

  if (!operation?.finalizationDate) {
    throw new AppError(401, "This operation are already finished");
  }

  if (!contains) {
    throw new AppError(404, "You are not the owner of this operation");
  }

  if (!operation) {
    throw new AppError(404, "Operation not found");
  }

  if (!user) {
    throw new AppError(404, "You don't have permissions to update");
  }

  totalValue ? (operation.totalValue = totalValue) : operation.totalValue;
  finalizationDate
    ? (operation.finalizationDate = finalizationDate)
    : operation.finalizationDate;

  await operationRepository.update(operation!.id, {
    totalValue,
    finalizationDate,
  });

  return operation;
};

export default updateOperationService;
