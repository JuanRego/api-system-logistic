import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import * as jwt from "jsonwebtoken";

import createUserService from "../../services/user/createUser.service";
import listUsersService from "../../services/user/listUsers.service";
import loginService from "../../services/user/loginUser.service";
import updateUserService from "../../services/user/updateUser.service";
import deleteUserService from "../../services/user/deleteUser.service";
import listOneUserService from "../../services/user/listOneUser.service";

export class UserController {
  static async store(req: Request, res: Response) {
    const { name, email, cellphone, password } = req.body;

    const user = await createUserService({
      name,
      email,
      cellphone,
      password,
    });
    res.statusMessage = "User created successfully";
    return res.status(201).json(instanceToPlain(user));
  }

  static async index(req: Request, res: Response) {
    const users = await listUsersService();
    res.statusMessage = "Users found";
    return res.json(instanceToPlain(users));
  }

  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const oneUser = await listOneUserService(id);
    res.statusMessage = "User found";
    return res.json(instanceToPlain(oneUser));
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, cellphone, password, isVerified } = req.body;
    let token = req.headers.authorization;

    var decoded = jwt.decode(token!);
    const pass = decoded.id;

    const userUpdate = await updateUserService(id, pass, {
      name,
      email,
      cellphone,
      password,
      isVerified,
    });
    res.statusMessage = "User update successfully";
    return res.json(instanceToPlain(userUpdate));
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteUserService(id);
    res.statusMessage = "User deleted successfully";
    return res.status(204);
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await loginService({ email, password });
    res.statusMessage = "Loged";
    return res.json(token);
  }
}
