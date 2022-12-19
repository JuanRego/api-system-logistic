import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { UserUpdate } from "../../interfaces/user";
import { User } from "../../models/user";

const updateUserService = async (
  id: string,
  pass: string,
  { name, email, cellphone, password, isVerified }: UserUpdate
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });
  const contraUser = await userRepository.findOneBy({ id: pass });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (contraUser?.isAdmin || !user) {
    name ? (user.name = name) : user.name;
    email ? (user.email = email) : user.email;
    cellphone ? (user.cellphone = cellphone) : user.cellphone;
    password ? (user.password = password) : user.password;
    isVerified ? (user.isVerified = isVerified) : user.isVerified;

    await userRepository.update(user!.id, {
      name,
      email,
      cellphone,
      password,
      isVerified,
    });

    return user;
  }
};

export default updateUserService;
