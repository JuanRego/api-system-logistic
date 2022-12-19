import { AppDataSource } from "../../data-source";
import { Quota } from "../../models/quota";

const listQuotasService = async () => {
  const quotaRepository = AppDataSource.getRepository(Quota);

  const quotas = quotaRepository.find();

  return quotas;
};

export default listQuotasService;
