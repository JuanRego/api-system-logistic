import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { User } from "../../models/user";

import createOperationService from "../../services/operation/createOperation.service";
import listOperationsService from "../../services/operation/listOperations.service";
import listOneOperationService from "../../services/operation/listOneOperation.service";
import updateOperationService from "../../services/operation/updateOperation.service";
import deleteOperationService from "../../services/operation/deleteOperation.service";
import pickOperationService from "../../services/operation/pickOperation.service";

export class OperationController {
  static async store(req: Request, res: Response) {
    const { name, totalValue } = req.body;
    const { id } = req.params;
    const createdDate = new Date();

    const operation = await createOperationService(id, {
      name,
      totalValue,
      createdDate,
    });
    return res.status(201).json(instanceToPlain(operation));
  }
  static async index(req: Request, res: Response) {
    const operations = await listOperationsService();

    return res.json(instanceToPlain(operations));
  }
  static async show(req: Request, res: Response) {
    const { id } = req.params;

    const oneOperation = await listOneOperationService(id);

    return res.json(instanceToPlain(oneOperation));
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { operationId, totalValue } = req.body;

    const finalizationDate = new Date();

    const operationUpdate = await updateOperationService(id, operationId, {
      totalValue,
      finalizationDate,
    });

    return res.json(instanceToPlain(operationUpdate));
  }

  static async pick(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = req.body;

    const operationPick = await pickOperationService(id, userId);

    return res.json(instanceToPlain(operationPick));
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteOperationService(id);
    res.statusMessage = "User deleted successfully";
    return res.status(204);
  }
}
