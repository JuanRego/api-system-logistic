import { Item } from "../../models/item";

export type ItemCreation = Omit<Item, "id">;
