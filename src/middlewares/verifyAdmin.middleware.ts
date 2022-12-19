import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { AppDataSource } from "../data-source";
import { User } from "../models/user";

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    throw new AppError(401, "Missing Token/Authorization Header");
  }
  var decoded = jwt.decode(token!);
  const pass = decoded.id;
  const userRepository = AppDataSource.getRepository(User);
  const contraUser = await userRepository.findOneBy({ id: pass });

  if (contraUser?.isAdmin === false) {
    throw new AppError(401, "You don't have the admin permissions");
  }

  next();
};

export default verifyAdmin;
