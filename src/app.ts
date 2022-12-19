import "express-async-errors";
import express from "express";
import { handleErrors } from "./errors/handleError";
import userRoutes from "./routes/user.route";
import testeRoutes from "./routes/teste.route";

let cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(handleErrors);
app.use(userRoutes, testeRoutes);

export { app };
