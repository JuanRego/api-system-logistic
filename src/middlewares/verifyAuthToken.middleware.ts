import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError(401, "Missing Token/Authorization Header");
  }

  jwt.verify(
    token as string,
    process.env.TOKEN_KEY as string,
    (error, decoded) => {
      if (error) {
        throw new AppError(401, "Invalid Token");
      }
    }
  );
  
  next();
};

export default verifyAuthToken;
