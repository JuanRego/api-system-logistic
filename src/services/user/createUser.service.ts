import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { UserCreation } from "../../interfaces/user";
import { User } from "../../models/user";
import bcrypt from "bcrypt";

const createUserService = async ({
  name,
  email,
  cellphone,
  password,
}: UserCreation) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ email });

  if (findUser) {
    throw new AppError(400, "User already exists");
  }

  const user = new User(name, email, cellphone, password);

  user.password = bcrypt.hashSync(password, 8);

  if (user.isAdmin != null && user.isAdmin != false) {
    user.isOperator = false;
  }

  user.operations = [];

  await userRepository.save(user);

  return {
    name,
    email,
    cellphone,
    password,
  };
};

export default createUserService;
