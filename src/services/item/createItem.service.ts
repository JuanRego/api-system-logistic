import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Quota } from "../../models/quota";
import { Item } from "../../models/item";
import { ItemCreation } from "../../interfaces/item";

const createItemService = async (
  id: string,
  quotaId: string,
  { numeroLote, guide, charge, totalValue }: ItemCreation
) => {
  const quotaRepository = AppDataSource.getRepository(Quota);
  const itemRepository = AppDataSource.getRepository(Item);

  const quota = await quotaRepository.findOneBy({ id: quotaId });

  const item = new Item(numeroLote, guide, charge, totalValue);

  await itemRepository.save(item);

  quota.items.push(item);

  await quotaRepository.save(quota);

  return Item;
};

export default createItemService;
