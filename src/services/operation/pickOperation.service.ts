import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { OperationUpdate } from "../../interfaces/operation";
import { Operation } from "../../models/operation";
import { User } from "../../models/user";

const pickOperationService = async (id: string, userId: string) => {
  const operationRepository = AppDataSource.getRepository(Operation);
  const userRepository = AppDataSource.getRepository(User);

  const operation = await operationRepository.findOneBy({ id });
  const user = await userRepository.findOneBy({ id: userId });

  if (!operation) {
    throw new AppError(404, "Operation not found");
  }

  if (!user) {
    throw new AppError(404, "You don't have permissions to update");
  }

  user.operations.push(operation);
  await userRepository.save(user);

  return true;
};

export default pickOperationService;
