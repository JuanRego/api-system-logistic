import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { QuotaUpdate } from "../../interfaces/quota";
import { Operation } from "../../models/operation";
import { User } from "../../models/user";
import { Quota } from "../../models/quota";

const updateQuotaService = async (
  id: string,
  operationId: string,
  quotaId: string,
  { guide, charge, totalValue }: QuotaUpdate
) => {
  const operationRepository = AppDataSource.getRepository(Operation);
  const userRepository = AppDataSource.getRepository(User);
  const quotaRepository = AppDataSource.getRepository(Quota);

  const operation = await operationRepository.findOneBy({ id: operationId });
  const user = await userRepository.findOneBy({ id });
  const quota = await quotaRepository.findOneBy({ id: quotaId });

  const contains = await operationRepository
    .createQueryBuilder("user")
    .where("operation.user_id = :id", { id: id })
    .getOne();

  if (contains?.id !== operation?.id) {
    throw new AppError(401, "You are not the owner of this operation");
  }

  if (!operation) {
    throw new AppError(404, "Operation not found");
  }

  if (!user) {
    throw new AppError(401, "You don't have permissions to update");
  }

  guide ? (quota.guide = guide) : quota.guide;
  charge ? (quota.charge = charge) : quota.charge;
  totalValue ? (quota.totalValue = totalValue) : quota.totalValue;

  await quotaRepository.update(quota!.id, {
    guide,
    charge,
    totalValue,
  });

  return quota;
};

export default updateQuotaService;
