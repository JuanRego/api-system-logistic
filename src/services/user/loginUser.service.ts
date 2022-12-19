import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { UserLogin } from "../../interfaces/user";
import { User } from "../../models/user";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { idText } from "typescript";

const loginService = async ({ email, password }: UserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ email });

  if (!findUser) {
    throw new AppError(400, "Email or password incorrect");
  }

  const verifyHash = bcrypt.compareSync(password, findUser.password);

  if (!verifyHash) {
    throw new AppError(400, "Email or password incorrect");
  }

  //

  const token = jwt.sign(
    {
      email: findUser.email,
      id: findUser.id,
      isVerified: findUser.isVerified,
      isAdmin: findUser.isAdmin,
    },
    process.env.TOKEN_KEY as string,
    { expiresIn: "24h" }
  );

  const user = {
    id: findUser.id,
    name: findUser.name,
    isVerified: findUser.isVerified,
  };

  return { user, AccessToken: token };
};

export default loginService;
