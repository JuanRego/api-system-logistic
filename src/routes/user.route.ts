import { Router } from "express";

import { UserController } from "../controllers/user/user.controller";
import verifyAdmin from "../middlewares/verifyAdmin.middleware";
import verifyAuthToken from "../middlewares/verifyAuthToken.middleware";

const userRoutes = Router();

userRoutes.post("/users/", UserController.store);
userRoutes.post("/users/login/", UserController.login);

userRoutes.get("/users/", verifyAuthToken, verifyAdmin, UserController.index);
userRoutes.get("/user/:id/", UserController.show);

userRoutes.patch("/users/:id/", verifyAuthToken, UserController.update);

userRoutes.delete(
  "/users/delete/:id/",
  verifyAuthToken,
  verifyAdmin,
  UserController.delete
);                                    

export default userRoutes;
