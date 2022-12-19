import { User } from "../../models/user";

export type UserCreation = Omit<
  User,
  "id" | "operations" | "isAdmin" | "isVerified" | "isOperator"
>;
export type UserLogin = Pick<User, "email" | "password">;
export type UserUpdate = Pick<
  User,
  "name" | "email" | "cellphone" | "password" | "isVerified"
>;
