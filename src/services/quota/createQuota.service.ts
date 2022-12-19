import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Quota } from "../../models/quota";
import { Operation } from "../../models/operation";
import { QuotaCreation } from "../../interfaces/quota";
import { User } from "../../models/user";

const createQuotaService = async (
  id: string,
  operationId: string,
  { numeroLote, guide, charge, totalValue }: QuotaCreation
) => {
  const quotaRepository = AppDataSource.getRepository(Quota);
  const operationRepository = AppDataSource.getRepository(Operation);
  const userRepository = AppDataSource.getRepository(User);

  const operation = await operationRepository.findOneBy({ id: operationId });
  const user = await userRepository.findOneBy({ id });

  // This query code pick the operation from the user to make sure the user is the owner
  const contains = await operationRepository
    .createQueryBuilder("operation")
    .where("operation.user_id = :id", { id: id })
    .getOne();

  if (!contains) {
    throw new AppError(404, "You are not the owner of this operation");
  }

  if (!operation) {
    throw new AppError(404, "User not found");
  }

  const quota = new Quota(numeroLote, guide, charge, totalValue);

  quota.items = [];

  await quotaRepository.save(quota);

  operation.quotas.push(quota);

  await operationRepository.save(operation);

  return quota;
};

export default createQuotaService;
