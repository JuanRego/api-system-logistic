import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Quota } from "../../models/quota";

const deleteQuotaService = async (id: string) => {
  const quotaRepository = AppDataSource.getRepository(Quota);

  const quota = await quotaRepository.findOneBy({ id });

  if (!quota) {
    throw new AppError(404, "Quota not found");
  }

  await quotaRepository.delete(id);

  return true;
};

export default deleteQuotaService;
