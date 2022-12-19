import { AppDataSource } from "../../data-source";
import { Operation } from "../../models/operation";

const listOperationsService = async () => {
  const operationRepository = AppDataSource.getRepository(Operation);

  const operations = operationRepository.find();

  return operations;
};

export default listOperationsService;
