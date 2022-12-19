import { Router } from "express";

const testeRoutes = Router();

testeRoutes.get("/home", (req, res) => {
  return res.status(201).json("Home Teste");
});

export default testeRoutes;
