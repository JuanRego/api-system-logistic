import { Router } from "express";

import { OperationController } from "../controllers/operation/operation.controller";
import verifyAdmin from "../middlewares/verifyAdmin.middleware";
import verifyAuthToken from "../middlewares/verifyAuthToken.middleware";

const operationRoutes = Router();

operationRoutes.post("/operations/", verifyAuthToken, verifyAdmin, OperationController.store);

operationRoutes.get("/operations/", OperationController.index);
operationRoutes.get("/operation/:id/", OperationController.show);

operationRoutes.patch("/operations/:id/", verifyAuthToken, OperationController.update);
operationRoutes.patch("/operations/:id/pick", verifyAuthToken, OperationController.pick)

operationRoutes.delete("/operations/delete/:id/", verifyAuthToken, verifyAdmin, OperationController.delete);

export default operationRoutes;
