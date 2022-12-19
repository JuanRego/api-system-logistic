import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Item } from "../../models/item";

const deleteItemService = async (id: string) => {
  const itemRepository = AppDataSource.getRepository(Item);

  const item = await itemRepository.findOneBy({ id });

  if (!item) {
    throw new AppError(404, "Item not found");
  }

  await itemRepository.delete(id);

  return true;
};

export default deleteItemService;
