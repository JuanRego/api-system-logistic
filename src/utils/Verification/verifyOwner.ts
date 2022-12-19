import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Operation } from "../../models/operation";
import { User } from "../../models/user";

const verifyOwner = async (userId: string, operationId: string) => {
  const operationRepository = AppDataSource.getRepository(Operation);
  const userRepository = AppDataSource.getRepository(User);

  const contains = await operationRepository
    .createQueryBuilder("operation")
    .where("operation.user_id = :id", { id: userId });

  if (!contains) {
    throw new AppError(403, "You are not the owner of this operation");
  }
  return true;
};

export default verifyOwner;
